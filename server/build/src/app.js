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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class App {
    get getApp() {
        return this.app;
    }
    get getServer() {
        return this.server;
    }
    constructor(callback, port) {
        this.whitelist = [
            'http://localhost:3001',
            'https://frscverification.com',
        ];
        this.app = (0, express_1.default)();
        this.port = port;
        this.routersCB = callback;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const corsOptions = {
                credentials: true,
                origin: (origin, callback) => {
                    if (!origin || this.whitelist.indexOf(origin) !== -1) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error("Not allowed by CORS: " + origin));
                    }
                },
                optionsSuccessStatus: 200
            };
            this.app.use(express_1.default.json());
            this.app.use((0, cors_1.default)(corsOptions));
            this.app.use((0, cookie_parser_1.default)());
            this.app.use('/', express_1.default.static('./public'));
            this.app.use((0, helmet_1.default)());
            yield this.initRouters();
        });
    }
    initRouters() {
        return __awaiter(this, void 0, void 0, function* () {
            this.routers = this.routersCB(this);
            this.routers.forEach((routes) => {
                this.app.use('/api/', routes.router);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.server) {
                this.server.close();
            }
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = this.app.listen(this.port, () => {
                console.log(`🚀 Server is running on port ${this.port}`);
            });
            return this.app;
        });
    }
}
exports.default = App;
