import { DataTypes } from 'sequelize';
import { frscInfo } from "../../types/models/frscinfo";
import db from './index';
import OwnerInfos from './ownerinfo';
import VehicleInfos from './vehicleinfo';

import FrscInfos = frscInfo.FRSCInfo;

const FrscInfos = db.define<FrscInfos>(
    "FrscInfos",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        uniqueID: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        frscRegNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        plateNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        plateImage: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deletedAt
    },
);

FrscInfos.hasMany(OwnerInfos, {
    as: 'ownerinfos',
    foreignKey: 'uniqueID',
    sourceKey: 'uniqueID'
});
OwnerInfos.belongsTo(FrscInfos, {
    foreignKey: 'uniqueID',
    targetKey: 'uniqueID',
    onDelete: 'CASCADE'
});

FrscInfos.hasMany(VehicleInfos, {
    as: 'vehicleinfos',
    foreignKey: 'uniqueID',
    sourceKey: 'uniqueID'
});
VehicleInfos.belongsTo(FrscInfos, {
    foreignKey: 'uniqueID',
    targetKey: 'uniqueID',
    onDelete: 'CASCADE'
});

export default FrscInfos;