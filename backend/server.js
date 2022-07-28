/* 
  This file contains all the server configurations and functionalities.
*/
import dotenv from 'dotenv' //import dotenv
dotenv.config() //load the .env file

import mongoose from 'mongoose' //import mongoose ODM library
import app from './app.js' //import the express app

//handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

//connect DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connnected successfully')
  })

//listen to port 5000
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

//handling unhandles rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
