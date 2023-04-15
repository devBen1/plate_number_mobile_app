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
export namespace users {
    export interface Users
        extends Model<
            InferAttributes<Users>,
            InferCreationAttributes<Users>
        > {
        id: CreationOptional<number>;
		userUID: string;
		username: string;
		userFullName: string;
		userEmail: string;
		password: string;
		role: string;
		refreshToken: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
        deletedAt?: Date;
    }
}