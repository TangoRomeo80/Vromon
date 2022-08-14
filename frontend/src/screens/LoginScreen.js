import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
  const handleGoogle = () => {
    console.log('hello')
    window.open('http://localhost:5000/api/users/signin/google', '_self')
  }

  return (
    <FormContainer>
      <h1 className='d-flex justify-content-center pt-5'>Sign In</h1>
      <Form>
        <Form.Group className='mb-3' controlId='LoginEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='LoginPassword'>
          <Form.Label>Enter password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='showPassword'>
          <Form.Check type='checkbox' label='Show password' />
        </Form.Group>
        <div className='d-grid gap-2'>
          <Button variant='primary' size='lg' type='submit'>
            Login
          </Button>
        </div>
      </Form>

      <Row>
        <h6 className='d-flex justify-content-center pt-5'>Or Continue With</h6>
        <Col className='d-flex justify-content-center pt-2'>
          {/* <Link to='/'> */}
          <Button
            className='mx-2'
            variant='danger'
            align='end'
            size='sm'
            onClick={handleGoogle}
          >
            <FcGoogle /> Google
          </Button>
        </Col>
      </Row>

      <Row>
        <div className='d-flex justify-content-center py-3 mt-3 '>
          <p>
            New User?<a href='#'><b>Sign Up</b></a>
          </p>
        </div>
      </Row>

      <Row className='py-3 mt-3'>
        <Col>
          <Link to='/'>
            <Button variant='primary' size='sm'>
              Back to Home page
            </Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
