import { Prisma } from "../../config/database.ts";
import { System } from "@prisma/client";

class SystemRepository{

    async verifySystem(data: Omit<System, "id" | "status" | "created_at" | "updated_at">) {
            return await Prisma.user.findFirst({
                where: {
                    OR: [{ email: data.url }],
                },
            });
        }
    async addSystem(data: Omit<System, "id" | "status" | "created_at" | "updated_at">)
    {
      return await Prisma.system.create({
        data,
      })
    }
}

export const systemRepository = new SystemRepository();