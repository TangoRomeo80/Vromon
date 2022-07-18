/* 
  This file contains all the server configurations and functionalities.
*/
import dotenv from 'dotenv' //import dotenv from dotenv
import mongoose from 'mongoose' //import mongoose ODM library
import app from './app.js' //import the express app

dotenv.config() //load the .env file

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
