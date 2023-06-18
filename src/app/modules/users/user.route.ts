import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import { RequestValidation } from '../../middlewares/validateRequest'

const router = express.Router()
router.post('/create-user',RequestValidation.validateRequest(UserValidation.createUserZodSchema),UserController.createUsers)

export const UserRoute={
     router
    }