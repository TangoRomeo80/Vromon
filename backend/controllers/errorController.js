import AppError from '../utils/appError.js'

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  console.log(value)

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })

    // Programming or other unknown error: don't leak error details
  } else {
    //Log error
    console.error('ERROR: ', err)

    //Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

const globalErrorHandler = (err, req, res, next) => {
  console.log(err)

  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      let error = { ...err }
      error = handleCastErrorDB(error)
      sendErrorProd(error, res)
    } else if (err.code === 11000) {
      let error = { ...err }
      error = handleDuplicateFieldsDB(error)
      sendErrorProd(error, res)
    } else if (err.name === 'ValidationError') {
      let error = { ...err }
      error = handleValidationErrorDB(error)
      sendErrorProd(error, res)
    } else if (err.name === 'JsonWebTokenError') {
      let error = { ...err }
      error = handleJWTError(error)
      sendErrorProd(error, res)
    } else if (err.name === 'TokenExpiredError') {
      let error = { ...err }
      error = handleJWTExpiredError(error)
      sendErrorProd(error, res)
    } else {
      sendErrorProd(err, res)
    }
  }
}

export default globalErrorHandler
