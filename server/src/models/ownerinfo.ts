import { DataTypes } from 'sequelize';
import { vehicledata } from "../../types/models/vehicle";
import db from './index';

import OwnerInfos = vehicledata.OwnerInfo;

const OwnerInfos = db.define<OwnerInfos>(
    "OwnerInfos",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        uniqueID: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerImage: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerID: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerMobileNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerHomeLine: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerEmail: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerAddress: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerCity: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ownerLGA: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: false, // deletedAt
    },
);

export default OwnerInfos;