import { NextFunction, Request, Response } from "express";
import ValidatorMiddleware from "../../middlewares/validator";
declare class AuthenticationController {
    validatorMiddleware: ValidatorMiddleware;
    constructor();
    Login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    Logout(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    RefreshToken(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    UpdateInfo(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
export default AuthenticationController;
