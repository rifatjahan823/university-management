import { Request, Response } from "express";
import { createUser } from "./user.service";


const createUsers =async(req:Request,res:Response)=>{
    try{
        const {user}=req.body
        const result = await createUser(user)
        res.status(200).json({
            success:true,
            message:"user creted successfully",
            data:result
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:"fail to create users"
        })
    }

}
export default{
    createUsers
}