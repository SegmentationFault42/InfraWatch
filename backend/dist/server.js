import { app } from './app.js';
import { ENV } from './config/dotenv.js';
app.listen(
    {
        port: ENV.PORT,
        host: ENV.HOST,
    },
    () => {
        console.log(`Server Running on port: ${ENV.PORT}`);
    },
);
//# sourceMappingURL=server.js.map
