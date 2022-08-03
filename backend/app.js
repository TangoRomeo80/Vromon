/*
  This file contains all the express functionalities
  and global middlewares.
*/
import dotenv from 'dotenv' //import dotenv
dotenv.config() //load the .env file

import express from 'express' //import express from express
import cors from 'cors' //import cors for CROSS-ORIGIN-RESOURCE-SHARING
import passport from 'passport' //import passport for authentication
import passportSetup from './controllers/passport.js' //import passport setup

import AppError from './utils/appError.js' //import appError for error report creation
import globalErrorHandler from './controllers/errorController.js' //import global error handler

//Route imports
import serviceRouter from './routes/serviceRoutes.js' //import service routes
import userRouter from './routes/userRoutes.js' //import user routes
import destinationRoutes from './routes/destinationRoutes' //import destination routes

const app = express() //create an instance of express

app.use(cors()) //enable cors

app.use(passport.initialize()) //initialize passport
passportSetup(passport) //setup passport

app.use(express.json()) //use json parser

//use Routers
app.use('/api/services', serviceRouter) //use service routes
app.use('/api/users', userRouter) //use user routes
app.use('api/destinations', )

//route for the root path
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...', app: 'Vromon' })
})

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler) //use global error handler

export default app //export app for use in server.js
