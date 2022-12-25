import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
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
    if (isBusinessCreateError) {
      toast.error(businessCreateErrorMessage, { position: 'top-center' })
    } else if (isBusinessCreateSuccess) {
      toast.success('Business created successfully', { position: 'top-center' })
      navigate(`/businessList`)
    }
  }, [
    isBusinessCreateError,
    businessCreateErrorMessage,
    isBusinessCreateSuccess,
    navigate,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetBusinessCreate())
    }
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    const businessData = {
      businessOwner: userInfo._id,
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      businessWebsite,
      businessTIN,
      businessLicense,
      businessDescription,
    }
    dispatch(createBusiness(businessData))
  }

  return (
    <>
      <Container className='pt-5'>
        {isBusinessCreateLoading ? (
          <Loader />
        ) : (
          <>
            <Row className='pb-5'>
              <Card.Text as='h2' className='font-weight-bolder text-center'>
                Create Business
              </Card.Text>
            </Row>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col xs={12} md={12} xl={12}>
                  <Card className='mb-4'>
                    <Card.Header>Business Information</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group controlId='businessName' className='mb-3'>
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              placeholder={
                                businessName === ''
                                  ? 'Business Name is Required'
                                  : 'Enter Business Name'
                              }
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessAddress'
                            className='mb-3'
                          >
                            <Form.Label>Business Address</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              placeholder={
                                businessAddress === ''
                                  ? 'Business Address is Required'
                                  : 'Enter Business Address'
                              }
                              value={businessAddress}
                              onChange={(e) =>
                                setBusinessAddress(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessPhone'
                            className='mb-3'
                          >
                            <Form.Label>Business Phone</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              placeholder={
                                businessPhone === ''
                                  ? 'Business Phone is Required'
                                  : 'Enter Business Phone'
                              }
                              value={businessPhone}
                              onChange={(e) => setBusinessPhone(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessEmail'
                            className='mb-3'
                          >
                            <Form.Label>Business Email</Form.Label>
                            <Form.Control
                              required
                              type='email'
                              placeholder={
                                businessEmail === ''
                                  ? 'Business Email is Required'
                                  : 'Enter Business Email'
                              }
                              value={businessEmail}
                              onChange={(e) => setBusinessEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessWebsite'
                            className='mb-3'
                          >
                            <Form.Label>Business Website</Form.Label>
                            <Form.Control
                              type='text'
                              placeholder='Enter Business Website (If have any)'
                              value={businessWebsite}
                              onChange={(e) =>
                                setBusinessWebsite(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group controlId='businessTIN' className='mb-3'>
                            <Form.Label>Business TIN</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              placeholder={
                                businessTIN === ''
                                  ? 'Business TIN is Required'
                                  : 'Enter Business TIN'
                              }
                              value={businessTIN}
                              onChange={(e) => setBusinessTIN(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessLicense'
                            className='mb-3'
                          >
                            <Form.Label>Business License</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              placeholder={
                                businessLicense === ''
                                  ? 'Business License is Required'
                                  : 'Enter Business License'
                              }
                              value={businessLicense}
                              onChange={(e) =>
                                setBusinessLicense(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='businessDescription'
                            className='mb-3'
                          >
                            <Form.Label>Business Description</Form.Label>
                            <Form.Control
                              required
                              as='textarea'
                              rows={3}
                              placeholder={
                                businessDescription === ''
                                  ? 'Business Description is Required'
                                  : 'Enter Business Description'
                              }
                              value={businessDescription}
                              onChange={(e) =>
                                setBusinessDescription(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='py-4'>
                        <Button variant='outline-dark' size='md' type='submit'>
                          <b>Create Business</b>
                        </Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Container>
    </>
  )
}

export default BusinessCreateScreen
