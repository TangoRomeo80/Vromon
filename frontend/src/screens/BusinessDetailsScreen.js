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
  deleteBusiness,
  resetBusinessDetails,
  resetBusinessUpdate,
  resetBusinessDelete,
} from '../features/business/businessSlice'
import {
  createPayment,
  resetPaymentCreate,
} from '../features/payment/paymentSlice'

const BusinessDetailsScreen = () => {
  const [searchParams] = useSearchParams()
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
    isDeleteLoading,
    isDeleteError,
    deleteErrorMessage,
    isDeleteSuccess,
  } = useSelector((state) => state.business)

  const {
    payment,
    isCreateLoading: isPaymentCreateLoading,
    isCreateSuccess: isPaymentCreateSuccess,
    isCreateError: isPaymentCreateError,
    createErrorMessage: paymentCreateErrorMessage,
  } = useSelector((state) => state.payment)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (searchParams.get('status') && isDetailsSuccess) {
      if (searchParams.get('status') === 'success') {
        dispatch(
          updateBusiness({
            id: params.id,
            businessData: {
              isDue: false,
            },
          })
        )
        dispatch(
          createPayment({
            paymentParties: 'B2V',
            paymentMethod: 'card',
            paymentAmount: searchParams.get('amount') * 1,
            paymentFrom: business._id,
            paymentForBusiness: business._id,
          })
        )
        toast.success('Payment Successful', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'failed') {
        toast.error('Payment Failed', {
          position: 'top-center',
        })
      } else if (searchParams.get('status') === 'cancel') {
        toast.error('Payment Cancelled', {
          position: 'top-center',
        })
      }
    }
  }, [searchParams, isDetailsSuccess, dispatch])

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
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleClose = () => setShowPaymentModal(false)
  const handleShow = () => setShowPaymentModal(true)

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
    if (isDeleteError) {
      toast.error(deleteErrorMessage, { position: 'top-center' })
    } else if (isDeleteSuccess) {
      toast.error('Business Deleted Successfully', { position: 'top-center' })
      navigate('/businessList')
    }
  })

  useEffect(() => {
    if (isPaymentCreateError) {
      toast.error(paymentCreateErrorMessage, { position: 'top-center' })
    }
  }, [dispatch, isPaymentCreateError])

  useEffect(() => {
    return () => {
      dispatch(resetBusinessDetails())
      dispatch(resetBusinessUpdate())
      dispatch(resetBusinessDelete())
      dispatch(resetPaymentCreate())
    }
  }, [dispatch])

  const updateHandler = () => {
    const businessData = {
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      businessWebsite,
      businessTIN,
      businessLicense,
      businessDescription,
    }
    dispatch(updateBusiness({ id: params.id, businessData }))
  }

  const deleteHandler = () => {
    dispatch(deleteBusiness(params.id))
  }

  const handlePayment = () => {
    window.open(
      `http://localhost:5000/api/businesses/ssl-request?businessId=${business._id}`,
      '_self'
    )
    handleClose()
  }

  const handleConfirm = () => {
    dispatch(
      updateBusiness({
        id: params.id,
        businessData: {
          paymentConfirmRequest: 'pending',
        },
      })
    )
    handleClose()
    toast.success('Payment Confirm Request Sent Successfully', {
      position: 'top-center',
    })
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
                        <Col lg={4} md={4} sm={12}>
                          <Button
                            variant='outline-success'
                            size='md'
                            onClick={updateHandler}
                          >
                            Update Business Information
                          </Button>
                        </Col>
                        <Col
                          lg={4}
                          md={4}
                          sm={12}
                          className='d-flex justify-content-center'
                        >
                          <Button
                            variant='outline-warning'
                            size='md'
                            onClick={handleShow}
                          >
                            Make Payments
                          </Button>
                        </Col>
                        <Col
                          lg={4}
                          md={4}
                          sm={12}
                          className='d-flex justify-content-end'
                        >
                          <Button
                            variant='outline-danger'
                            onClick={deleteHandler}
                          >
                            Delete Business
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
            <Modal
              show={showPaymentModal}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Complete Payment for {businessName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Card.Text>
                      {duePaymentAmount > 0 ? (
                        <h5>Payment Amount: BDT {duePaymentAmount}</h5>
                      ) : (
                        <h5>Payment Amount: None</h5>
                      )}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Form>
                      <Form.Group className='mb-3' controlId='paymentMethod'>
                        <Form.Label className=''>Payment Method</Form.Label>
                        <Form.Control
                          as='select'
                          className='shadow'
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value=''>Select Payment Method</option>
                          <option value='cash'>Cash</option>
                          <option value='card'>Card/Mobile Banking</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                {paymentMethod === 'cash' && duePaymentAmount > 0 && (
                  <Button variant='success' onClick={handleConfirm}>
                    Request for payment confirmation
                  </Button>
                )}
                {paymentMethod === 'card' && duePaymentAmount > 0 && (
                  <Button variant='primary' onClick={handlePayment}>
                    Make Payment
                  </Button>
                )}
                <Button variant='danger' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </>
  )
}

export default BusinessDetailsScreen
