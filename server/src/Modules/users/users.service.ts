import db from '../../models/index';
import { QueryHelper } from "../../custom/helpers/query.helper";
import Users from '../../models/user';


export default class UserService {
    private static queryHelper = new QueryHelper();

    constructor() { }

    public static async UserQuery(clause: string, userData: any, attributes: Array<string>) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(Users, clause, {
                    where: userData,
                    attributes,
                    paranoid: false,
                    transaction,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async AddUser(clause: string, data: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.updateQuery(Users, clause, data, {
                    transaction,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async DeleteUser(clause: string, data: any, force: boolean = false) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(Users, clause, {
                    where: data,
                    transaction,
                    force,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async UpdateUser(clause: string, data: any, userData: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.updateQuery(Users, clause,
                    data,
                    {
                        where: userData,
                        transaction,
                    });
            });
        } catch (error) {
            console.error(error);
        }
    }

}
