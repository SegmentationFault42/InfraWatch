import type { PingOptions } from './types.js';

export const default_ping_options: Required<PingOptions> = {
	timeoutMs: 2000,
	retries: 1,
	intervalMs: 1000,
	packetSize: 56,
	ttl: 64,
	concurrency: 1,
	provider: 'system',
};

export function merge_ping_options(options?: PingOptions): Required<PingOptions> {
	return { ...default_ping_options, ...options };
}

export function get_timestamp(): string {
	return new Date().toISOString();
}
