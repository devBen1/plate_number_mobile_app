import { NextFunction, Request, Response } from "express";
import bcryptjs, { compareSync } from 'bcryptjs';
import { Op } from 'sequelize';
import UserService from './users.service';
import { handleError, handleSuccess } from '../../custom/functions/messageHandlers';
import { uuid4 } from "../../custom/functions/randomGenerator";
import ValidatorMiddleware from "../../middlewares/validator";

class UserController {
    public validatorMiddleware = new ValidatorMiddleware();
    constructor() { }

    async ListUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const user: any = await UserService.UserQuery("findAll",
                {
                    userUID: {
                        [Op.not]: req.userInfo.userUID
                    },
                },
                [
                    "userUID", "username",
                    "userFullName", "userEmail",
                    "role"
                ]);
            return handleSuccess(res, "Retrieved Successfully", user);
        } catch (error) {
            console.log(error);
            return handleError(res, "An error occurred", 400);
        }
    }

    async AddUser(req: Request, res: Response, next: NextFunction) {
        try {
            const presentCheck: any = await this.validatorMiddleware.checkIfPresent(
                ["username", "new_password", "confirm_password", "userFullName", "userEmail"],
                req
            );
            if (presentCheck.length != 0) {
                return handleError(res, presentCheck, 403);
            }
            const checkIfExist: any = await UserService.UserQuery("findOne",
                {
                    [Op.or]: {
                        username: {
                            [Op.eq]: req.body.username
                        },
                        userEmail: {
                            [Op.eq]: req.body.userEmail
                        },
                    }
                }, ["userEmail", "username"]);
            if (checkIfExist != null)
                return handleError(res, "User Account Already Exist", 400);
            req.body.role = "OFFICER";
            req.body.userUID = uuid4();
            req.body.refreshToken = "";
            req.body.password = bcryptjs.hashSync(req.body.new_password, 10);
            const user: any = await UserService.AddUser("create", req.body);
            return handleSuccess(res, "Added Successfully", user);
        } catch (error) {
            return handleError(res, "An error occurred", 400);
        }
    }

    async EditUser(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.UpdateUser("update", req.body, { userUID: req.params.id });
            return handleSuccess(res, "Updated Successfully", req.body);
        } catch (error) {
            return handleError(res, "An error occurred", 400);
        }
    }

    async DeleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.DeleteUser("destroy", {
                userUID: req.params.id
            }, true);
            return handleSuccess(res, "Deleted Successfully", "");
        } catch (error) {
            return handleError(res, "An error occurred", 400);
        }
    }
}

export default UserController;
