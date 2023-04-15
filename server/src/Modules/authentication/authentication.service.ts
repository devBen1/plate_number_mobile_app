import db from '../../models/index';
import { QueryHelper } from "../../custom/helpers/query.helper";
import Users from '../../models/user';


export default class AppointmentService {
    private static queryHelper = new QueryHelper();

    constructor() { }

    public static async GetUserInfo(userData: any, attributes: Array<string>) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(Users, "findOne", {
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

    public static async UpdateUser(data: any, userUID: string) {
        try {
            return db.transaction(async (transaction) => {
                return await Users.update(data, {
                    where: { userUID },
                    transaction,
                }
                );
            });
        } catch (error) {
            console.error(error);
        }
    }

}
