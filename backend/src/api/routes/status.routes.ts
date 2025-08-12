import type { FastifyInstance } from 'fastify';
import statusController from '../controllers/status.controller.ts';
import { getStatusSchema } from '../schema/status.schema.ts';

export default async function statusRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/status',
        { schema: getStatusSchema },
        statusController.getStatus,
    );
}
