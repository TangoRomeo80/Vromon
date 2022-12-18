import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Carousel,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import {
  createService,
  resetServiceCreate,
} from '../features/service/serviceSlice'
import {
  getAllDestinations,
  resetDestinationList,
} from '../features/destination/destinationSlice'
import {
  getAllBusinesses,
  resetBusinessList,
} from '../features/business/businessSlice'

const ServiceCreateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    service,
    isCreateError: isServiceCreateError,
    isCreateSuccess: isServiceCreateSuccess,
    isCreateLoading: isServiceCreateLoading,
    createErrorMessage: serviceCreateErrorMessage,
  } = useSelector((state) => state.destination)

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business)

  const {
    destinations,
    isListLoading: isDestinationListLoading,
    isListSuccess: isDestinationListSuccess,
    isListError: isDestinationListError,
    listErrorMessage: destinationListErrorMessage,
  } = useSelector((state) => state.destination)

  const [ownedBusinesses, setOwnedBusinesses] = useState([])

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: 'top-center' })
    } else if (isBusinessListSuccess) {
      setOwnedBusinesses(
        businesses.filter(
          (business) => business.businessOwner._id === userInfo._id
        )
      )
    } else {
      dispatch(getAllBusinesses())
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  return (
    <>
      <h1>Create service</h1>
    </>
  )
}

export default ServiceCreateScreen
