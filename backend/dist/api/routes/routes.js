import statusRoutes from './status.routes.ts';
import { pingRoutes } from './ping.routes.ts';
export function Routes(app) {
    app.register(statusRoutes);
    app.register(pingRoutes);
}
//# sourceMappingURL=routes.js.map
