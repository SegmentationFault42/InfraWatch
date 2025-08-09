import { FastifyInstance } from 'fastify';
import statusRoutes from './status.routes.js';

export function Routes(app: FastifyInstance) {
    app.register(statusRoutes);
}
