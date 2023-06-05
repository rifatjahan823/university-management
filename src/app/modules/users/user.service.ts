import { Request, Response } from "express";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import config from "../../../config";
import { generateUserId } from "./user.utils";

export const createUser =async(user:IUser):Promise<IUser|null >=>{
    //auto generated incremental id
    const id=await generateUserId()
    user.id=id
    //defult password
    if(!user.password){
        user.password=config.defult_user_pass as string
    }

    const createdUser=await User.create(user)
    if(!createdUser){
        throw new Error('Fail to Create User')
    }
return createdUser
    
}

