import { QueryInterface, DataTypes } from "sequelize";
import { users } from "../types/models/users";
import UserType = users.Users;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<UserType>(
				"Users",
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataTypes.INTEGER,
					},
					userUID: {
						type: DataTypes.STRING,
						allowNull: false,
						unique: true,
					},
					username: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					userFullName: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					userEmail: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					password: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					role: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					refreshToken: {
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
			await queryInterface.dropTable("Users", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
