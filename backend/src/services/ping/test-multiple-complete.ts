// Teste completo da funcionalidade de múltiplos hosts
import { pingHost, pingMultipleHosts } from './ping_service.ts';

async function testBasic() {
  console.log('🧪 === TESTE 1: Básico ===\n');

  const targets = ['8.8.8.8', 'google.com', 'github.com'];
  console.log('Targets:', targets.join(', '));

  const start = Date.now();
  const results = await pingMultipleHosts(targets, { timeoutMs: 2000 });
  const elapsed = Date.now() - start;

  console.log('\n📊 Resultados:');
  results.forEach((result, index) => {
    const status = result.alive ? '✅ UP' : '❌ DOWN';
    const latency = result.latency ? `${result.latency}ms` : 'N/A';

    console.log(`${index + 1}. ${result.target}: ${status} ${latency}`);
  });

  console.log(`\n⏱️  Tempo total: ${elapsed}ms\n`);
}

async function testSequentialVsParallel() {
  console.log('🧪 === TESTE 2: Sequencial vs Paralelo ===\n');

  const targets = ['8.8.8.8', 'google.com', 'github.com', '1.1.1.1'];

  // Sequencial
  console.log('🔄 Executando SEQUENCIAL...');
  const startSeq = Date.now();
  await pingMultipleHosts(targets, { concurrency: 1 });
  const elapsedSeq = Date.now() - startSeq;

  // Paralelo
  console.log('🚀 Executando PARALELO...');
  const startPar = Date.now();
  await pingMultipleHosts(targets, { concurrency: 4 });
  const elapsedPar = Date.now() - startPar;

  console.log('\n📊 === COMPARAÇÃO ===');
  console.log(`⏱️  Sequencial: ${elapsedSeq}ms`);
  console.log(`⚡ Paralelo: ${elapsedPar}ms`);
  console.log(`🚀 Speedup: ${Math.round((elapsedSeq / elapsedPar) * 100) / 100}x\n`);
}

async function testMixed() {
  console.log('🧪 === TESTE 3: Alvos Válidos + Inválidos ===\n');

  const targets = [
    '8.8.8.8',                    // ✅ Válido
    'google.com',                 // ✅ Válido
    '192.0.2.123',               // ❌ IP de teste
    'invalid-host.fake'           // ❌ Hostname inválido
  ];

  const results = await pingMultipleHosts(targets, {
    timeoutMs: 2000,
    concurrency: 2
  });

  console.log('📊 Resultados:');
  let up = 0, down = 0;

  results.forEach((result, index) => {
    const status = result.alive ? '✅ UP' : '❌ DOWN';
    const latency = result.latency ? `${result.latency}ms` : 'N/A';

    result.alive ? up++ : down++;

    console.log(`${index + 1}. ${result.target}: ${status} ${latency}`);
    if (result.error) {
      console.log(`   ⚠️  ${result.error}`);
    }
  });

  console.log(`\n📈 Resumo: ${up} UP, ${down} DOWN\n`);
}

async function runAllTests() {
  console.log('🚀 === TESTES DA FUNCIONALIDADE MÚLTIPLOS HOSTS ===\n');

  try {
    await testBasic();
    await testSequentialVsParallel();
    await testMixed();

    console.log('✅ === TODOS OS TESTES CONCLUÍDOS ===');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  }
}

// Executar
runAllTests();
