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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const messageHandlers_1 = require("../custom/functions/messageHandlers");
class ValidatorMiddleware {
    validateInputs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let arrayReq = [];
                const obj = req.body;
                Object.keys(obj).map((objKey, index) => {
                    if (objKey == "email") {
                        arrayReq.push((0, express_validator_1.body)("email", "Invalid Email.").trim().escape().isEmail().run(req));
                    }
                    else if (objKey == "new_password") {
                        arrayReq.push((0, express_validator_1.body)("new_password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long")
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
                            .trim()
                            .escape()
                            .run(req));
                        arrayReq.push((0, express_validator_1.body)("confirm_password", "Passwords do not match")
                            .equals(req.body.new_password)
                            .run(req));
                    }
                    else {
                        arrayReq.push((0, express_validator_1.body)(objKey, `Invalid ${objKey.toUpperCase()}`)
                            .trim()
                            .escape()
                            .run(req));
                    }
                });
                yield Promise.all(arrayReq);
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, messageHandlers_1.handleError)(res, errors.array(), 403);
                }
                return next();
            }
            catch (_a) {
                return (0, messageHandlers_1.handleError)(res, "Error in your data", 400);
            }
        });
    }
    checkIfPresent(arrayList, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let arrayReq = [];
                arrayList.map((arr, index) => {
                    if (!(arr in req.body)) {
                        arrayReq.push((0, express_validator_1.body)(arr, `There are some incorrect information`)
                            .notEmpty()
                            .run(req));
                    }
                });
                yield Promise.all(arrayReq);
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return errors.array();
                }
                return [];
            }
            catch (_a) {
                console.log("Error occurred");
            }
        });
    }
}
exports.default = ValidatorMiddleware;
