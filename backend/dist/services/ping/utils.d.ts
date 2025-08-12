import type { PingOptions } from './types.js';
import { z } from 'zod';
export declare const ping_options_schema: z.ZodObject<
    {
        timeoutMs: z.ZodDefault<z.ZodNumber>;
        retries: z.ZodDefault<z.ZodNumber>;
        intervalMs: z.ZodDefault<z.ZodNumber>;
        packetSize: z.ZodDefault<z.ZodNumber>;
        ttl: z.ZodDefault<z.ZodNumber>;
        concurrency: z.ZodDefault<z.ZodNumber>;
        provider: z.ZodDefault<
            z.ZodEnum<{
                system: 'system';
                raw: 'raw';
            }>
        >;
    },
    z.core.$strip
>;
export declare const default_ping_options: Required<PingOptions>;
export declare function merge_ping_options(
    options?: PingOptions,
): Required<PingOptions>;
export declare function get_timestamp(): string;
//# sourceMappingURL=utils.d.ts.map
