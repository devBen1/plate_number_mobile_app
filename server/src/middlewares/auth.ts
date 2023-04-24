import { Request, Response, NextFunction } from "express";
import { handleError } from '../custom/functions/messageHandlers';
import AuthenticationService from './../Modules/users/users.service';
import jwt from 'jsonwebtoken';
// import config from "./../config/config";

class AuthMiddleware {
    async checkToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader: any = req.headers.authorization || req.headers.Authorization;
            if (!authHeader?.startsWith('Bearer '))
                return handleError(res, "Access Denied! Unauthorized User", 401);
            const token: any = authHeader.split(' ')[1];
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err: any, decoded: any) => {
                    if (err)
                        return handleError(res, "Invalid Token...", 402);
                    req.decoded = {
                        _id: decoded.UserInfo._id,
                        email: decoded.UserInfo.email,
                    };
                    return next();
                }
            );
        } catch (error) {
            return handleError(res, "Error in your data", 400);
        }
    }
    async verifyAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const userID: any = req.decoded;
            const isUserExist: any = await AuthenticationService.UserQuery("findOne", { userUID: userID._id }, [
                "userUID", "username",
                "userFullName", "userEmail",
                "role"
            ]);
            if (!isUserExist)
                return handleError(res, "Invalid Credential", 400);
            req.userInfo = isUserExist;
            return next();
        } catch (error) {
            return handleError(res, "Error in your data", 400);
        }
    }
}

export default AuthMiddleware;