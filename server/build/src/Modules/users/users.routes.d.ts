import Router from "../../core/routers";
import App from "../../app";
import UserController from './users.controller';
import ValidatorMiddleware from "../../middlewares/validator";
import AuthMiddleware from "../../middlewares/auth";
declare class FinanceRoutes extends Router {
    path: string;
    controller: UserController;
    validatorMiddleware: ValidatorMiddleware;
    authMiddleware: AuthMiddleware;
    private _app;
    constructor(app: App);
    initRouters(): void;
}
export default FinanceRoutes;
