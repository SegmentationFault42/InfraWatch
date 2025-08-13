import statusController from '../controllers/status.controller.ts';
import { getStatusSchema } from '../schema/status.schema.ts';
export default async function statusRoutes(fastify) {
    fastify.get(
        '/status',
        { schema: getStatusSchema },
        statusController.getStatus,
    );
}
//# sourceMappingURL=status.routes.js.map
