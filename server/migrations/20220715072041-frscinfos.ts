import { QueryInterface, DataTypes } from "sequelize";
import { frscInfo } from "../types/models/frscinfo";
import FrscInfoType = frscInfo.FRSCInfo;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<FrscInfoType>(
				"FrscInfos",
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
						unique: true,
					},
					frscRegNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					plateNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					plateImage: {
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
					deletedAt: {
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
			await queryInterface.dropTable("FrscInfos", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
