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
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import Loader from '../components/Loader'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const { meUser, isMeError, isMeSuccess, isMeLoading, meErrorMessage } =
    useSelector((state) => state.user)

  const [userName, setUserName] = useState('')
  const [nid, setNid] = useState('')
  const [passport, setPassport] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [prevPassword, setPrevPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      if (meUser.userType === 'tourist') {
        setUserName(meUser.userName)
        setNid(meUser.touristInfo.nid)
        setPassport(meUser.touristInfo.passport)
        setDob(meUser.touristInfo.dob)
        setGender(meUser.touristInfo.gender)
        setAddress(meUser.touristInfo.address)
        setEmergencyContact(meUser.touristInfo.emergencyContact)
        setEmail(meUser.email)
        setMobile(meUser.mobile)
        setImageUrl(meUser.image)
      }
      else if (meUser.userType === 'businessowner') {
        setUserName(meUser.userName)
        setNid(meUser.businessOwnerInfo.nid)
        setPassport(meUser.businessOwnerInfo.passport)
        setEmail(meUser.email)
        setMobile(meUser.mobile)
        setImageUrl(meUser.image)
      }
    }
    else if (isMeError) {
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
            <Card className='mb-1 shadow'>
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
          <Col lg={8} md={12} sm={12}>
            <Card className='mb-2 shadow'>
              <Card.Body>
                <h4 className='font-weight-bolder text-dark'>
                  Profile Information
                </h4>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <h5 className='font-weight-bolder text-muted mb-3'>
                      Basic Information
                    </h5>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='userName'>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter User Name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='nid'>
                      <Form.Label>NID number</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Nid Number'
                        value={nid}
                        onChange={(e) => setNid(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='dob'>
                      <Form.Label className='small mb-1'>
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Date of Birth'
                        value={
                          dob !== '' ? '' : Moment(dob).format('DD.MM.YYYY')
                        }
                      ></Form.Control>
                      <Form.Control
                        type='date'
                        placeholder='Enter Date of Birth'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='gender'>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as='select'
                        type='select'
                        placeholder='Select Gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
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
