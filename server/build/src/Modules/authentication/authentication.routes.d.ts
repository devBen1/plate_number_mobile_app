import Router from "../../core/routers";
import App from "../../app";
import AuthenticationController from './authentication.controller';
import ValidatorMiddleware from "../../middlewares/validator";
declare class AuthenticationRoutes extends Router {
    path: string;
    controller: AuthenticationController;
    validatorMiddleware: ValidatorMiddleware;
    private _app;
    constructor(app: App);
    initRouters(): void;
}
export default AuthenticationRoutes;
