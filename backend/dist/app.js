import fastify from 'fastify';
import { Routes } from './api/routes/routes.js';
import { Swagger } from './config/swagger.config.js';
export const app = fastify({ logger: false });
app.register(Swagger);
app.register(Routes);
//# sourceMappingURL=app.js.map
