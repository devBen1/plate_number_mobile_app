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
const index_1 = __importDefault(require("../../models/index"));
const query_helper_1 = require("../../custom/helpers/query.helper");
const user_1 = __importDefault(require("../../models/user"));
class AppointmentService {
    constructor() { }
    static GetUserInfo(userData, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return index_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.queryHelper.credQuery(user_1.default, "findOne", {
                        where: userData,
                        attributes,
                        paranoid: false,
                        transaction,
                    });
                }));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static UpdateUser(data, userUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return index_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    return yield user_1.default.update(data, {
                        where: { userUID },
                        transaction,
                    });
                }));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = AppointmentService;
AppointmentService.queryHelper = new query_helper_1.QueryHelper();
