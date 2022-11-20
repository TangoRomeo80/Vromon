/*
  This file contains all the express functionalities
  and global middlewares.
*/
import path from 'path' //import path for folder locationing

import dotenv from 'dotenv' //import dotenv
dotenv.config() //load the .env file

import express from 'express' //import express from express
import cors from 'cors' //import cors for CROSS-ORIGIN-RESOURCE-SHARING

//security functionality
import { rateLimit } from 'express-rate-limit' //for limiting requests from single IP
import helmet from 'helmet' //for setting security HTTP headers
import mongoSanitize from 'express-mongo-sanitize' //for data sanitization against NoSQL query injection
import xss from 'xss-clean' //for data sanitization against XSS

//authenticator functionalities
import passport from 'passport' //import passport for authentication
import passportSetup from './controllers/passport.js' //import passport setup

//error handling functionalities
import AppError from './utils/appError.js' //import appError for error report creation
import globalErrorHandler from './controllers/errorController.js' //import global error handler

//Route imports
import serviceRouter from './routes/serviceRoutes.js' //import service routes
import userRouter from './routes/userRoutes.js' //import user routes
import destinationRouter from './routes/destinationRoutes.js' //import destination routes
import businessRouter from './routes/businessRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'

const app = express() //create an instance of express

app.use(cors()) //enable cors

//global middlewares

app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

app.use(express.json({ limit: '50kb' })) //use json parser with 50kb request limit

app.use(passport.initialize()) //initialize passport
passportSetup(passport) //setup passport

//use Routers
app.use('/api/services', serviceRouter) //use service routes
app.use('/api/users', userRouter) //use user routes
app.use('/api/destinations', destinationRouter) //destination routes
app.use('/api/businesses', businessRouter) //use businesses routes
app.use('/api/bookings', bookingRouter) //use booking routes
app.use('/api/upload', uploadRouter)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//route for the root path
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...', app: 'Vromon' })
})

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler) //use global error handler

export default app //export app for use in server.js
