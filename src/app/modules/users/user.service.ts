import ApiError from "../../../Error/ApiError";
import config from "../../../config/index";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";



 const createUser =async(user:IUser):Promise<IUser | null>=>{

//   // auto generated incremental id
const acadamicSemester={
  code:"01",
  year:"2025"
}
  const id = await generateFacultyId(acadamicSemester);
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

    const createdUser=await User.create(user)
    if(!createUser){
        throw new ApiError(400, 'Failed to create');
    }
    return createdUser
    
}

export const UserService={
    createUser
}