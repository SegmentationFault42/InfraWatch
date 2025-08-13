// ping_tests.ts
import { pingHost, pingMultipleHosts } from './ping_service.ts';
// Utilitário simples de medição de tempo
function nowMs() {
    return performance.now();
}
async function runTests() {
    console.log('🚀 === INICIANDO TESTES DE PING ===\n');
    // ==== 1. Testes Funcionais ====
    console.log('🧪 TESTES FUNCIONAIS\n');
    const validHost = '8.8.8.8';
    const validHost2 = 'google.com';
    const invalidHost = 'invalid-host.fake';
    console.log('Caso 1: Host único válido');
    console.log(await pingHost(validHost));
    console.log('\nCaso 2: Vários hosts válidos');
    console.log(await pingMultipleHosts([validHost, validHost2]));
    console.log('\nCaso 3: Host único inválido');
    console.log(await pingHost(invalidHost));
    console.log('\nCaso 4: Mix de válidos e inválidos');
    console.log(
        await pingMultipleHosts([
            validHost,
            validHost2,
            invalidHost,
            '192.0.2.123',
        ]),
    );
    // ==== 2. Testes de Resiliência ====
    console.log('\n🧪 TESTES DE RESILIÊNCIA\n');
    console.log('Timeout zero');
    console.log(await pingHost(validHost, { timeoutMs: 0 }));
    console.log('Retries negativos');
    console.log(await pingHost(validHost, { retries: -1 }));
    console.log('Host vazio');
    console.log(await pingHost('', {}));
    // ==== 3. Testes de Desempenho ====
    console.log('\n🧪 TESTES DE DESEMPENHO\n');
    const manyHosts = [
        validHost,
        validHost2,
        'github.com',
        'cloudflare.com',
        'microsoft.com',
    ];
    let start = nowMs();
    await pingMultipleHosts(manyHosts, { concurrency: 1 });
    let seqTime = nowMs() - start;
    start = nowMs();
    await pingMultipleHosts(manyHosts, { concurrency: 5 });
    let parTime = nowMs() - start;
    console.log(`Sequencial: ${seqTime.toFixed(2)}ms`);
    console.log(`Paralelo:   ${parTime.toFixed(2)}ms`);
    console.log(`Speedup:    ${(seqTime / parTime).toFixed(2)}x`);
    // ==== 4. Testes de Estresse ====
    console.log('\n🧪 TESTE DE ESTRESSE\n');
    const stressHosts = Array(200).fill(validHost); // 200 pings para o mesmo host
    start = nowMs();
    await pingMultipleHosts(stressHosts, { concurrency: 50 });
    let stressTime = nowMs() - start;
    console.log(`Estresse concluído em ${stressTime.toFixed(2)}ms`);
    // ==== 5. Testes de Confiabilidade ====
    console.log('\n🧪 TESTES DE CONFIABILIDADE\n');
    for (let i = 1; i <= 3; i++) {
        console.log(`Execução ${i}:`);
        console.log(
            await pingMultipleHosts([validHost, validHost2, invalidHost]),
        );
    }
    console.log('\n✅ === TODOS OS TESTES FINALIZADOS ===');
}
runTests().catch((err) => {
    console.error('❌ Erro nos testes:', err);
});
//# sourceMappingURL=ping_test.js.map
