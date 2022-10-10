import axios from 'axios'

//signup user locally
const signupLocal = async (userData) => {
  const response = await axios.post('/api/users/signup/local', userData)
  if (response.data.status === 'success') {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data.data
}

const authService = {
  signupLocal,
  // logout,
  // login,
}

export default authService
