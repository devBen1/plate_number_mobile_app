import { DataTypes } from 'sequelize';
import { vehicledata } from "../../types/models/vehicle";
import db from './index';

import VehicleInfos = vehicledata.VehicleInfo;

const VehicleInfos = db.define<VehicleInfos>(
    "VehicleInfos",
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
        vehicleName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleManufacturer: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleCategory: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleModelNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleChassisNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleEpiringDate: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleAllocationDate: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vehicleMake: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: false,
    },
);

export default VehicleInfos;