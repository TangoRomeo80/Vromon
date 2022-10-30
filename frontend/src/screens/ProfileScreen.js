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
  const [passportExpire, setPassportExpire] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [prevPassword, setPrevPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState('')
  const [changePassword, setChangePassword] = useState(false)

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
      } else if (meUser.userType === 'businessowner') {
        setUserName(meUser.userName)
        setNid(meUser.businessOwnerInfo.nid)
        setPassport(meUser.businessOwnerInfo.passport)
        setEmail(meUser.email)
        setMobile(meUser.mobile)
        setImageUrl(meUser.image)
      }
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

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword('text') : setShowPassword('password')
  }

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
          {/* Left Column For Options*/}
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
                    to='#personalInfo'
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

          {/* Right Column For Form */}
          <Col lg={8} md={12} sm={12}>
            <Card id='#personalInfo' className='mb-2 shadow'>
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

                <h5 className='font-weight-bolder text-muted mb-3'>Address</h5>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='address'>
                      <Form.Label>House No.</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter House Number'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='address'>
                      <Form.Label>Road No.</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Road Number'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='address'>
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter The Name of Your Area'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='address'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter The City Name'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className='font-weight-bolder text-muted mb-3'>
                  Passport Information
                </h5>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='passport'>
                      <Form.Label>Passport Number</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter The Passport Number'
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='passportExpire'>
                      <Form.Label className='small mb-1'>
                        Passport Expiry Date
                      </Form.Label>
                      <Form.Control
                        type='date'
                        placeholder='Select Passport Expiration Date'
                        value={passportExpire}
                        onChange={(e) => setPassportExpire(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className='font-weight-bolder text-muted mb-3'>
                  Emergency Contact
                </h5>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='emergencyContact'>
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Emergency Number'
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className='font-weight-bolder text-muted mb-3'>
                  Contact Information
                </h5>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className='mb-3' controlId='mobile'>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter mobile number'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12} className='d-grid gap-2'>
                    <Button variant='success'>Submit Changes</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h4>Password & Security</h4>
                <Row>
                  <Col
                    lg={3}
                    md={3}
                    sm={6}
                    className='mt-4 d-flex justify-content-center'
                  >
                    <h5 className='font-weight-bolder text-muted  mb-3'>
                      Password :
                    </h5>
                  </Col>
                  <Col lg={9} md={9} sm={6} className='mt-4'>
                    {/* <Button> Change Password</Button> */}
                    {!changePassword && (
                      <Link
                        to=''
                        className='text-decoration-none'
                        onClick={() => setChangePassword(true)}
                      >
                        Change Password?
                      </Link>
                    )}
                  </Col>
                </Row>

                {changePassword && (
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className='mb-3' controlId='prevPassword'>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                          type={showPassword}
                          placeholder='Enter Old Password'
                          value={prevPassword}
                          onChange={(e) => setPrevPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type={showPassword}
                          placeholder='Enter New Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className='mb-3' controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type={showPassword}
                          placeholder='Confirm Password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Form.Check
                      className='ms-3'
                      type='checkbox'
                      label='Show Password'
                      onChange={(e) => passwordShow(e)}
                    />
                    <Col lg={12} md={12} sm={12}>
                      <Button className='me-2' variant='success'>
                        Update Password
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => setChangePassword(false)}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ProfileScreen
