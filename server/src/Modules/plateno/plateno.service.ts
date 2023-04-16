import db from '../../models/index';
import { QueryHelper } from "../../custom/helpers/query.helper";
import OwnerInfos from '../../models/ownerinfo';
import { Op, CreationAttributes, IncludeOptions, InferAttributes } from "sequelize";
import VehicleInfos from '../../models/vehicleinfo';

export default class AppointmentService {
    private static queryHelper = new QueryHelper();
    public static attributesOptions: any = ["uniqueID", "frscRegNo", "plateNo", "plateImage"];
    public static orderOptions: any = [['id', 'DESC']];
    public static includeOptions: Array<any> = [
        {
            model: OwnerInfos,
            as: 'ownerinfos',
            attributes: ["uniqueID", "ownerImage", "ownerName", "ownerID", "ownerMobileNo", "ownerHomeLine", "ownerEmail", "ownerAddress", "ownerCity", "ownerLGA"],
        },
        {
            model: VehicleInfos,
            as: 'vehicleinfos',
            attributes: ["uniqueID", "vehicleName", "vehicleManufacturer", "vehicleCategory", "vehicleModelNo", "vehicleChassisNo", "vehicleEpiringDate", "vehicleAllocationDate", "vehicleMake"],
        } as IncludeOptions,
    ];

    constructor() { }

    public static async PlateInfoQuery(
        model: any,
        clause: string,
        userData: any,
        include: any = (null || undefined) ?? this.includeOptions,
        order: any = (null || undefined) ?? this.orderOptions,
        attributes: Array<string> = (null || undefined) ?? this.attributesOptions
    ) {
        try {
            return db.transaction(async (transaction) => {
                include.map((data: any) => {
                    data.transaction = transaction
                })
                return await this.queryHelper.credQuery(model, clause, {
                    where: userData,
                    include,
                    order,
                    attributes,
                    paranoid: false,
                    transaction,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    public static async PlateInfoRobustQuery(
        model: any,
        clause: string,
        include: any = (null || undefined) ?? this.includeOptions,
        order: any = (null || undefined) ?? this.orderOptions,
        attributes: Array<string> = (null || undefined) ?? this.attributesOptions
    ) {
        try {
            return db.transaction(async (transaction) => {
                include.map((data: any) => {
                    data.transaction = transaction
                })
                return await this.queryHelper.credQuery(model, clause, {
                    include,
                    order,
                    attributes,
                    paranoid: true,
                    transaction
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async AddPlateInfo(model: any, clause: string, data: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.updateQuery(model, clause, data, {
                    transaction,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async DeletePlateInfo(model: any, clause: string, data: any, force: boolean = false) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(model, clause, {
                    where: data,
                    transaction,
                    force,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async UpdatePlateInfo(model: any, clause: string, data: any, userData: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.updateQuery(model, clause,
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
