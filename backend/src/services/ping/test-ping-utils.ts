import { pingHost } from './ping_service.ts';

async function runTest() {
  const target = '8.8.8.8'; // Google DNS, geralmente responde
  const result = await pingHost(target, { timeoutMs: 1000, retries: 2 });
  console.log('Resultado do ping:', result);
}

runTest().catch(console.error);
