import { FastifyInstance } from 'fastify';
import { pingController } from '../controllers/ping.controller.ts';
import { pingRouteSchema } from '../schema/ping.schema.ts';
import { AuditLogsRepository } from '../middleware/AuditLogMiddleware.ts';

export async function pingRoutes(fastify: FastifyInstance) {
  fastify.get('/ping/:host', {
    schema: pingRouteSchema,
    preHandler: AuditLogsRepository, // agora correto
    handler: pingController,
  });
}

