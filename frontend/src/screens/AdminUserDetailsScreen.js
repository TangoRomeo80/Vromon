import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import { getUserById, resetUserDetails } from '../features/user/userSlice'
import Moment from 'moment'

const AdminUserDetailsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    user,
    isDetailsLoading,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  } = useSelector((state) => state.user)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [loginType, setLoginType] = useState('')
  const [mobile, setMobile] = useState('')
  const [registeredAt, setRegisteredAt] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    } else if (isDetailsSuccess) {
      setUserName(user.userName)
      setEmail(user.email)
      setUserType(user.userType)
      setLoginType(user.loginType)
      setMobile(user.mobile)
      setRegisteredAt(user.createdAt)
    } else {
      dispatch(getUserById(params.id))
    }
  }, [isDetailsError, detailsErrorMessage, isDetailsSuccess, user])

  useEffect(() => {
    return () => {
      dispatch(resetUserDetails())
    }
  }, [dispatch])

  return (
    <Container className='pt-3'>
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant='danger'>{detailsErrorMessage}</Message>
      ) : (
        <>
          <Row className='pb-5'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              User Details
            </Card.Text>
          </Row>
          <Form>
            <Row>
              <Col xs={12} md={12} xl={12}>
                <Card className='mb-4'>
                  <Card.Header>User Information</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='userName' className='mb-3'>
                          <Form.Label>User Name</Form.Label>
                          <Form.Control disabled type='text' value={userName} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='userEmail' className='mb-3'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control disabled type='text' value={email} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='userType' className='mb-3'>
                          <Form.Label>User Type</Form.Label>
                          <Form.Control disabled type='text' value={userType} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='loginType' className='mb-3'>
                          <Form.Label>Login Type</Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={loginType}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='mobile' className='mb-3'>
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control disabled type='text' value={mobile} />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} xl={6}>
                        <Form.Group controlId='registeredAt' className='mb-3'>
                          <Form.Label>Registered At</Form.Label>
                          <Form.Control
                            disabled
                            type='text'
                            value={Moment(registeredAt).format('DD-MM-YYYY')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  )
}

export default AdminUserDetailsScreen
