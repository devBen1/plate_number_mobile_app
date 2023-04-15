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
const messageHandlers_1 = require("../../custom/functions/messageHandlers");
class AppointmentController {
    constructor() { }
    SendMoney(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.transactionPin === res.locals.isUserExist.transactionPin) {
                    return (0, messageHandlers_1.handleSuccess)(res, "Transfer Successful", 200);
                }
                else {
                    return (0, messageHandlers_1.handleError)(res, "Invalid pin. Try again!", 400);
                }
            }
            catch (_a) {
                return (0, messageHandlers_1.handleError)(res, "An error occurred", 400);
            }
        });
    }
}
exports.default = AppointmentController;
