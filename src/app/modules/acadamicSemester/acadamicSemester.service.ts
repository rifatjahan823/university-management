import ApiError from "../../../Error/ApiError";
import { acadamicSemesterTitleCodeMapper } from "./acadamicSemester.constant";
import { IAcadamicSemester } from "./acadamicSemester.interface";
import { AcadamicSemester } from "./acadamicSemester.model";
import status from 'http-status';

const createSemester=async(payload:IAcadamicSemester):Promise<IAcadamicSemester>=>{
    if(acadamicSemesterTitleCodeMapper[payload.title]!==payload.code){
        throw new ApiError(status.BAD_REQUEST,'Title & Status Code Not MAtching')
    }
    const result=await AcadamicSemester.create(payload)
    return result
}

export const acadamicSemesterService={
    createSemester
}