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

  return <div>ServiceCreateScreen</div>
}

export default ServiceCreateScreen
