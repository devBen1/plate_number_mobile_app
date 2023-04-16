import { NextFunction, Request, Response } from "express";
import { compareSync } from 'bcryptjs';
import jwt, { sign } from 'jsonwebtoken';
import { Op } from 'sequelize';
import AuthenticationService from './../users/users.service';
import { handleError, handleSuccess } from '../../custom/functions/messageHandlers';
import ValidatorMiddleware from "../../middlewares/validator";

class AuthenticationController {
    public validatorMiddleware = new ValidatorMiddleware();
    constructor() { }

    async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const presentCheck: any = await this.validatorMiddleware.checkIfPresent(["username", "password"], req);
            if (presentCheck.length != 0) {
                return handleError(res, presentCheck, 403);
            }

            const response: any = await AuthenticationService.UserQuery("findOne", {
                [Op.or]: [
                    { username: req.body.username },
                    { userEmail: req.body.username }
                ]
            },
                [
                    "userUID", "username",
                    "userFullName", "userEmail",
                    "role", "password"
                ]);
            if (response === null) {
                return handleError(res, "Invalid Credentials", 400);
            }

            const result: any = compareSync(req.body.password, response.password);
            if (!result) {
                return handleError(res, "Invalid Credentials", 400);
            }
            // create JWTs
            const accessToken: any = sign(
                {
                    "UserInfo": {
                        "_id": response.userUID,
                        "email": response.userEmail,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
            );
            const refreshToken: any = sign(
                { "email": response.userEmail },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME }
            );

            // Saving refreshToken with current user
            await AuthenticationService.UpdateUser("update", { refreshToken }, { userUID: response.userUID });

            response.password = "";
            delete response['password'];

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                // signed: true,
                // sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            });

            const output: any = {
                accessToken,
                response
            }

            // Send authorization roles and access token to user
            return handleSuccess(res, "Data retrieved successfully", output);
        } catch (err) {
            return handleError(res, "An error occurred", 400);
        }
    }

    async Logout(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies: any = req.cookies;
            if (!cookies?.jwt) return handleError(res, null, 204); //No content
            const refreshToken = cookies.jwt;

            // Is refreshToken in db?
            const foundUser = await AuthenticationService.UserQuery("findOne", { refreshToken }, ["userUID"]);
            if (!foundUser) {
                res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
                return handleError(res, null, 204);
            }

            await AuthenticationService.UpdateUser("update", { refreshToken: "" }, { userUID: foundUser.userUID });

            res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
            return handleError(res, null, 204);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async RefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies: any = req.cookies;
            if (!cookies?.jwt) return handleError(res, null, 401);
            const refreshToken: any = cookies.jwt;

            const foundUser: any = await AuthenticationService.UserQuery("findOne", { refreshToken }, ["userUID", "username", "userFullName", "userEmail", "role"]);
            if (!foundUser) return handleError(res, null, 403); //Forbidden 
            // evaluate jwt 
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err: any, decoded: any) => {
                    if (err || foundUser.userUID !== decoded._id) return handleError(res, null, 403);
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "_id": foundUser.userUID,
                                "email": decoded.email,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
                    );
                    return handleSuccess(res, "", { foundUser, accessToken, roles: foundUser.role });
                }
            );
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async UpdateInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const user: any = await AuthenticationService.UpdateUser("update", req.body, { userUID: req.userInfo.userUID });
            return handleSuccess(res, "Updated Successfully", user);
        } catch (error) {
            return handleError(res, "An error occurred", 400);
        }
    }
}

export default AuthenticationController;
