import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import FormContainer from '../components/FormContainer'
import { signupLocal, resetAuth } from '../features/auth/authSlice'

const RegistrationScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [showPassword, setShowPassword] = useState('password')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords did not match')
    } else if (email != '' && password != '' && phoneNumber != '') {
      dispatch(signupLocal({ email, password, phoneNumber }))
    } else {
      alert('Please fill all the fields')
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            placeholder='Confirm Password'
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
