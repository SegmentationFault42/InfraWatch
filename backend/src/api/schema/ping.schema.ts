export const pingRouteSchema = {
  description: 'Test connectivity to one or multiple hosts via ping. Use comma-separated list in :host parameter.',
  tags: ['ping'],
  params: {
    type: 'object',
    properties: {
      host: {
        type: 'string',
        description: 'IP or hostname(s) to ping. For multiple hosts, separate them with commas (ex: "8.8.8.8,google.com").',
      },
    },
    required: ['host'],
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          target: { type: 'string' },
          reachable: { type: 'boolean' },
          retriesUsed: { type: 'number' },
          averageLatency: { type: ['number', 'null'] },
        },
      },
    },
    400: { type: 'object', properties: { error: { type: 'string' } } },
    504: { type: 'object', properties: { error: { type: 'string' } } },
  },
};
