import fastify from "fastify"
import { ENV } from "./config/dotenv.js"

const app = fastify({logger: true})

app.get("/", (req, res)=>{
    res.status(200).send({message: "Hello World"})
})

app.listen({
    port: ENV.PORT,
    host: ENV.HOST,
}, ()=>{
    console.log(`Server Running on port: ${ENV.PORT}`)
})

