import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMeUser } from '../features/user/userSlice'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import {
  FaEdit,
  FaUser,
  FaKey,
  FaTag,
  FaBusinessTime,
  FaRoute,
  FaPhone,
  FaUnlock,
  FaUsersCog,
  FaBookmark,
  FaCoins,
  FaUsers,
  FaCreditCard,
  FaCalculator,
} from 'react-icons/fa'
import { MdEmail, MdLogin } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const { meUser, isMeError, isMeSuccess, isMeLoading, meErrorMessage } =
    useSelector((state) => state.user)

  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [loginType, setLoginType] = useState()
  // const [googleID, setGoogleID] = useState()
  const [mobile, setMobile] = useState()
  const [password, setPassword] = useState()
  const [userType, setUserType] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (userInfo && userInfo.newUser) {
      navigate('/newUser')
    }
    if (isMeSuccess) {
      setUserName(meUser.userName)
      setEmail(meUser.email)
      setLoginType(meUser.loginType)
      // setGoogleID(user.googleID)
      setMobile(meUser.mobile)
      setUserType(meUser.userType)
      setImageUrl(meUser.image === '' ? imageUrl : meUser.image)
    } else if (isMeError) {
      toast.error(meErrorMessage, { position: 'top-center' })
    } else {
      dispatch(getMeUser())
    }
  }, [
    isMeSuccess,
    isMeError,
    meErrorMessage,
    meUser,
    userInfo,
    navigate,
    dispatch,
  ])

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
    <Container className='pt-5'>
      <Form>
        <Row>
          <Col lg={4} md={12} sm={12}>
            <Card className='mb-1'>
              <Card.Body>
                <Row>
                  <Col
                    className='d-flex justify-content-start'
                    lg={6}
                    md={6}
                    sm={6}
                  >
                    <img
                      className='mb-2'
                      src={
                        imageUrl !== ''
                          ? imageUrl
                          : 'http://bootdey.com/img/Content/avatar/avatar7.png'
                      }
                      alt='User Image'
                      style={{ height: '7rem', borderRadius: '50%' }}
                    />
                  </Col>
                  <Col
                    className='d-flex justify-content-end'
                    lg={6}
                    md={6}
                    sm={6}
                  >
                    <Form.Group controlId='image 1'>
                      <Form.Label>
                        <FaEdit className='me-2 mb-2' />
                        Edit Picture
                      </Form.Label>
                      <Form.Control
                        type='file'
                        id='image-file'
                        label='User Image'
                        custom
                        onChange={uploadUserImageFileHandler}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              {userInfo && userInfo.userType === 'tourist' ? (
                <div className='list-group'>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaUser className='me-2 mb-2' />
                      Personal Info
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaKey className='me-2 mb-2' />
                      Password and Security
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaTag className='me-2 mb-2' />
                      My Bookings
                    </Button>
                  </Link>
                </div>
              ) : userInfo && userInfo.userType === 'businessowner' ? (
                <div className='list-group'>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaUser className='me-2 mb-2' />
                      Personal Info
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaKey className='me-2 mb-2' />
                      Password and Security
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaBusinessTime className='me-2 mb-2' />
                      My Businesses
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaRoute className='me-2 mb-2' />
                      My Services
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaTag className='me-2 mb-2' />
                      Booking Requests
                    </Button>
                  </Link>
                  <Link
                    to='#'
                    className='list-group-item list-group-item-action text-center d-grid gap-2'
                  >
                    <Button>
                      <FaCalculator className='me-2 mb-2' />
                      Analytics
                    </Button>
                  </Link>
                </div>
              ) : null}
            </Card>
          </Col>
          <Col
            lg={8}
            md={12}
            sm={12}
            style={{ backgroundColor: 'red', minHeight: '80vh' }}
          ></Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ProfileScreen
