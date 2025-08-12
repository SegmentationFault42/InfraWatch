import { pingController } from '../controllers/ping.controller.ts';
import { pingRouteSchema } from '../schema/ping.schema.ts';
export async function pingRoutes(fastify) {
    fastify.get('/ping/:host', {
        schema: pingRouteSchema,
        handler: pingController,
    });
}
//# sourceMappingURL=ping.routes.js.map
