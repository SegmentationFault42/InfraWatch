import { systemRepository } from "../repositories/SystemRepositories.ts";
import { System } from "@prisma/client";

class SystemService{
     async addSystem(data: Omit<System, "id" | "status" | "created_at" | "updated_at">) {
            const SystemExists = await systemRepository.verifySystem(data);
    
            if (SystemExists) {
                throw new Error('Esse sistema já está cadastrado.');
            }
    
            try {
                return await systemRepository.addSystem(data);
            } catch (error) {
                console.log(error)
                throw new Error('Falha ao adicionar sistema.');
            }
        }
}

export const systemService =  new SystemService;