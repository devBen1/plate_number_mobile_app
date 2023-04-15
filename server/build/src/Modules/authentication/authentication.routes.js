"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = __importDefault(require("../../core/routers"));
const authentication_controller_1 = __importDefault(require("./authentication.controller"));
const validator_1 = __importDefault(require("../../middlewares/validator"));
class AuthenticationRoutes extends routers_1.default {
    constructor(app) {
        super();
        this.path = '/auth';
        this.controller = new authentication_controller_1.default();
        this.validatorMiddleware = new validator_1.default();
        this._app = app;
        this.initRouters();
    }
    initRouters() {
        this.router.post(this.path.concat('/login'), [this.validatorMiddleware.validateInputs], this.controller.Login.bind(this));
        this.router.get(this.path.concat('/refresh'), this.controller.RefreshToken.bind(this));
        this.router.get(this.path.concat('/logout'), this.controller.Logout.bind(this));
        this.router.put(this.path.concat('/update/account'), [this.validatorMiddleware.validateInputs], this.controller.UpdateInfo.bind(this));
    }
}
exports.default = AuthenticationRoutes;
