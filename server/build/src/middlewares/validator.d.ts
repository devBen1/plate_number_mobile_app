import { Request, Response, NextFunction } from "express";
declare class ValidatorMiddleware {
    validateInputs(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    checkIfPresent(arrayList: Array<string>, req: Request): Promise<import("express-validator").ValidationError[] | undefined>;
}
export default ValidatorMiddleware;
