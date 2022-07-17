/* 
  This file contains all the server configurations and functionalities.
*/
const dotenv = require('dotenv') //import dotenv from dotenv
const app = require('./app') //import the express app

dotenv.config() //load the .env file

//listen to port 5000
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})
