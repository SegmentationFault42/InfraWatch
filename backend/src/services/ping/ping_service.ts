import ping from 'ping';
import { merge_ping_options, get_timestamp } from './utils.ts';
import type { PingOptions, pingResult } from './types';

export function wait(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendPing(target: string, options: Required<PingOptions>): Promise<number> {
	const res = await ping.promise.probe(target, {
		timeout: Math.ceil(options.timeoutMs / 1000),
		packetSize: options.packetSize,
		extra: ['-t', String(options.ttl)],
	});

	if (res.alive) {
		const time = typeof res.time === 'string' ? parseFloat(res.time) : res.time;
		return time;
	} else {
		throw new Error(`Host ${target} is unreachable`);
	}
}

export async function pingHost(target: string, options?: PingOptions): Promise<pingResult> {
	const opts = merge_ping_options(options);
	let attempts = 0;
	const maxAttempts = opts.retries + 1;

	if (opts.timeoutMs <= 0) {
		return {
			target,
			alive: false,
			attempts: 0,
			error: 'Timeout must be greater than zero',
			timestamp: get_timestamp(),
		};
	}

	// Garantir intervalo não negativo
	const intervalMs = Math.max(0, opts.intervalMs);

	while (attempts < maxAttempts) {
		attempts++;
		try {
			const latency = await sendPing(target, opts);
			return {
				target,
				alive: true,
				latency,
				attempts,
				timestamp: get_timestamp(),
				ttl: opts.ttl,
			};
		} catch (error) {
			if (attempts < maxAttempts) {
				await wait(intervalMs);
			}
		}
	}

	return {
		target,
		alive: false,
		attempts,
		error: 'Host is unreachable after all retry attempts',
		timestamp: get_timestamp(),
	};
}
