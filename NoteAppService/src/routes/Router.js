export default class Router {
    #routers = new Map();

    addRouter = (startPoint, router) => {
        this.#routers.set(startPoint, router);
    }

    getRouters = () => {
        return this.#routers;
    }
}