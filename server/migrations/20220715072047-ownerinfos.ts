import { QueryInterface, DataTypes } from "sequelize";
import { vehicledata } from "../types/models/vehicle";
import OwnerinfoType = vehicledata.OwnerInfo;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<OwnerinfoType>(
				"OwnerInfos",
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
					ownerImage: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerName: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerID: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerMobileNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerHomeLine: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerEmail: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerAddress: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerCity: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					ownerLGA: {
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
			await queryInterface.dropTable("OwnerInfos", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
