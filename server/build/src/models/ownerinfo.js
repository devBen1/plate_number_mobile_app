"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const OwnerInfos = index_1.default.define("OwnerInfos", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    uniqueID: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerImage: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerID: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerMobileNo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerHomeLine: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerEmail: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerAddress: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerCity: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    ownerLGA: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
});
exports.default = OwnerInfos;
