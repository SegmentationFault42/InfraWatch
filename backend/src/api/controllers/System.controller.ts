import { systemService } from "../services/SytemService.ts";
import { FastifyRequest, FastifyReply } from "fastify";
import {z} from "zod"
import { systemValidation } from "../validations/system.validation.ts";

class SystemController{
     async addSystem(req: FastifyRequest, res: FastifyReply) {
            try {
                const data = systemValidation.createSystemSchema.parse(req.body);
                await systemService.addSystem(data);
                res.status(201).send({ message: 'Sistema adicionado com sucesso' });
            } catch (err: any) {
                if (err instanceof z.ZodError) {
                    res.status(400).send({ error: 'Validação falhou' });
                } else {
                    console.log(err.message);
                    res.status(500).send({ error: 'Erro interno no servidor.' });
                }
            }
        }
}

export const systemController = new SystemController();