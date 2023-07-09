import { catchAsync } from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status'
import { IAcadamicSemester } from './acadamicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { acadamicSemesterFilterableFields } from './acadamicSemester.constant';
import { AcademicSemesterService } from './acadamicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...acadamicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      acadamicSemesterData
    );
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"CreateSemester",
        data:result
    })
  }
);


const getAllSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, acadamicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllsemesters(
      filter,
      paginationOptions
    );

    sendResponse<IAcadamicSemester[]>(res, {
      statusCode: status.OK,
      success: true,
      message: "Semesters retrieved successfully",
      meta: result.meta,
      data: result.data,
    });


  }
);


//single semester
const getSingleSemester =catchAsync(
  async(req:Request,res:Response)=>{
    const id=req.params.id
    const result=await AcademicSemesterService.getSingleSemester(id)
    sendResponse<IAcadamicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: "Semesters get successfully",
      data: result
    });
  }
)


//update
const updateSemester =catchAsync(
  async(req:Request,res:Response)=>{
    const id=req.params.id
    const updatedData=req.body
    const result=await AcademicSemesterService.updateSemester(id,updatedData)
    sendResponse<IAcadamicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: "Semesters Updated successfully",
      data: result
    });
  }
)

//delete
const deleteSemester=catchAsync(
  async(req:Request,res:Response)=>{
    const id=req.params.id
    const result=await AcademicSemesterService.deleteSemester(id)
    sendResponse<IAcadamicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: "Semesters Deleted successfully",
      data: result
    });
  }
)


// const createSemester:RequestHandler =async(req,res,next)=>{
//     try{
//         const {...acadamicSemesterData}=req.body
//         const result = await acadamicSemesterService.createSemester(acadamicSemesterData)
//         res.status(200).json({
//             success:true,
//             message:"Academic Semester creted successfully",
//             data:result
//         })
//     }catch(error){
//         next(error);
//     }

// }
export const acadamicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester
};
