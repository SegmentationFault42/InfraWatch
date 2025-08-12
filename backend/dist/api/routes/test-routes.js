export function testRoute(app, opts, done) {
    app.get(
        '/test-swagger',
        {
            schema: {
                description: 'Teste para debug do Swagger',
                tags: ['debug'],
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                        },
                    },
                },
            },
        },
        async () => {
            return { message: 'Swagger funcionando!' };
        },
    );
    done();
}
//# sourceMappingURL=test-routes.js.map
