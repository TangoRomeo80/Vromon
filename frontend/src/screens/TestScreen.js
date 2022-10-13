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

import {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from '../features/business/businessSlice'

import { useDispatch, useSelector } from 'react-redux'

const TestScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const { services, service, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.service)

  const handleGetAllBusinesses = () => {
    dispatch(getAllBusinesses())
  }

  const handleGetBusinessById = () => {
    dispatch(getBusinessById('62f2673ab8da6c2bcdb9d0b7'))
  }

  return (
    <>
      <div>TestScreen</div>
      <Button onClick={handleGetAllBusinesses}>Get All Businesses</Button>
      <Button onClick={handleGetBusinessById}>Get Business By Id</Button>
      <Button variant='primary' onClick={() => navigate('/')}>
        Return to home
      </Button>
    </>
  )
}

export default TestScreen
