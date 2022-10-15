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

import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  resetDestinationList,
  resetDestinationDetails,
} from '../features/destination/destinationSlice'

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetUserList,
  resetUserDetails,
} from '../features/user/userSlice'

import { useDispatch, useSelector } from 'react-redux'

const TestScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)


  const handleGetList = () => {
    dispatch(getAllUsers())
  }

  const handleGetDetailById = () => {
    dispatch(getUserById('62e633a777697bb04b9a3be7'))
  }

  const handleListReset = () => {
    dispatch(resetUserList())
  }

  const handleDetailsReset = () => {
    dispatch(resetUserDetails())
  }

  return (
    <>
      <div>TestScreen</div>
      <Button onClick={handleGetList}>Get data list from store</Button>
      <Button onClick={handleGetDetailById}>Get detail of data by ID</Button>
      <Button onClick={handleListReset}>Reset List</Button>
      <Button onClick={handleDetailsReset}>Reset Details</Button>
      <Button variant='primary' onClick={() => navigate('/')}>
        Return to home
      </Button>
    </>
  )
}

export default TestScreen
