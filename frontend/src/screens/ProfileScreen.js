import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import {
  FaUser,
  FaPhone,
  FaUnlock,
  FaUsersCog,
  FaBookmark,
  FaCoins,
  FaUsers,
  FaCreditCard,
} from 'react-icons/fa'
import { MdEmail, MdLogin } from 'react-icons/md'

// import {useDispatch} from 'react-redux'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const ProfileScreen = () => {
  // const userID = params.id

  // const dispatch = useDispatch()

  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [loginType, setLoginType] = useState()
  // const [googleID, setGoogleID] = useState()
  const [mobile, setMobile] = useState()
  const [password, setPassword] = useState()
  const [userType, setUserType] = useState()
  const [imageUrl, setImageUrl] = useState(
    'http://bootdey.com/img/Content/avatar/avatar7.png'
  )
  const [uploading, setUploading] = useState('')

  const uploadUserImageFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/upload', formData, config)

      setImageUrl(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (
  //     userName !== "" &&
  //     email !== "" &&
  //     loginType !== "" &&
  //     password !== ""
  //   ) {
  //     dispatch({
  //       // _id: userID,
  //       userName,
  //       mobile,
  //       password,
  //       email,
  //       loginType,
  //       userType,
  //       imageUrl,
  //     });
  //   }
  // };

  return (
    <Container>
      <Form>
        <Row className='my-3'>
          {/* Side Nav */}
          <Col className='my-4' xs={12} md={4} xl={3}>
            {/* <Button variant="btn btn-primary btn-lg btn-block" size="lg">
              My Profile                 
            </Button> */}
            <Row>
              <Link
                className='btn btn-primary my-3'
                style={{ width: '15em' }}
                to=''
              >
                <FaUser /> &nbsp; My Profile
              </Link>
            </Row>

            <Row>
              <Link
                className='btn btn-primary my-3'
                style={{ width: '15em' }}
                to=''
              >
                <FaBookmark /> &nbsp; My Bookings
              </Link>
            </Row>

            <Row>
              <Link
                className='btn btn-primary my-3'
                style={{ width: '15em' }}
                to=''
              >
                <FaCoins /> &nbsp; Trip Coin
              </Link>
            </Row>

            <Row>
              <Link
                className='btn btn-primary my-3'
                style={{ width: '15em' }}
                to=''
              >
                <FaUsers /> &nbsp; Guest List
              </Link>
            </Row>

            <Row>
              <Link
                className='btn btn-primary my-3'
                style={{ width: '15em' }}
                to=''
              >
                <FaCreditCard /> &nbsp; Saved Cards
              </Link>
            </Row>
          </Col>

          {/* Details Information */}
          <Col xs={12} md={8} xl={9}>
            <Card className='mb-4 mt-4'>
              <Card.Header as='h3'>User Information</Card.Header>
              <Card.Body>
                {/* <Card.Header className="text-center">User Image</Card.Header> */}
                <Row>
                  {/* <Col lg={6} md={6} sm={12}> */}
                  <Col lg={3} md={3} sm={6}>
                    <img
                      className='mb-2'
                      src={
                        imageUrl !== ''
                          ? imageUrl
                          : 'http://bootdey.com/img/Content/avatar/avatar7.png'
                      }
                      alt='User Image'
                      style={{ height: '10rem', borderRadius: '50%' }}
                    />
                  </Col>
                  <Col lg={3} md={3} sm={6}>
                    <Form.Group controlId='image 1'>
                      <Form.Label>Upload New Photo</Form.Label>
                      <Form.Control
                        className='mb-3'
                        type='file'
                        id='image-file'
                        label='User Image'
                        custom
                        onChange={uploadUserImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='mt-4'>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='userName'>
                      <FaUser /> &nbsp;
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder={
                          userName === ''
                            ? 'User Name is required'
                            : 'Enter User Name'
                        }
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={
                          userName === ''
                            ? {
                                borderColor: 'red',
                                color: 'red',
                                boxShadow: '5px 5px red',
                              }
                            : null
                        }
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='userEmail'>
                      <MdEmail /> &nbsp;
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder={
                          email === '' ? 'Email is required' : 'Enter Email'
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='mobileNumber'>
                      <FaPhone /> &nbsp;
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder={
                          mobile === ''
                            ? 'Mobile Number is required'
                            : 'Enter Mobile Number'
                        }
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='password'>
                      <FaUnlock /> &nbsp;
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder={
                          password === ''
                            ? 'Password is required'
                            : 'Enter Password'
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='loginType'>
                      <MdLogin /> &nbsp;
                      <Form.Label>Login Type</Form.Label>
                      <Form.Control
                        as='select'
                        type='select'
                        placeholder='Select Login Type'
                        value={loginType}
                        onChange={(e) => setLoginType(e.target.value)}
                      >
                        <option>{loginType}</option>
                        <option value='Google'>Log in with Google</option>
                        <option value='Vromon'>Log in with Vromon</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='userType'>
                      <FaUsersCog /> &nbsp;
                      <Form.Label>User Type</Form.Label>
                      <Form.Control
                        className='mb-3'
                        as='select'
                        type='select'
                        placeholder='Select User Type'
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option>{userType}</option>
                        <option value='Tourist'>Tourist</option>
                        <option value='Business'>Business Owner</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='mt-5'>
                  <Button variant='primary' size='lg' type='submit'>
                    Submit
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ProfileScreen
