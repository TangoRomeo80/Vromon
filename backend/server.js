/* 
  This file contains all the server configurations and functionalities.
*/

const app = require('./app') //import the express app

//listen to port 5000
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
