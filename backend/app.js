/*
  This file contains all the express functionalities
  and global middlewares.
*/

import express from 'express' //import express from express

const app = express() //create an instance of express

app.use(express.json()) //use json parser

//route for the root path
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...', app: 'Vromon' })
})

export default app //export ap for use in server.js
