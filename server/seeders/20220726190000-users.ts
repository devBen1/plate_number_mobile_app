import { QueryInterface, CreationAttributes } from "sequelize";
import bcryptjs from 'bcryptjs';
import faker from "faker";

import { users } from "../types/models/users";
import UserType = users.Users;

import { uuid4, randomString } from "../src/custom/functions/randomGenerator";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				const usersData: Array<CreationAttributes<UserType>> = [
					{
						userUID: uuid4(),
						username: "admin",
						userFullName: "Admin",
						userEmail: "admin@gmail.com",
						password: bcryptjs.hashSync("admin@gmail.com", 10),
						role: "ADMIN",
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						userUID: uuid4(),
						username: "officer01",
						userFullName: "FRSC Officer",
						userEmail: "officer@frsc.com",
						password: bcryptjs.hashSync("officer@frsc.com", 10),
						role: "OFFICER",
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						userUID: uuid4(),
						username: faker.name.firstName(),
						userFullName: faker.name.findName(),
						userEmail: faker.internet.email(),
						password: bcryptjs.hashSync(randomString(25), 10),
						role: "OFFICER",
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						userUID: uuid4(),
						username: faker.name.firstName(),
						userFullName: faker.name.findName(),
						userEmail: faker.internet.email(),
						password: bcryptjs.hashSync(randomString(25), 10),
						role: "ADMIN",
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
				];

				await queryInterface.bulkInsert("Users", usersData, {
					transaction
				});

			} catch (error) {
				console.log(error);
			}
		});
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				await queryInterface.bulkDelete("Users", {}, { transaction });
			} catch (error) {
				console.log(error);
			}
		});
	},
};