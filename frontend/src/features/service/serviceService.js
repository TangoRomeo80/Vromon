import axios from 'axios'

//get all services
const getAllServices = async () => {
  const response = await axios.get('/api/services?sort=-createdAt')
  return response.data.data
}

//get top services
const getTopServices = async (token) => {
  const response = await axios.get('/api/services/most-popular')
  return response.data.data
}

//get cheapest tours
const getCheapestTours = async (token) => {
  const response = await axios.get('/api/services/cheapest-tours')
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
  const response = await axios.get(
    '/api/services?serviceType=transportation&sort=-createdAt'
  )
  return response.data.data
}

//get transport by id
const getTransportById = async (id) => {
  const response = await axios.get(`/api/services/${id}`)
  return response.data.data
}

//get all accomodations
const getAllAccomodations = async () => {
  const response = await axios.get(
    '/api/services?serviceType=accomodation&sort=-createdAt'
  )
  return response.data.data
}

//get accomodation by id
const getAccomodationById = async (id) => {
  const response = await axios.get(`/api/services/${id}`)
  return response.data.data
}

//get all tours
const getAllTours = async () => {
  const response = await axios.get(
    '/api/services?serviceType=tours&sort=-createdAt'
  )
  return response.data.data
}

//get tour by id
const getTourById = async (id) => {
  const response = await axios.get(`/api/services/${id}`)
  return response.data.data
}

//Add service review
const addServiceReview = async (id, reviewData, token) => {
  const response = await axios.post(`/api/services/${id}/reviews`, reviewData, {
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
  getTopServices,
  getAllTransports,
  getTransportById,
  getAllAccomodations,
  getAccomodationById,
  getAllTours,
  getTourById,
  getCheapestTours,
  addServiceReview,
}

export default serviceService
