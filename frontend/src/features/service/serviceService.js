import axios from 'axios'

//get all services
const getAllServices = async () => {
  const response = await axios.get('/api/services')
  return response.data.data
}

//get top services
const getTopServices = async (token) => {
  const response = await axios.get('/api/services/most-popular')
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

//get all transports
const getAllTransports = async () => {
  const response = await axios.get('/api/services?serviceType=transportation')
  return response.data.data
}

//get transport by id
const getTransportById = async (id) => {
  const response = await axios.get(`/api/services/${id}`)
  return response.data.data
}

//get all accomodations
const getAllAcomodations = async () => {
  const response = await axios.get('/api/services?serviceType=accomodation')
  return response.data.data
}

//get all tours
const getAllTours = async () => {
  const response = await axios.get('/api/services?serviceType=tours')
  return response.data.data
}

const serviceService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getTopServices,
  getAllTransports,
  getTransportById,
  getAllAcomodations,
  getAllTours,
}

export default serviceService
