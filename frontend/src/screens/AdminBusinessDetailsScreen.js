import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import {
  getBusinessById,
  updateBusiness,
  resetBusinessDetails,
  resetBusinessUpdate,
} from '../features/business/businessSlice'

const AdminBusinessDetailsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    business,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
    isUpdateLoading,
    isUpdateError,
    updateErrorMessage,
    isUpdateSuccess,
  } = useSelector((state) => state.business)

  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [businessTIN, setBusinessTIN] = useState('')
  const [businessLicense, setBusinessLicense] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')
  const [recievedPaymentAmount, setRecievedPaymentAmount] = useState(0)
  const [duePaymentAmount, setDuePaymentAmount] = useState(0)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, {
        position: 'top-center',
      })
    } else if (isDetailsSuccess) {
      setBusinessName(business.businessName)
      setBusinessAddress(business.businessAddress)
      setBusinessPhone(business.businessPhone)
      setBusinessEmail(business.businessEmail)
      setBusinessWebsite(business.businessWebsite)
      setBusinessTIN(business.businessTIN)
      setBusinessLicense(business.businessLicense)
      setBusinessDescription(business.businessDescription)
      setRecievedPaymentAmount(business.recievedPaymentAmount)
      setDuePaymentAmount(business.duePaymentAmount)
    } else {
      dispatch(getBusinessById(params.id))
    }
  }, [isDetailsError, detailsErrorMessage, isDetailsSuccess, business])

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: 'top-center' })
    } else if (isUpdateSuccess) {
      toast.success('Business Details Updated Successfully', {
        position: 'top-center',
      })
      navigate('/businessList')
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetBusinessDetails())
      dispatch(resetBusinessUpdate())
    }
  }, [dispatch])

  const handleResolve = () => {
    dispatch(
      updateBusiness({
        id: params.id,
        businessData: {
          paymentConfirmRequest: 'resolved',
        },
      })
    )
  }

  const handleReject = () => {
    dispatch(
      updateBusiness({
        id: params.id,
        businessData: {
          paymentConfirmRequest: 'rejected',
        },
      })
    )
  }

  return (
    <>
      <Container className='pt-5'>
        {isDetailsLoading ? (
          <Loader />
        ) : isDetailsError ? (
          <Message variant='danger'>{detailsErrorMessage}</Message>
        ) : (
          <>
            <Row className='pb-5'>
              <Card.Text as='h2' className='font-weight-bolder text-center'>
                Business Details
              </Card.Text>
            </Row>
            <Form>
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
                              disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
                            controlId='recievedPaymentAmount'
                            className='mb-3'
                          >
                            <Form.Label>Recieved Payment Amount</Form.Label>
                            <Form.Control
                              disabled
                              type='text'
                              placeholder='Recieved Payment Amount'
                              value={recievedPaymentAmount}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                          <Form.Group
                            controlId='duePaymentAmount'
                            className='mb-3'
                          >
                            <Form.Label>Due Payment Amount</Form.Label>
                            <Form.Control
                              disabled
                              type='text'
                              placeholder='Due Payment Amount'
                              value={duePaymentAmount}
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
                              disabled
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
                      {business &&
                        business.paymentConfirmRequest !== 'resolved' && (
                          <Row className='py-4'>
                            <Col lg={4} md={4} sm={12}>
                              <Button
                                variant='outline-success'
                                size='md'
                                onClick={handleResolve}
                              >
                                Resolve Payment Request
                              </Button>
                            </Col>
                            <Col
                              lg={4}
                              md={4}
                              sm={12}
                              className='d-flex justify-content-center'
                            >
                              <Button
                                variant='outline-danger'
                                size='md'
                                onClick={handleReject}
                              >
                                Reject Payment Request
                              </Button>
                            </Col>
                          </Row>
                        )}
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

export default AdminBusinessDetailsScreen
