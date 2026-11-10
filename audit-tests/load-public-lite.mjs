import fs from 'node:fs/promises';
import path from 'node:path';
import autocannon from 'autocannon';

const url = 'https://gama-pizzas-work.vercel.app/';
const latencies = [];
const statusCodes = {};
const result = await new Promise((resolve, reject) => {
  const run = autocannon({ url, connections: 10, duration: 10, pipelining: 1, method: 'GET' }, (error, data) => error ? reject(error) : resolve(data));
  run.on('response', (_client, statusCode, _bytes, responseTime) => {
    latencies.push(responseTime);
    statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
  });
});
latencies.sort((a, b) => a - b);
const percentile = (p) => latencies[Math.ceil(latencies.length * p) - 1] ?? null;
const output = {
  url,
  scope: 'one low-concurrency public check, GET / only',
  connections: 10,
  durationSeconds: 10,
  requests: result.requests.total,
  requestsPerSecond: result.requests.average,
  latencyMs: { average: result.latency.average, p95: percentile(0.95), p99: percentile(0.99), max: result.latency.max },
  statusCodes,
  errors: result.errors,
  timeouts: result.timeouts,
  bytes: result.throughput.total,
};
await fs.writeFile(path.join(process.cwd(), 'audit-tests', 'public-light-load.json'), JSON.stringify(output, null, 2));
console.log(JSON.stringify(output));
