import { FastifyInstance } from 'fastify';
import statusRoutes from './status.routes.ts';
import { pingRoutes } from './ping.routes.ts';

export function Routes(app: FastifyInstance) {
    app.register(statusRoutes);
    app.register(pingRoutes);
}
