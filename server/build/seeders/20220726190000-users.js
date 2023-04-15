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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const faker_1 = __importDefault(require("faker"));
const randomGenerator_1 = require("../src/custom/functions/randomGenerator");
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const usersData = [
                    {
                        userUID: (0, randomGenerator_1.uuid4)(),
                        username: "tekwey",
                        userFullName: "Chukwuebuka Jonathan Nnoruka",
                        userEmail: "jonathannnoruka@gmail.com",
                        password: bcryptjs_1.default.hashSync("jonathannnoruka@gmail.com", 10),
                        role: "ADMIN",
                        refreshToken: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        userUID: (0, randomGenerator_1.uuid4)(),
                        username: "officer01",
                        userFullName: "FRSC Officer",
                        userEmail: "officer@frsc.com",
                        password: bcryptjs_1.default.hashSync("officer@frsc.com", 10),
                        role: "OFFICER",
                        refreshToken: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        userUID: (0, randomGenerator_1.uuid4)(),
                        username: faker_1.default.name.firstName(),
                        userFullName: faker_1.default.name.findName(),
                        userEmail: faker_1.default.internet.email(),
                        password: bcryptjs_1.default.hashSync((0, randomGenerator_1.randomString)(25), 10),
                        role: "OFFICER",
                        refreshToken: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        userUID: (0, randomGenerator_1.uuid4)(),
                        username: faker_1.default.name.firstName(),
                        userFullName: faker_1.default.name.findName(),
                        userEmail: faker_1.default.internet.email(),
                        password: bcryptjs_1.default.hashSync((0, randomGenerator_1.randomString)(25), 10),
                        role: "ADMIN",
                        refreshToken: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ];
                yield queryInterface.bulkInsert("Users", usersData, {
                    transaction
                });
            }
            catch (error) {
                console.log(error);
            }
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield queryInterface.bulkDelete("Users", {}, { transaction });
            }
            catch (error) {
                console.log(error);
            }
        }));
    }),
};
