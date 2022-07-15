const express = require('express') //import express from express

const app = express() //create an instance of express

//route for the root path
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...', app: 'Vromon' })
})



module.exports = app //export ap for use in server.js
