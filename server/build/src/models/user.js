"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Users = index_1.default.define("Users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    userUID: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    username: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    userFullName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    userEmail: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    refreshToken: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
});
exports.default = Users;
