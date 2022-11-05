import axios from 'axios'

//get all destinations
const getAllDestinations = async (token) => {
  const response = await axios.get('/api/destinations')
  return response.data.data
}

//get top destinations
const getTopDestinations = async (token) => {
  const response = await axios.get('/api/destinations/most-popular')
  return response.data.data
}

//get destination by id
const getDestinationById = async (id, token) => {
  const response = await axios.get(`/api/destinations/${id}`)
  return response.data.data
}

//create destination
const createDestination = async (destinationData, token) => {
  const response = await axios.post('/api/destinations', destinationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update destination
const updateDestination = async (id, destinationData, token) => {
  const response = await axios.patch(
    `/api/destinations/${id}`,
    destinationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.data
}

//delete destination
const deleteDestination = async (id, token) => {
  const response = await axios.delete(`/api/destinations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const destinationService = {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getTopDestinations,
}

export default destinationService
