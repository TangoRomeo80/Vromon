import axios from 'axios'

//get all users
const getAllUsers = async (token) => {
  const response = await axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//get user by id
const getUserById = async (id, token) => {
  const response = await axios.get(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//create user
const createUser = async (userData, token) => {
  const response = await axios.post('/api/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update user
const updateUser = async (id, userData, token) => {
  const response = await axios.patch(`/api/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//delete user
const deleteUser = async (id, token) => {
  const response = await axios.delete(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//get info about logged in user
const getLoggedInUser = async (token) => { 
  const response = await axios.get('/api/users/getMe', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLoggedInUser,
}

export default userService
