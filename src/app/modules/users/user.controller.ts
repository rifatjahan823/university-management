import { UserService } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status'

const createUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"User Created",
        data:result
    })
  }
);

export const UserController = {
  createUsers,
};
