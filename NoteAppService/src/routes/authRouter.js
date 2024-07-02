import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import AuthValidator from '../middleware/authValidator.js';

export default class AuthRouter {
    #router;
    #routeStartPoint;

    constructor(routeStartPoint = '/auth') {
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initRoutes();
    }

    #initRoutes = () => {
        this.#router.use((req, res, next) => {
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
            );
            next();
        });

        this.#router.post(
            '/register', 
            AuthValidator.validate(), 
            (req, res, next) => {
                AuthController.register(req, res, next);
            }
        );

        this.#router.post(
            '/login', 
            AuthValidator.validate(), 
            (req, res, next) => {
                AuthController.login(req, res, next);
            }
        );
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
