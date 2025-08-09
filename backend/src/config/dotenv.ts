import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT: Number(process.env.Port) || 3333,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || "0.0.0.0",
}