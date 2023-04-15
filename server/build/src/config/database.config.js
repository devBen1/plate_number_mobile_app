"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configDB = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
            charset: "utf8",
        },
        define: {
            timestamps: true,
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
            charset: "utf8",
        },
        define: {
            timestamps: true,
        },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            charset: "utf8",
            multipleStatements: true,
            bigNumberStrings: true,
        },
        logging: false,
        define: {
            timestamps: true,
        },
    },
};
exports.default = configDB;
