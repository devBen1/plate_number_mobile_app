"use strict";
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
const messageHandlers_1 = require("../custom/functions/messageHandlers");
const authentication_service_1 = __importDefault(require("./../Modules/authentication/authentication.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization || req.headers.Authorization;
                if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
                    return (0, messageHandlers_1.handleError)(res, "Access Denied! Unauthorized User", 401);
                const token = authHeader.split(' ')[1];
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err)
                        return (0, messageHandlers_1.handleError)(res, "Invalid Token...", 403);
                    req.decoded = {
                        _id: decoded.UserInfo._id,
                        email: decoded.UserInfo.email,
                    };
                    next();
                });
                return next();
            }
            catch (error) {
                return (0, messageHandlers_1.handleError)(res, "Error in your data", 400);
            }
        });
    }
    verifyAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.decoded;
                const isUserExist = yield authentication_service_1.default.GetUserInfo({ userUID: userID._id }, [
                    "userUID", "username",
                    "userFullName", "userEmail",
                    "role"
                ]);
                req.user = isUserExist;
                if (!isUserExist) {
                    return (0, messageHandlers_1.handleError)(res, "Invalid Credential", 400);
                }
                return next();
            }
            catch (error) {
                return (0, messageHandlers_1.handleError)(res, "Error in your data", 400);
            }
        });
    }
}
exports.default = AuthMiddleware;
