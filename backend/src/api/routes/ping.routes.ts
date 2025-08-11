import { FastifyInstance } from "fastify";
import { pingController } from '../controllers/ping.controller.ts';

export async function pingRoutes(fastify: FastifyInstance) {
	fastify.get('/ping/:host', pingController);
}
