import assert from 'assert';
import { pingHost } from './ping.service.ts';

async function testPingValidIP() {
    console.log('Test: ping para IP válido (8.8.8.8)');
    const res = await pingHost('8.8.8.8', { retries: 1, timeoutMs: 2000 });
    console.log(res);
    assert(res.alive === true, 'Esperava que IP válido estivesse alive');
    assert(
        typeof res.latency === 'number' && res.latency > 0,
        'Latency deve ser número positivo',
    );
    assert(typeof res.ttl === 'number', 'TTL deve estar definido');
}

async function testPingInvalidIP() {
    console.log('Test: ping para IP inválido (192.0.2.123)');
    const res = await pingHost('192.0.2.123', { retries: 2, timeoutMs: 1000 });
    console.log(res);
    assert(res.alive === false, 'Esperava que IP inválido estivesse dead');
    assert(res.error, 'Esperava erro definido');
}

async function testPingValidHostname() {
    console.log('Test: ping para hostname válido (google.com)');
    const res = await pingHost('google.com', { retries: 1, timeoutMs: 2000 });
    console.log(res);
    assert(res.alive === true, 'Esperava que hostname válido estivesse alive');
    assert(
        typeof res.latency === 'number' && res.latency > 0,
        'Latency deve ser número positivo',
    );
}

async function testPingTimeoutShort() {
    console.log('Test: ping com timeout muito curto');
    const res = await pingHost('192.0.2.123', { retries: 1, timeoutMs: 1 });
    console.log(res);
    assert(res.alive === false, 'Esperava falha por timeout curto');
    assert(res.error, 'Esperava erro definido');
}

async function testPingRetries() {
    console.log('Test: ping com múltiplas tentativas');
    const start = Date.now();
    const res = await pingHost('192.0.2.123', {
        retries: 3,
        intervalMs: 500,
        timeoutMs: 500,
    });
    const elapsed = Date.now() - start;
    console.log(res);
    assert(res.alive === false, 'Esperava que IP inválido estivesse dead');
    assert(res.attempts === 4, 'Esperava 4 tentativas (1 + 3 retries)');
    assert(
        elapsed >= 1500,
        'Esperava tempo total pelo menos igual a soma dos intervalos',
    );
}

async function testPingIntervalBetweenRetries() {
    console.log('Test: respeitar intervalo entre tentativas');
    const res = await pingHost('192.0.2.123', {
        retries: 2,
        intervalMs: 500,
        timeoutMs: 500,
    });
    console.log(res);
    assert(res.attempts === 3, 'Esperava 3 tentativas');
}

// Casos extremos

async function testPingZeroRetries() {
    console.log('Test: ping com zero retries');
    const res = await pingHost('8.8.8.8', { retries: 0, timeoutMs: 2000 });
    console.log(res);
    assert(typeof res.attempts === 'number', 'Tentativas devem ser número');
    assert(
        res.alive === true || res.alive === false,
        'Deve lidar com retries zero sem erro',
    );
}

async function testPingNegativeRetries() {
    console.log('Test: ping com retries negativos');
    const res = await pingHost('8.8.8.8', { retries: -1, timeoutMs: 2000 });
    console.log(res);
    assert(
        res.alive === true || res.alive === false,
        'Deve lidar com retries negativos sem erro',
    );
}

async function testPingZeroTimeout() {
    console.log('Test: ping com timeout zero');
    const res = await pingHost('8.8.8.8', { retries: 1, timeoutMs: 0 });
    console.log(res);
    assert(res.alive === false, 'Timeout zero deve causar falha');
    assert(res.error, 'Esperava erro definido para timeout zero');
}

async function testPingNegativeTimeout() {
    console.log('Test: ping com timeout negativo');
    const res = await pingHost('8.8.8.8', { retries: 1, timeoutMs: -100 });
    console.log(res);
    assert(res.alive === false, 'Timeout negativo deve causar falha');
    assert(res.error, 'Esperava erro definido para timeout negativo');
}

async function testPingInvalidHostname() {
    console.log('Test: ping para hostname inválido');
    const res = await pingHost('invalid-hostname-xyz123.example', {
        retries: 1,
        timeoutMs: 1000,
    });
    console.log(res);
    assert(res.alive === false, 'Hostname inválido deve falhar');
    assert(res.error, 'Esperava erro para hostname inválido');
}

async function testPingZeroInterval() {
    console.log('Test: ping com intervalo zero entre tentativas');
    const start = Date.now();

    const res = await pingHost('192.0.2.123', {
        retries: 3,
        intervalMs: 0,
        timeoutMs: 500,
    });

    const elapsed = Date.now() - start;
    console.log(res);
    console.log(`Elapsed time: ${elapsed}ms`);

    assert(res.alive === false, 'Esperava que IP inválido estivesse dead');
    assert(res.attempts === 4, 'Esperava 4 tentativas (1 + 3 retries)');

    const minExpectedMs = 2000; // 4 tentativas * 500ms timeout
    const maxExpectedMs = 4500;

    assert(
        elapsed >= minExpectedMs && elapsed <= maxExpectedMs,
        `Tempo total deve estar entre ${minExpectedMs} e ${maxExpectedMs} ms, mas foi ${elapsed}ms`,
    );
}

async function testPingNegativeInterval() {
    console.log('Test: ping com intervalo negativo entre tentativas');
    const start = Date.now();
    const res = await pingHost('192.0.2.123', {
        retries: 3,
        intervalMs: -100,
        timeoutMs: 500,
    });
    const elapsed = Date.now() - start;
    console.log(res);
    assert(res.alive === false, 'Esperava que IP inválido estivesse dead');
    assert(res.attempts === 4, 'Esperava 4 tentativas (1 + 3 retries)');
    assert(
        elapsed >= 1500 && elapsed < 4500,
        `Intervalo negativo tratado como zero ou próximo; tempo esperado entre 1500 e 4500ms, mas foi ${elapsed} ms`,
    );
}

async function runAllTests() {
    try {
        await testPingValidIP();
        await testPingInvalidIP();
        await testPingValidHostname();
        await testPingTimeoutShort();
        await testPingRetries();
        await testPingIntervalBetweenRetries();

        await testPingZeroRetries();
        await testPingNegativeRetries();
        await testPingZeroTimeout();
        await testPingNegativeTimeout();
        await testPingInvalidHostname();
        await testPingZeroInterval();
        await testPingNegativeInterval();

        console.log(
            '✅ Todos os testes essenciais e extremos rodaram sem erro.',
        );
    } catch (err) {
        console.error('❌ Erro durante teste:', err);
        process.exit(1);
    }
}

runAllTests();
