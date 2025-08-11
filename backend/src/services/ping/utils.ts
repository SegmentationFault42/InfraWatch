import type { PingOptions } from './types.js';
import { z } from 'zod';

// Schema com defaults centralizados
export const ping_options_schema = z.object({
	timeoutMs: z.number().positive().default(2000),
	retries: z.number().int().nonnegative().default(1),
	intervalMs: z.number().positive().default(1000),
	packetSize: z.number().positive().default(56),
	ttl: z.number().positive().default(64),
	concurrency: z.number().int().positive().default(1),
	provider: z.enum(['system', 'raw']).default('system'),
});

// Defaults gerados a partir do schema
export const default_ping_options: Required<PingOptions> =
	ping_options_schema.parse({});

// Função para mesclar + validar opções
export function merge_ping_options(
	options?: PingOptions
): Required<PingOptions> {
	return ping_options_schema.parse(options ?? {});
}

// Timestamp
export function get_timestamp(): string {
	return new Date().toISOString();
}
