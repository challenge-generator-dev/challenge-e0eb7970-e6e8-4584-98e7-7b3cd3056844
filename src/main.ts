import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import { errorHandler } from './middlewares/errorHandler';

// Cargar variables de entorno
dotenv.config();

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private configureRoutes(): void {
        this.app.use('/products', productsRouter);
    }

    private configureErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

// Verificar que las variables de entorno críticas están definidas
if (!process.env.PORT) {
    console.warn('PORT not defined in .env, using default 3000');
}

// Inicializar el servidor
const server = new Server();
server.start();

// Exportar la app para testing
export default server;