const express = require('express') //import express from express

const app = express() //create an instance of express

//route for the root path
app.get('/', (req, res) => {
  res.status(200).send('API is running...')
})

module.exports = app //export ap for use in server.js
