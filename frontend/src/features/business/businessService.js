import axios from 'axios'

//get all businesses
const getAllBusinesses = async (token) => {
  const response = await axios.get('/api/businesses?sort=-createdAt', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//get business by id
const getBusinessById = async (id, token) => {
  const response = await axios.get(`/api/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//create business
const createBusiness = async (businessData, token) => {
  const response = await axios.post('/api/businesses', businessData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update business
const updateBusiness = async (id, businessData, token) => {
  const response = await axios.patch(`/api/businesses/${id}`, businessData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//delete business
const deleteBusiness = async (id, token) => {
  const response = await axios.delete(`/api/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const businessService = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
}

export default businessService
