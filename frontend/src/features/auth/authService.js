import axios from 'axios'

//signup user locally
const signupLocal = async (userData) => {
  const response = await axios.post('/api/users/signup/local', userData)
  if (response.data.status === 'success') {
    localStorage.setItem('userInfo', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//signin user locally
const signinLocal = async (userData) => {
  const response = await axios.post('/api/users/signin/local', userData)
  if (response.data.status === 'success') {
    localStorage.setItem('userInfo', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//get google loggedin user information
const getAuthedUser = async (id) => {
  const response = await axios.get(`/api/users/auth/${id}`)
  if (response.data.status === 'success') {
    localStorage.setItem('userInfo', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//update authed user for further Information
const updateAuthedUser = async (id, userData) => {
  const response = await axios.patch(`/api/users/auth/${id}`, userData)
  if (response.data.status === 'success') {
    localStorage.setItem('userInfo', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//logout user
// const logout = () => {
//   localStorage.removeItem('userInfo')
// }

const authService = {
  signupLocal,
  signinLocal,
  getAuthedUser,
  updateAuthedUser,
  // logout,
}

export default authService
