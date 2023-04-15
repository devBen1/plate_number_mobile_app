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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield queryInterface.sequelize.transaction();
        try {
            yield queryInterface.createTable("VehicleInfos", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
                },
                uniqueID: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'FrscInfos',
                        key: 'uniqueID',
                    },
                },
                vehicleName: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleManufacturer: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleCategory: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleModelNo: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleChassisNo: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleEpiringDate: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleAllocationDate: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                vehicleMake: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
            }, {
                charset: "utf8mb4",
                collate: "utf8mb4_unicode_ci",
                transaction,
            });
            yield transaction.commit();
        }
        catch (err) {
            yield transaction.rollback();
            throw err;
        }
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield queryInterface.sequelize.transaction();
        try {
            yield queryInterface.dropTable("VehicleInfos", { transaction });
            yield transaction.commit();
        }
        catch (err) {
            yield transaction.rollback();
            throw err;
        }
    }),
};
