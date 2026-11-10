import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import autocannon from 'autocannon';

const root = process.cwd();
const url = 'http://127.0.0.1:4173/';
const preview = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort', '--outDir', 'audit-tests/dist'], { cwd: root, stdio: 'ignore', windowsHide: true });

async function waitForPreview() {
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await delay(250);
  }
  throw new Error('vite preview did not start');
}

function serverResources(pid) {
  const command = `Get-Process -Id ${pid} -ErrorAction Stop | Select-Object CPU,WorkingSet64 | ConvertTo-Json -Compress`;
  const probe = spawnSync('powershell.exe', ['-NoProfile', '-Command', command], { encoding: 'utf8', windowsHide: true });
  if (probe.status !== 0) return null;
  try { return JSON.parse(probe.stdout.trim()); } catch { return null; }
}

async function runScenario(connections, duration = 10) {
  const samples = [];
  const observedLatencies = [];
  const initial = serverResources(preview.pid);
  const benchmark = new Promise((resolve, reject) => {
    const instance = autocannon({ url, connections, duration, pipelining: 1, method: 'GET' }, (error, result) => error ? reject(error) : resolve(result));
    instance.on('response', (_client, _status, _bytes, responseTime) => observedLatencies.push(responseTime));
  });
  const sampling = (async () => {
    const endAt = Date.now() + duration * 1000;
    while (Date.now() < endAt) {
      const sample = serverResources(preview.pid);
      if (sample) samples.push(sample);
      await delay(750);
    }
  })();
  const result = await benchmark;
  await sampling;
  const final = serverResources(preview.pid);
  observedLatencies.sort((a, b) => a - b);
  const percentile = (p) => observedLatencies.length ? observedLatencies[Math.ceil(observedLatencies.length * p) - 1] : null;
  const workingSets = [initial, ...samples, final].filter(Boolean).map((value) => value.WorkingSet64);
  return {
    connections,
    durationSeconds: duration,
    requests: result.requests.total,
    requestsPerSecond: result.requests.average,
    latencyMs: { average: result.latency.average, p95: percentile(0.95), p99: percentile(0.99), max: result.latency.max },
    errors: result.errors,
    timeouts: result.timeouts,
    non2xx: result.non2xx,
    errorRatePct: +((result.errors + result.timeouts + result.non2xx) / Math.max(1, result.requests.total) * 100).toFixed(4),
    bytes: result.throughput.total,
    serverProcess: {
      cpuSecondsBefore: initial?.CPU ?? null,
      cpuSecondsAfter: final?.CPU ?? null,
      cpuSecondsDelta: initial && final ? +(final.CPU - initial.CPU).toFixed(3) : null,
      peakWorkingSetMB: workingSets.length ? +(Math.max(...workingSets) / 1024 / 1024).toFixed(1) : null,
      samples: samples.length,
    },
  };
}

try {
  await waitForPreview();
  const output = [];
  for (const connections of [100, 500, 1000]) output.push(await runScenario(connections, 10));
  await fs.writeFile(path.join(root, 'audit-tests', 'autocannon-local.json'), JSON.stringify({ url, server: 'Vite preview over local production build', scenarios: output }, null, 2));
  console.log(JSON.stringify(output));
} finally {
  preview.kill();
}
