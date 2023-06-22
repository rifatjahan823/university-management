import { acadamicSemesterService } from './acadamicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...acadamicSemesterData } = req.body;
    const result = await acadamicSemesterService.createSemester(
      acadamicSemesterData
    );
    next();
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"CreateSemester",
        data:result
    })
  }
);

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
};
