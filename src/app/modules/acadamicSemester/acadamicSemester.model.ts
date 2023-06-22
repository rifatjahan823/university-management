import { Schema, model } from "mongoose";
import { AcadamicSemesterModel, IAcadamicSemester } from "./acadamicSemester.interface";
import { acadamicSemesterCode, acadamicSemesterMonth, acadamicSemesterTitle } from "./acadamicSemester.constant";
import ApiError from "../../../Error/ApiError";
import status from 'http-status';

const acadamicSemesterSchema=new Schema<IAcadamicSemester,AcadamicSemesterModel> ({
    title:{
        type: String, required: true,
        enum:acadamicSemesterTitle
    },
    year:{
        type: Number, required: true
    },
    code:{
        type: String, required: true,
        enum:acadamicSemesterCode
    },
    startMonth:{
        type: String, required: true,
        enum:acadamicSemesterMonth
    },
    endMonth:{
        type: String, required: true,
        enum:acadamicSemesterMonth
    }

},{
    timestamps:true}
)
acadamicSemesterSchema.pre('save',async function(next) {
    const isExist =await AcadamicSemester.findOne({title:this.title,year:this.year})
    if(isExist){
        throw new ApiError(status.CONFLICT,'Acadamic Semester is already exist')
    }
    next()
})



export const AcadamicSemester=model<IAcadamicSemester,AcadamicSemesterModel>('AcadamicSemester',acadamicSemesterSchema)


