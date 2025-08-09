import fastify from 'fastify';
import { ENV } from './config/dotenv.js';
import { Routes } from './api/routes/routes.js';
import { Swagger } from './config/swagger.config.js';

const app = fastify({ logger: false });
app.register(Swagger);
app.register(Routes);

app.listen(
    {
        port: ENV.PORT,
        host: ENV.HOST,
    },
    () => {
        console.log(`Server Running on port: ${ENV.PORT}`);
    },
);
