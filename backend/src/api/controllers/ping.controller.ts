import { FastifyReply, FastifyRequest } from "fastify";
import { pingMultipleHosts } from "../../ping/ping.service.ts";
import { pingParamSchema } from '../../../src/validations/ping.validation.ts';

export async function pingController(
  request: FastifyRequest<{ Params: { host: string } }>,
  reply: FastifyReply,
) {
  const parseResult = pingParamSchema.safeParse(request.params);
  if (!parseResult.success) {
    return reply.status(400).send({ error: 'Invalid host parameter' });
  }

  const hosts = parseResult.data.host.split(',').map(h => h.trim());

  if (hosts.length === 0) {
    return reply.status(400).send({ error: 'Host parameter cannot be empty' });
  }

  try {
    const results = await pingMultipleHosts(hosts, { retries: 3, timeoutMs: 2000 });

    return reply.send(results.map(result => ({
      target: result.target,
      reachable: result.alive,
      retriesUsed: result.attempts - 1,
      averageLatency: result.latency ?? null,
    })));
  } catch {
    return reply.status(504).send({ error: 'Ping request timed out or host unreachable' });
  }
}
