import {
	Sequelize,
	ModelDefined,
	Association,
	Model,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	HasManyGetAssociationsMixin,
	HasManyCreateAssociationMixin,
	NonAttribute,
	CreationAttributes,
	BelongsToGetAssociationMixin,
	ModelAttributes,
	AssociationOptions,
	HasOneGetAssociationMixin,
	HasManySetAssociationsMixin,
	ForeignKey,
} from "sequelize";
export namespace frscInfo {
    export interface FRSCInfo
        extends Model<
            InferAttributes<FRSCInfo>,
            InferCreationAttributes<FRSCInfo>
        > {
        id: CreationOptional<number>;
		uniqueID: string;
		frscRegNo: string;
		plateNo: string;
		plateImage: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
        deletedAt?: Date;
    }
}