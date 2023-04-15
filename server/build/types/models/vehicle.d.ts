import { Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey } from "sequelize";
import { frscInfo } from "./frscinfo";
export declare namespace vehicledata {
    interface VehicleInfo extends Model<InferAttributes<VehicleInfo>, InferCreationAttributes<VehicleInfo>> {
        id: CreationOptional<number>;
        uniqueID: ForeignKey<frscInfo.FRSCInfo["uniqueID"]>;
        vehicleName: string;
        vehicleManufacturer: string;
        vehicleCategory: string;
        vehicleModelNo: string;
        vehicleChassisNo: string;
        vehicleEpiringDate: string;
        vehicleAllocationDate: string;
        vehicleMake: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
        deletedAt?: Date;
    }
    interface OwnerInfo extends Model<InferAttributes<OwnerInfo>, InferCreationAttributes<OwnerInfo>> {
        id: CreationOptional<number>;
        uniqueID: ForeignKey<frscInfo.FRSCInfo["uniqueID"]>;
        ownerImage: string;
        ownerName: string;
        ownerID: string;
        ownerMobileNo: string;
        ownerHomeLine: string;
        ownerEmail: string;
        ownerAddress: string;
        ownerCity: string;
        ownerLGA: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
    }
}
