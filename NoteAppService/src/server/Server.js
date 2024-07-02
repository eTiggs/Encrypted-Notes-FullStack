import express from 'express';
import cors from 'cors';

export default class Server {
    #app;
    #port;
    #host;
    #server;
    #router;

    constructor(port, host, router) {
        this.#port = port;
        this.#host = host;
        this.#app = express();
        this.#server = null;
        this.#router = router;

        this.#configureMiddleware();
        this.#configureRoutes();
    }

    #configureMiddleware() {
        const corsOptions = {
            origin: 'https://encrypted-notes-fullstack-1.onrender.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };

        this.#app.use(cors(corsOptions));
        this.#app.use(express.json());
    }

    #configureRoutes() {
        this.#router.getRouters().forEach((router, startPoint) => {
            this.#app.use(startPoint, router.getRouter());
        });
    }

    start = () => {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server: http://${this.#host}:${this.#port}`);
        });
    }

    stop = () => {
        this.#server?.close();
    }
}
