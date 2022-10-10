import axios from 'axios'

//signup user locally
const signupLocal = async (userData) => {
  const response = await axios.post('/api/users/signup/local', userData)
  if (response.data.status === 'success') {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//signin user locally
const signinLocal = async (userData) => {
  const response = await axios.post('/api/users/signin/local', userData)
  if (response.data.status === 'success') {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data.data
}

//logout user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  signupLocal,
  signinLocal,
  logout,
}

export default authService
