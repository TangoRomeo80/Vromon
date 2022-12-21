import React, { useEffect, useState } from 'react'
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
  createBusiness,
  resetBusinessCreate,
} from '../features/business/businessSlice'

const BusinessCreateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    Business,
    isCreateLoading: isBusinessCreateLoading,
    isCreateSuccess: isBusinessCreateSuccess,
    isCreateError: isBusinessCreateError,
    createErrorMessage: businessCreateErrorMessage,
  } = useSelector((state) => state.business)

  const [businessOwner, setBusinessOwner] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [businessTIN, setBusinessTIN] = useState('')
  const [businessLicense, setBusinessLicense] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    return () => {
      dispatch(resetBusinessCreate())
    }
  }, [dispatch])

  return (
    <>
      <Container className='pt-5'>
        {isBusinessCreateLoading ? (
          <Loader />
        ) : isBusinessCreateError ? (
          <Message variant='danger'>{businessCreateErrorMessage}</Message>
        ) : (
          <>
            <Row className='pb-5'>
              <Card.Text as='h2' className='font-weight-bolder text-center'>
                Create Business
              </Card.Text>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default BusinessCreateScreen
