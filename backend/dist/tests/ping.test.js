import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { app } from '../app.js';
let server;
beforeAll(async () => {
    server = app;
    await server.ready();
});
afterAll(async () => {
    await server.close();
});
describe('Ping endpoint', () => {
    it('Deve responder com pong', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/ping',
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({ pong: true });
    });
});
//# sourceMappingURL=ping.test.js.map
