import { NextFunction, Request, Response } from "express";
import PlatenoService from './plateno.service';
import { Op, CreationAttributes, IncludeOptions, InferAttributes } from "sequelize";
import { handleError, handleSuccess } from '../../custom/functions/messageHandlers';
import ValidatorMiddleware from "../../middlewares/validator";
import OwnerInfos from '../../models/ownerinfo';
import VehicleInfos from '../../models/vehicleinfo';
import FrscInfos from '../../models/frscinfo';
import { uuid4, randomString } from "../../custom/functions/randomGenerator";

const arrayVariables: Array<string> = [
    "plateNo", "plateImage",
    "ownerImage", "ownerName", "ownerID", "ownerMobileNo", "ownerHomeLine", "ownerEmail", "ownerAddress", "ownerCity", "ownerLGA",
    "vehicleName", "vehicleManufacturer", "vehicleCategory", "vehicleModelNo", "vehicleChassisNo", "vehicleEpiringDate", "vehicleAllocationDate", "vehicleMake"
];

class PlatenoController {
    public validatorMiddleware = new ValidatorMiddleware();

    constructor() { }

    async CountPlates(req: Request, res: Response, next: NextFunction) {
        try {
            const plateno: any = await PlatenoService.PlateInfoQuery(FrscInfos, "count", {});
            return handleSuccess(res, "Count Successfully", plateno);
        } catch (error) {
            console.log(error);
            return handleError(res, "An error occurred", 400);
        }
    }

    async ListPlates(req: Request, res: Response, next: NextFunction) {
        try {
            const plateno: any = await PlatenoService.PlateInfoRobustQuery(FrscInfos, "findAll");
            return handleSuccess(res, "Retrieval Successfully", plateno);
        } catch (error) {
            console.error(error);
            return handleError(res, "An error occurred", 400);
        }
    }

    async SearchPlates(req: Request, res: Response, next: NextFunction) {
        try {
            const presentCheck: any = await this.validatorMiddleware.checkIfPresent(["plateNo"], req);
            if (presentCheck.length != 0) {
                return handleError(res, presentCheck, 403);
            }
            const plateno: any = await PlatenoService.PlateInfoQuery(FrscInfos, "findOne",
                {
                    plateNo: {
                        [Op.eq]: req.body.plateNo
                    },
                });
            return handleSuccess(res, "Search Completed", plateno);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async AddPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const presentCheck: any = await this.validatorMiddleware.checkIfPresent(arrayVariables, req);
            if (presentCheck.length != 0) {
                return handleError(res, presentCheck, 403);
            }
            const checkIfExist: any = await PlatenoService.PlateInfoQuery(FrscInfos, "findOne",
                {
                    plateNo: {
                        [Op.eq]: req.body.plateNo
                    },
                });
            if (checkIfExist != null)
                return handleError(res, "Plate Info Already Exist", 400);
            const uniqueID: string = uuid4();
            const frscRegNo: string = randomString(8);
            const plateno: any = await Promise.all([
                PlatenoService.AddPlateInfo(FrscInfos, "create", {
                    plateNo: req.body.plateNo,
                    uniqueID,
                    frscRegNo,
                    plateImage: req.body.plateImage
                }),
                PlatenoService.AddPlateInfo(OwnerInfos, "create", {
                    uniqueID,
                    ownerImage: req.body.ownerImage,
                    ownerName: req.body.ownerName,
                    ownerID: req.body.ownerID,
                    ownerMobileNo: req.body.ownerMobileNo,
                    ownerHomeLine: req.body.ownerHomeLine,
                    ownerEmail: req.body.ownerEmail,
                    ownerAddress: req.body.ownerAddress,
                    ownerCity: req.body.ownerCity,
                    ownerLGA: req.body.ownerLGA,
                }),
                PlatenoService.AddPlateInfo(VehicleInfos, "create", {
                    uniqueID,
                    vehicleName: req.body.vehicleName,
                    vehicleManufacturer: req.body.vehicleManufacturer,
                    vehicleCategory: req.body.vehicleCategory,
                    vehicleModelNo: req.body.vehicleModelNo,
                    vehicleChassisNo: req.body.vehicleChassisNo,
                    vehicleEpiringDate: req.body.vehicleEpiringDate,
                    vehicleAllocationDate: req.body.vehicleAllocationDate,
                    vehicleMake: req.body.vehicleMake,
                }),
            ])
            return handleSuccess(res, "Added Successfully", plateno);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async EditPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const presentCheck: any = await this.validatorMiddleware.checkIfPresent(arrayVariables, req);
            if (presentCheck.length != 0) {
                return handleError(res, presentCheck, 403);
            }
            const plateno: any = await Promise.all([
                PlatenoService.UpdatePlateInfo(FrscInfos, "update", {
                    plateNo: req.body.plateNo,
                    plateImage: req.body.plateImage
                }, { uniqueID: req.params.id }),
                PlatenoService.UpdatePlateInfo(OwnerInfos, "update", {
                    ownerImage: req.body.ownerImage,
                    ownerName: req.body.ownerName,
                    ownerID: req.body.ownerID,
                    ownerMobileNo: req.body.ownerMobileNo,
                    ownerHomeLine: req.body.ownerHomeLine,
                    ownerEmail: req.body.ownerEmail,
                    ownerAddress: req.body.ownerAddress,
                    ownerCity: req.body.ownerCity,
                    ownerLGA: req.body.ownerLGA,
                }, { uniqueID: req.params.id }),
                PlatenoService.UpdatePlateInfo(VehicleInfos, "update", {
                    vehicleName: req.body.vehicleName,
                    vehicleManufacturer: req.body.vehicleManufacturer,
                    vehicleCategory: req.body.vehicleCategory,
                    vehicleModelNo: req.body.vehicleModelNo,
                    vehicleChassisNo: req.body.vehicleChassisNo,
                    vehicleEpiringDate: req.body.vehicleEpiringDate,
                    vehicleAllocationDate: req.body.vehicleAllocationDate,
                    vehicleMake: req.body.vehicleMake,
                }, { uniqueID: req.params.id }),
            ])
            return handleSuccess(res, "Updated Successfully", plateno[0]);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async DeletePlate(req: Request, res: Response, next: NextFunction) {
        try {
            const plateno: any = await PlatenoService.DeletePlateInfo(FrscInfos, "destroy", {
                uniqueID: req.params.id
            }, true);
            return handleSuccess(res, "Deleted Successfully", plateno);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }
}

export default PlatenoController;
