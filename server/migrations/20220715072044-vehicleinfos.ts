import { QueryInterface, DataTypes } from "sequelize";
import { vehicledata } from "../types/models/vehicle";
import VehicleInfoType = vehicledata.VehicleInfo;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<VehicleInfoType>(
				"VehicleInfos",
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataTypes.INTEGER,
					},
					uniqueID: {
						type: DataTypes.STRING,
						allowNull: false,
						onDelete: 'CASCADE',
						references: {
							model: 'FrscInfos',
							key: 'uniqueID',
						},
					},
					vehicleName: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleManufacturer: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleCategory: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleModelNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleChassisNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleEpiringDate: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleAllocationDate: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					vehicleMake: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					createdAt: {
						allowNull: false,
						type: DataTypes.DATE,
					},
					updatedAt: {
						allowNull: false,
						type: DataTypes.DATE,
					},
				},
				{
					charset: "utf8mb4",
					collate: "utf8mb4_unicode_ci",
					transaction,
				}
			);
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	down: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable("VehicleInfos", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
