import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../features/service/serviceSlice'
import { useDispatch, useSelector } from 'react-redux'

const TestScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const { services, service, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.service)

  const handleGetAllServices = () => {
    dispatch(getAllServices())
  }

  const handleGetServiceById = () => {
    dispatch(getServiceById('633e948c54052ace47ab1cbd'))
  }

  return (
    <>
      <div>TestScreen</div>
      <Button onClick={handleGetAllServices}>Get All Services</Button>
      <Button onClick={handleGetServiceById}>Get Service By Id</Button>
      <Button variant='primary' onClick={() => navigate('/')}>
        Return to home
      </Button>
    </>
  )
}

export default TestScreen
