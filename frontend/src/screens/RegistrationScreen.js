import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { signupLocal, resetAuth } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const RegistrationScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [userType, setUserType] = useState('tourist')

  const [showPassword, setShowPassword] = useState('password')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
    if (isSuccess) {
      toast.success('Account created successfully', {
        position: 'top-center',
      })
      navigate('/')
    }
    if (isError) {
      toast.error(message, { position: 'top-center' })
    }

    dispatch(resetAuth())
  }, [userInfo, isError, isSuccess, message, navigate, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password and confirmed password do not match', {
        position: 'top-center',
      })
    } else {
      dispatch(
        signupLocal({
          email,
          password,
          mobile,
          userType,
          loginType: 'local',
          newUser: false,
          userName: email.split('@')[0],
        })
      )
    }
  }

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword('text') : setShowPassword('password')
  }

  return (
    <FormContainer>
      <h1 className='d-flex justify-content-center pt-1'>Sign Up</h1>
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

        <Form.Group className='mb-3' controlId='userType'>
          <Form.Label className='small mb-1'>Choose User type</Form.Label>
          <Form.Control
            required
            as='select'
            className='mb-3'
            type='select'
            placeholder='Enter if you want to open account as tourist or as service provider'
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value='tourist'>Tourist</option>
            <option value='businessowner'>Service Provider</option>
          </Form.Control>
        </Form.Group>

        <div className='d-grid gap-2'>
          <Button variant='primary' size='lg' type='submit'>
            Sign up
          </Button>
        </div>
      </Form>

      <Row>
        <div className='d-flex justify-content-center mt-3 '>
          <p>
            Already have an account?
            <Link to='/login'>
              <b>Sign In</b>
            </Link>
          </p>
        </div>
      </Row>

      {/* <Row className='mt-2'>
        <Col>
          <Link to='/login'>
            <Button variant='primary' size='md'>
              Back to home page
            </Button>
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
  )
}

export default RegistrationScreen
