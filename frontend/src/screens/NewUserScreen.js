import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { getAuthedUser, updateAuthedUser } from '../features/auth/authSlice'

const NewUserScreen = () => {
  const [searchParams] = useSearchParams()
  const [mobile, setMobile] = useState('')
  const [userType, setUserType] = useState('tourist')

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('id')) {
      if (!isSuccess || !userInfo) {
        dispatch(getAuthedUser(searchParams.get('id')))
      }
      if (isError) {
        alert(message)
      }
      if (userInfo && !userInfo.newUser) {
        navigate('/')
      }
    }
  }, [searchParams, userInfo, isError, isSuccess, message, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    const id = searchParams.get('id')
    const userData = {
      mobile,
      userType,
      newUser: false,
    }
    dispatch(updateAuthedUser({id, userData}))
    alert(`Mobile: ${userData.mobile}, User Type: ${userData.userType}, New User: ${userData.newUser}`)
    navigate('/')
  }

  return (
    <FormContainer>
      <h1 className='d-flex justify-content-center pt-1'>
        Welcome to 'Vromon'
      </h1>
      <h6 className='d-flex justify-content-center pt-1'>
        PLease provide further information to complete registration
      </h6>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3 mt-4' controlId='mobile'>
          <Form.Label className='small mb-1'>Mobile Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter mobile number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='userType'>
          <Form.Label className='small mb-1'>Choose account type</Form.Label>
          <Form.Control
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
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default NewUserScreen
