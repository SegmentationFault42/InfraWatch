import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user.controller.ts';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/user/create', userController.createUser);
    fastify.post('/user/login', userController.loginUser);
}
