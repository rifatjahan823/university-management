import {  z } from 'zod'
import { acadamicSemesterCode, acadamicSemesterMonth, acadamicSemesterTitle } from './acadamicSemester.constant'



const createAcadamicSemesterZodSchema = z.object({
  body: z.object({
   title:z.enum([...acadamicSemesterTitle] as [string,...string[]],{
    required_error:'Title is required'
   }),
   year:z.number({
    required_error:"Year is required"
   }),
   code:z.enum([...acadamicSemesterCode]as [string,...string[]],{
    required_error:"Code is required"
   }),
   startMonth:z.enum([...acadamicSemesterMonth] as [string,...string[]],{
        required_error:"StartMonth is require"
    }),
    
   endMonth:z.enum([...acadamicSemesterMonth] as [string,...string[]],{
        required_error:'EndMonth is required'
    })
  }),
})

// await createUserZodSchema.parseAsync(req)

export const AcadamicSemesterValidation={
    createAcadamicSemesterZodSchema
}