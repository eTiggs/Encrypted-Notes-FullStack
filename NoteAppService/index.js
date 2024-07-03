import Server from "./src/server/Server.js";
import Config from "./src/config/Config.js";
import Database from "./src/db/Database.js";
import Router from "./src/routes/Router.js";
import AuthRouter from "./src/routes/authRouter.js";
import NoteRouter from "./src/routes/noteRouter.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const router = new Router();
const authRouter = new AuthRouter();
const noteRouter = new NoteRouter();

router.addRouter('/auth', authRouter);
router.addRouter('/note', noteRouter);

const server = new Server(PORT, HOST, router);
const db = new Database(DB_URI);

(async () => {
    try {
        await db.connect();
        await server.start();
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1);
    }
})();

export default server;