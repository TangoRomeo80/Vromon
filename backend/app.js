/*
  This file contains all the express functionalities
  and global middlewares.
*/

import express from 'express' //import express from express
import cors from 'cors' //import cors for CROSS-ORIGIN-RESOURCE-SHARING

//Route imports
import serviceRouter from './routes/serviceRoutes.js' //import service routes

const app = express() //create an instance of express
app.use(cors()) //enable cors

app.use(express.json()) //use json parser

//use Routers
app.use('/api/services', serviceRouter) //use service routes

//route for the root path
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...', app: 'Vromon' })
})

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  })
})

export default app //export ap for use in server.js
