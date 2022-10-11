import axios from 'axios'

//get all services
const getAllServices = async () => {
  const response = await axios.get('/api/services')
  return response.data.data
}

//get service by id
const getServiceById = async (id) => {
  const response = await axios.get(`/api/services/${id}`)
  return response.data.data
}

//create service
const createService = async (serviceData, token) => {
  const response = await axios.post('/api/services', serviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update service
const updateService = async (id, serviceData, token) => {
  const response = await axios.patch(`/api/services/${id}`, serviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//delete service
const deleteService = async (id, token) => {
  const response = await axios.delete(`/api/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const serviceService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
}

export default serviceService
