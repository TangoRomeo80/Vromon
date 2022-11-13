import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const ForgotPasswordSreen = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState('password')

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword('text') : setShowPassword('password')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password and confirmed password do not match', {
        position: 'top-center',
      })
    } else {
      try {
        const { data } = await axios.post(
          `/api/users/resetPassword/${params.token}`,
          {
            password,
          }
        )
        toast.success(
          'Password was reset successfully, please login with your new password',
          {
            position: 'top-center',
          }
        )
        navigate('/login')
      } catch (error) {
        toast.error(error.response.data.message, {
          position: 'top-center',
        })
      }
    }
  }

  return (
    <FormContainer>
      <h1 className='d-flex justify-content-center pt-1'>
        Reset Forgotten Password
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='registerPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            required
            type={showPassword}
            placeholder='Set Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm New Password</Form.Label>
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
            Reset Password
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default ForgotPasswordSreen
