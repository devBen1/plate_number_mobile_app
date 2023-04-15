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
const app_1 = __importDefault(require("./app"));
const authentication_routes_1 = __importDefault(require("./Modules/authentication/authentication.routes"));
const users_routes_1 = __importDefault(require("./Modules/users/users.routes"));
const plateno_routes_1 = __importDefault(require("./Modules/plateno/plateno.routes"));
class Server {
    static getApp() {
        return this.app;
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getApp().close().then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.app.close();
            }));
        });
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.app) {
                this.app = new app_1.default((app) => {
                    return [
                        new authentication_routes_1.default(app),
                        new users_routes_1.default(app),
                        new plateno_routes_1.default(app),
                    ];
                }, this.port);
            }
            yield this.app.init();
            return this.app;
        });
    }
}
exports.default = Server;
Server.port = process.env.PORT;
