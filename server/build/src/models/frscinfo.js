"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const ownerinfo_1 = __importDefault(require("./ownerinfo"));
const vehicleinfo_1 = __importDefault(require("./vehicleinfo"));
const FrscInfos = index_1.default.define("FrscInfos", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    uniqueID: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    frscRegNo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    plateNo: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    plateImage: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
});
FrscInfos.hasMany(ownerinfo_1.default, {
    as: 'ownerinfos',
    foreignKey: 'uniqueID',
    sourceKey: 'uniqueID'
});
ownerinfo_1.default.belongsTo(FrscInfos, {
    foreignKey: 'uniqueID',
    targetKey: 'uniqueID',
    onDelete: 'CASCADE'
});
FrscInfos.hasMany(vehicleinfo_1.default, {
    as: 'vehicleinfos',
    foreignKey: 'uniqueID',
    sourceKey: 'uniqueID'
});
vehicleinfo_1.default.belongsTo(FrscInfos, {
    foreignKey: 'uniqueID',
    targetKey: 'uniqueID',
    onDelete: 'CASCADE'
});
exports.default = FrscInfos;
