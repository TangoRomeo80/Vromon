import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col, Card } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import FormContainer from '../components/FormContainer'
import { signinLocal, resetAuth } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState('password')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const handleForgotPassword = async () => {
    try {
      const { data } = await axios.post('/api/users/forgotpassword', {
        email: forgotPasswordEmail,
      })
      toast.success(data.message, { position: 'top-center' })
      setForgotPassword(false)
    } catch (error) {
      toast.error(error.response.data.message, { position: 'top-center' })
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
    if (isSuccess) {
      toast.success('Logged in successfully', { position: 'top-center' })
      navigate('/')
    }
    if (isError) {
      toast.error(message, { position: 'top-center' })
    }

    dispatch(resetAuth())
  }, [userInfo, isError, isSuccess, message, navigate, dispatch])

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword('text') : setShowPassword('password')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signinLocal({ email, password }))
  }

  const handleGoogle = () => {
    console.log('hello')
    window.open('http://localhost:5000/api/users/signin/google', '_self')
  }

  return (
    <FormContainer>
      <h1 className='d-flex justify-content-center pt-1'>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {!forgotPassword && (
          <>
            <Form.Group className='mb-3' controlId='LoginEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='LoginPassword'>
              <Form.Label>Enter password</Form.Label>
              <Form.Control
                type={showPassword}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        {forgotPassword && (
          <>
            <Card className='my-4'>
              <Card.Header as='h5' className='text-center'>
                Want to Set a New Password
              </Card.Header>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Card.Body>
                    <Form.Group
                      className='mb-3'
                      controlId='forgotPasswordEmail'
                    >
                      <Form.Label>Enter Email To Reset Password</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Col>
                <Col lg={12} md={12} sm={12} className='d-grid gap-2 py-2'>
                  <Button
                    variant='primary'
                    size='md'
                    onClick={handleForgotPassword}
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </Card>
            <Row>
              <Col>
                <Form.Group
                  className='mb-3 d-flex justify-content-end'
                  controlId='forgotPassword'
                >
                  <Button onClick={() => setForgotPassword(false)}>
                    Go Back
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        {!forgotPassword && (
          <>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='showPassword'>
                  <Form.Check
                    type='checkbox'
                    label='Show password'
                    onChange={(e) => passwordShow(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className='mb-3 d-flex justify-content-end'
                  controlId='forgotPassword'
                >
                  <Button onClick={() => setForgotPassword(true)}>
                    Forgot Password?
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        {!forgotPassword && (
          <div className='d-grid gap-2 '>
            <Button variant='primary' size='lg' type='submit'>
              Login
            </Button>
          </div>
        )}
      </Form>

      <Row>
        <h6 className='d-flex justify-content-center pt-5'>OR</h6>
        <Col className='d-grid gap-2' sm={12} md={12} lg={12}>
          {/* <Link to='/'> */}
          <Button
            variant='outline-danger'
            align='end'
            size='lg'
            onClick={handleGoogle}
          >
            <FcGoogle /> Sign in with Google
          </Button>
        </Col>
      </Row>

      <Row>
        <div className='d-flex justify-content-center py-3 mt-3 '>
          <p>
            New User?
            <Link to='/registration'>
              <b>Sign Up</b>
            </Link>
          </p>
        </div>
      </Row>

      <Row className='py-1 mt-2'>
        <Col>
          <Link to='/'>
            <Button variant='primary' size='md'>
              Back to Home page
            </Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
