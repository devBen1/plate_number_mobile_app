"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const authentication_service_1 = __importDefault(require("./authentication.service"));
const messageHandlers_1 = require("../../custom/functions/messageHandlers");
const validator_1 = __importDefault(require("../../middlewares/validator"));
class AuthenticationController {
    constructor() {
        this.validatorMiddleware = new validator_1.default();
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const presentCheck = yield this.validatorMiddleware.checkIfPresent(["username", "password"], req);
                if (presentCheck.length != 0) {
                    return (0, messageHandlers_1.handleError)(res, presentCheck, 403);
                }
                const response = yield authentication_service_1.default.GetUserInfo({
                    [sequelize_1.Op.or]: [
                        { username: req.body.username },
                        { userEmail: req.body.username }
                    ]
                }, [
                    "userUID", "username",
                    "userFullName", "userEmail",
                    "role", "password"
                ]);
                if (response === null) {
                    return (0, messageHandlers_1.handleError)(res, "Invalid Credentials", 400);
                }
                const result = (0, bcryptjs_1.compareSync)(req.body.password, response.password);
                if (!result) {
                    return (0, messageHandlers_1.handleError)(res, "Invalid Credentials", 400);
                }
                const accessToken = (0, jsonwebtoken_1.sign)({
                    "UserInfo": {
                        "_id": response.userUID,
                        "email": response.userEmail,
                    }
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
                const refreshToken = (0, jsonwebtoken_1.sign)({ "email": response.userEmail }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15h' });
                yield authentication_service_1.default.UpdateUser({ refreshToken }, response.userUID);
                response.password = "";
                delete response['password'];
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                const output = {
                    accessToken,
                    response
                };
                return (0, messageHandlers_1.handleSuccess)(res, "Data retrieved successfully", output);
            }
            catch (err) {
                return (0, messageHandlers_1.handleError)(res, "An error occurred", 400);
            }
        });
    }
    Logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                    return (0, messageHandlers_1.handleError)(res, null, 204);
                const refreshToken = cookies.jwt;
                const foundUser = yield authentication_service_1.default.GetUserInfo({ refreshToken }, ["userUID"]);
                if (!foundUser) {
                    res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
                    return (0, messageHandlers_1.handleError)(res, null, 204);
                }
                yield authentication_service_1.default.UpdateUser({ refreshToken: "" }, foundUser.userUID);
                res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
                return (0, messageHandlers_1.handleError)(res, null, 204);
            }
            catch (_a) {
                return (0, messageHandlers_1.handleError)(res, "An error occurred", 400);
            }
        });
    }
    RefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                    return (0, messageHandlers_1.handleError)(res, null, 401);
                const refreshToken = cookies.jwt;
                const foundUser = yield authentication_service_1.default.GetUserInfo({ refreshToken }, ["userUID", "username", "userFullName", "userEmail", "role"]);
                if (!foundUser)
                    return (0, messageHandlers_1.handleError)(res, null, 403);
                jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err || foundUser.userUID !== decoded._id)
                        return (0, messageHandlers_1.handleError)(res, null, 403);
                    const accessToken = jsonwebtoken_1.default.sign({
                        "UserInfo": {
                            "_id": foundUser.userUID,
                            "email": decoded.email,
                        }
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
                    return (0, messageHandlers_1.handleSuccess)(res, "", { foundUser, accessToken, roles: foundUser.role });
                });
            }
            catch (_a) {
                return (0, messageHandlers_1.handleError)(res, "An error occurred", 400);
            }
        });
    }
    UpdateInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authentication_service_1.default.UpdateUser(req.body, req.user.userUID);
                return (0, messageHandlers_1.handleSuccess)(res, "Updated Successfully", user);
            }
            catch (error) {
                return (0, messageHandlers_1.handleError)(res, "An error occurred", 400);
            }
        });
    }
}
exports.default = AuthenticationController;
