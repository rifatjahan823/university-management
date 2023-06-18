import cors from 'cors';
import express, {  Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoute } from './app/modules/users/user.route';
// import ApiError from './Error/ApiError';


const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/', UserRoute.router);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//    console.log('x')

// })

// Global error handler
app.use(globalErrorHandler);

export default app;