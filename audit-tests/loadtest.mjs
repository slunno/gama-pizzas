const base = 'http://127.0.0.1:4173';
const scenarios = [100, 500, 1000];
const durationMs = 5000;
const pauseMs = 1000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const percentile = (values, p) => values.length ? values[Math.min(values.length - 1, Math.ceil(values.length * p) - 1)] : null;
for (const vuCount of scenarios) {
  const endAt = Date.now() + durationMs;
  const latencies = [];
  let requests = 0;
  let bytes = 0;
  let errors = 0;
  const workers = Array.from({ length: vuCount }, async () => {
    while (Date.now() < endAt) {
      const started = performance.now();
      try {
        const response = await fetch(base + '/');
        const body = await response.arrayBuffer();
        latencies.push(performance.now() - started);
        requests++;
        bytes += body.byteLength;
        if (!response.ok) errors++;
      } catch {
        errors++;
      }
      await sleep(pauseMs);
    }
  });
  await Promise.all(workers);
  latencies.sort((a, b) => a - b);
  console.log(JSON.stringify({
    scenario: `${vuCount} VUs`, durationSeconds: durationMs / 1000,
    requests, rps: +(requests / (durationMs / 1000)).toFixed(1),
    avgMs: +(latencies.reduce((a,b)=>a+b,0) / Math.max(1,latencies.length)).toFixed(2),
    p95Ms: +percentile(latencies,.95)?.toFixed(2), p99Ms: +percentile(latencies,.99)?.toFixed(2),
    errors, errorRatePct: +(errors / Math.max(1, requests + errors) * 100).toFixed(2),
    bytes
  }));
}
