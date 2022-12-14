import axios from 'axios'

//get all payments
const getAllPayments = async (token) => {
  const response = await axios.get('/api/payments?sort=-createdAt', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//get payment by id
const getPaymentById = async (id, token) => {
  const response = await axios.get(`/api/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//create payment
const createPayment = async (paymentData, token) => {
  const response = await axios.post('/api/payments', paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//update payment
const updatePayment = async (id, paymentData, token) => {
  const response = await axios.patch(`/api/payments/${id}`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

//delete payment
const deletePayment = async (id, token) => {
  const response = await axios.delete(`/api/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

const paymentService = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
}

export default paymentService
