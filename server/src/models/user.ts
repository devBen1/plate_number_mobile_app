import { DataTypes } from 'sequelize';
import { users } from "../../types/models/users";
import db from './index';

import Users = users.Users;

const Users = db.define<Users>(
    "Users",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        userUID: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        userFullName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        userEmail: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        refreshToken: {
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

export default Users;