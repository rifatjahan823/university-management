import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser,object>;


// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser,UserModel >({
  id: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
},{
    timestamps:true
})

// 3. Create a Model.


export const User = model<IUser,UserModel >('User', userSchema)
