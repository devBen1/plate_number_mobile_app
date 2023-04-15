import { Response } from "express";
export declare const handleError: (res: Response, output: any, statusCode: number) => Response<any, Record<string, any>>;
export declare const handleSuccess: (res: Response, message: string, output: any) => Response<any, Record<string, any>>;
