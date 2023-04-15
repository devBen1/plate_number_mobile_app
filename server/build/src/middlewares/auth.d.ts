import { Request, Response, NextFunction } from "express";
declare class AuthMiddleware {
    checkToken(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
export default AuthMiddleware;
