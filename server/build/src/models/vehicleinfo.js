"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const VehicleInfos = index_1.default.define("VehicleInfos", {
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
    vehicleName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleManufacturer: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleCategory: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleModelNo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleChassisNo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleEpiringDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleAllocationDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    vehicleMake: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: false,
});
exports.default = VehicleInfos;
