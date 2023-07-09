import express from 'express'
import { RequestValidation } from '../../middlewares/validateRequest'
import { acadamicSemesterController } from './acadamicSemester.controller'
import { AcademicSemesterValidation } from './acadamicSemester.validation'



const router = express.Router()
router.post('/create-semester',RequestValidation.validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),acadamicSemesterController.createSemester)

router.get('/',acadamicSemesterController.getAllSemester)

router.get('/:id',acadamicSemesterController.getSingleSemester)

router.patch('/:id',RequestValidation.validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),acadamicSemesterController.updateSemester)

router.delete('/:id',acadamicSemesterController.deleteSemester)


export const acadamicSemesterRoute={
     router
    }