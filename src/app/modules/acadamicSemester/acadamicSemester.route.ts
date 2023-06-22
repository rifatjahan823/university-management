import express from 'express'
import { RequestValidation } from '../../middlewares/validateRequest'
import { AcadamicSemesterValidation } from './acadamicSemester.validation'
import { acadamicSemesterController } from './acadamicSemester.controller'

const router = express.Router()
router.post('/create-semester',RequestValidation.validateRequest(AcadamicSemesterValidation.createAcadamicSemesterZodSchema),acadamicSemesterController.createSemester)

export const acadamicSemesterRoute={
     router
    }