import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  resetServiceList,
  resetServiceDetails,
} from '../features/service/serviceSlice'

import {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  resetBusinessList,
  resetBusinessDetails,
} from '../features/business/businessSlice'

import { useDispatch, useSelector } from 'react-redux'

const TestScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const { businesses, listErrorMessage } = useSelector((state) => state.service)

  const handleGetAllBusinesses = () => {
    dispatch(getAllBusinesses())
  }

  const handleGetBusinessById = () => {
    dispatch(getBusinessById('62f2673ab8da6c2bcdb9d0b7'))
  }

  const handleListReset = () => { 
    dispatch(resetBusinessList())
  }

  const handleDetailsReset = () => { 
    dispatch(resetBusinessDetails())
  }

  return (
    <>
      <div>TestScreen</div>
      <Button onClick={handleGetAllBusinesses}>Get All Businesses</Button>
      <Button onClick={handleGetBusinessById}>Get Business By Id</Button>
      <Button onClick={handleListReset}>Reset List</Button>
      <Button onClick={handleDetailsReset}>Reset Details</Button>
      <Button variant='primary' onClick={() => navigate('/')}>
        Return to home
      </Button>
    </>
  )
}

export default TestScreen
