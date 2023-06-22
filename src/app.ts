import cors from 'cors';
import express, {  Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

// import ApiError from './Error/ApiError';


const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users/', UserRoute.router);
// app.use('/api/v1/acadamic-semester',acadamicSemesterRoute.router)

app.use('/api/v1',router)



//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//    console.log('x')

// })

// Global error handler
app.use(globalErrorHandler);

export default app;