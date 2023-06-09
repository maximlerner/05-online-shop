const AppError = require('./../Utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message,400);
}

const handlJWTError = () => new AppError('Invalid token.please login again!',401);

const handlJWTExpiredError = () => new AppError('Your token has expired! please login again.',401)

const handleValidationError = (err) => {
  const value = Object.values(err.errors).join(', ');

  return new AppError(value,400)
}

const handleDuplicateFieldsDB = err => {
  const value = Object.values(err.keyValue).join(', ');

  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
}
const sendErrorDev = (err,res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err,res) => {
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.error('Error',err)
    res.status(500).json({
      status:'error',
      message: 'Something went wrong!'
    })
  }
}
module.exports = (err,req,res,next) => {


  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'production') {
    sendErrorDev(err,res)
  } else if (process.env.NODE_ENV.trim() === 'development') {
    let error = {...err}
    
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError' ) error = handleValidationError(error)
    if (err.name === 'JsonWebTokenError') error = handlJWTError();
    if (err.name === 'TokenExpiredError') error = handlJWTExpiredError();


    sendErrorProd(error,res)
  }  
}