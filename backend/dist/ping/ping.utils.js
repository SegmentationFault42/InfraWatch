import { z } from 'zod';
export const ping_options_schema = z.object({
    timeoutMs: z.number().positive().default(2000),
    retries: z.number().int().min(0).default(1),
    intervalMs: z.number().min(0).default(1000),
    packetSize: z.number().positive().default(56),
    ttl: z.number().positive().default(64),
    concurrency: z.number().int().positive().default(1),
    provider: z.enum(['system', 'net-ping', 'raw']).default('system'),
});
export const default_ping_options = ping_options_schema.parse({});
export function merge_ping_options(options) {
    const merged = { ...default_ping_options, ...options };
    return ping_options_schema.parse(merged);
}
export function get_timestamp() {
    return new Date().toISOString();
}
//# sourceMappingURL=ping.utils.js.map
