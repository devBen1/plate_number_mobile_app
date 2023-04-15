import { NextFunction, Request, Response } from "express";
declare class AppointmentController {
    constructor();
    SendMoney(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
export default AppointmentController;
