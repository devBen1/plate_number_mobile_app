"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = __importDefault(require("../../core/routers"));
const users_controller_1 = __importDefault(require("./users.controller"));
const validator_1 = __importDefault(require("../../middlewares/validator"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
class FinanceRoutes extends routers_1.default {
    constructor(app) {
        super();
        this.path = '/user';
        this.controller = new users_controller_1.default();
        this.validatorMiddleware = new validator_1.default();
        this.authMiddleware = new auth_1.default();
        this._app = app;
        this.initRouters();
    }
    initRouters() {
        this.router.get(this.path.concat('/list'), [
            this.authMiddleware.checkToken,
            this.authMiddleware.verifyAuth,
            this.validatorMiddleware.validateInputs
        ], this.controller.SendMoney.bind(this));
        this.router.post(this.path.concat('/add'), [
            this.authMiddleware.checkToken,
            this.authMiddleware.verifyAuth,
            this.validatorMiddleware.validateInputs
        ], this.controller.SendMoney.bind(this));
        this.router.put(this.path.concat('/edit:id'), [
            this.authMiddleware.checkToken,
            this.authMiddleware.verifyAuth,
            this.validatorMiddleware.validateInputs
        ], this.controller.SendMoney.bind(this));
        this.router.delete(this.path.concat('/delete:id'), [
            this.authMiddleware.checkToken,
            this.authMiddleware.verifyAuth,
            this.validatorMiddleware.validateInputs
        ], this.controller.SendMoney.bind(this));
    }
}
exports.default = FinanceRoutes;
