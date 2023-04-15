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
            yield queryInterface.createTable("OwnerInfos", {
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
                ownerImage: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerName: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerID: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerMobileNo: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerHomeLine: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerEmail: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerAddress: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerCity: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                ownerLGA: {
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
            yield queryInterface.dropTable("OwnerInfos", { transaction });
            yield transaction.commit();
        }
        catch (err) {
            yield transaction.rollback();
            throw err;
        }
    }),
};
