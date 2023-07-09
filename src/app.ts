import cors from 'cors';
import express, {  Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import status from 'http-status'
import { generateFacultyId} from './app/modules/users/user.utils';


// import ApiError from './Error/ApiError';


const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users/', UserRoute.router);
// app.use('/api/v1/acadamic-semester',acadamicSemesterRoute.router)

app.use('/api/v1',router)

//handle not found
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(status.NOT_FOUND).json({
        success:false,
        message:'Not Found',
        errorMessages:[{
            path:req.originalUrl,
            message:"API Not Found"
        }]
    })
    next()
})

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//    console.log('x')

// })

// Global error handler
app.use(globalErrorHandler);

const testId=async()=>{
    const testId=await generateFacultyId()
    console.log(testId)
}
testId()
export default app;