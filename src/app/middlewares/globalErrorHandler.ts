/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import ApiError from '../../Error/ApiError';
import handleValidationerror from '../../Error/handleValidationError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../Error/handleZodError';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // res.status(400).json({ error:err})

  config.env === 'development'
    ? console.log('🚀 globalErrorHnadler ~~~', error)
    : errorLogger.error('🚀 globalErrorHnadler ~~~', error);

  let statusCode = 500;
  let message = 'Something Went Wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name == 'ValidationError') {
    const simplifiedError = handleValidationerror(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } 
  else if (error instanceof ZodError) {
    const simplifiedError =handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
   else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;

// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';

//   res.status(statusCode).json({ error: message });
//   next()
// };

// export default globalErrorHandler;
