import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import { createUser, resetCreateUser } from '../features/user/userSlice'

const AdminUserCreateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    user,
    isCreateLoading,
    isCreateSuccess,
    isCreateError,
    createErrorMessage,
  } = useSelector((state) => state.user)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  // const [userType, setUserType] = useState('')
  // const [loginType, setLoginType] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState('password')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isCreateError) {
      toast.error(createErrorMessage, { position: 'top-center' })
    }
    if (isCreateSuccess) {
      toast.success('User created successfully', { position: 'top-center' })
      navigate('/adminUserList')
    }
  }, [isCreateError, createErrorMessage, isCreateSuccess, navigate])

  useEffect(() => {
    return () => {
      dispatch(resetCreateUser())
    }
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password and confirmed password do not match', {
        position: 'top-center',
      })
    } else {
      dispatch(
        createUser({
          userName,
          email,
          mobile,
          userType: 'admin',
          loginType: 'local',
          password,
        })
      )
    }
  }

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword('text') : setShowPassword('password')
  }

  return (
    <FormContainer>
      {isCreateLoading ? (
        <Loader />
      ) : isCreateError ? (
        <Message variant='danger'>{createErrorMessage}</Message>
      ) : (
        <>
          <Row className='pb-5'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Create Admin User
            </Card.Text>
          </Row>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='registerEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Please a Valid Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='registerPhone'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Please Enter Your Mobile Number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='registerPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type={showPassword}
                placeholder='Set Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type={showPassword}
                placeholder='Confirm the entered Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='showPassword'>
              <Form.Check
                type='checkbox'
                label='Show password'
                onChange={(e) => passwordShow(e)}
              />
            </Form.Group>
            <div className='d-grid gap-2'>
              <Button variant='primary' size='lg' type='submit'>
                Create User
              </Button>
            </div>
          </Form>
        </>
      )}
    </FormContainer>
  )
}

export default AdminUserCreateScreen
