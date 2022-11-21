import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMeUser,
  updateMeUser,
  changePassword,
  resetMeUser,
  resetMeUpdateUser,
  resetChangePassword,
} from '../features/user/userSlice'
import { logout, getAuthedUser } from '../features/auth/authSlice'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import {
  FaEdit,
  FaUser,
  FaKey,
  FaTag,
  FaBusinessTime,
  FaRoute,
  FaCalculator,
} from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import Loader from '../components/Loader'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    meUser,
    isMeGetError,
    isMeGetSuccess,
    isMeGetLoading,
    meGetErrorMessage,
    isMeUpdateError,
    isMeUpdateSuccess,
    isMeUpdateLoading,
    meUpdateErrorMessage,
    isChangePasswordError,
    isChangePasswordSuccess,
    isChangePasswordLoading,
    changePasswordErrorMessage,
  } = useSelector((state) => state.user)

  const [userName, setUserName] = useState('')
  const [nid, setNid] = useState('')
  const [passport, setPassport] = useState('')
  const [passportExpire, setPassportExpire] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [house, setHouse] = useState('')
  const [street, setStreet] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [prevPassword, setPrevPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState('')
  const [changePasswordState, setChangePasswordState] = useState(false)
  const [serviceType, getServiceType] = useState('')
  

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (userInfo && userInfo.newUser) {
      navigate('/newUser')
    }
    if (isMeGetError) {
      toast.error(meGetErrorMessage, { position: 'top-center' })
    }
    if (isMeUpdateError) {
      toast.error(meUpdateErrorMessage, { position: 'top-center' })
    }
    if (isChangePasswordError) {
      toast.error(changePasswordErrorMessage, { position: 'top-center' })
    }
    if (isMeUpdateSuccess) {
      dispatch(resetMeUpdateUser())
      dispatch(getMeUser())
      dispatch(getAuthedUser(userInfo._id)) //Update info in Local Storage
      toast.success('Profile Information Updated Successfully', {
        position: 'top-center',
      })
    }
    if (isChangePasswordSuccess) {
      dispatch(resetChangePassword())
      toast.success(
        'Password Updated Successfully and you will be logged out in 5 seconds, please login again',
        {
          position: 'top-center',
        }
      )
      function logoutRef() {
        dispatch(logout())
      }
      setTimeout(logoutRef, 5000)
    }
    if (isMeGetSuccess) {
      if (meUser.userType === 'tourist') {
        setUserName(meUser.userName)
        setNid(meUser.touristInfo.nid)
        setPassport(meUser.touristInfo.passport)
        setDob(meUser.touristInfo.dob)
        setGender(meUser.touristInfo.gender)
        setPassportExpire(meUser.touristInfo.passportExpire)
        setEmergencyContact(meUser.touristInfo.emergencyContact)
        setHouse(meUser.touristInfo.address.house)
        setStreet(meUser.touristInfo.address.street)
        setArea(meUser.touristInfo.address.area)
        setCity(meUser.touristInfo.address.city)
        setEmail(meUser.email)
        setMobile(meUser.mobile)
        setImageUrl(meUser.image)
      } else if (meUser.userType === 'businessowner') {
        setUserName(meUser.userName)
        setNid(meUser.businessOwnerInfo.nid)
        setPassport(meUser.businessOwnerInfo.passport)
        setPassportExpire(meUser.businessOwnerInfo.passportExpire)
        setGender(meUser.businessOwnerInfo.gender)
        setEmail(meUser.email)
        setMobile(meUser.mobile)
        setImageUrl(meUser.image)
        setHouse(meUser.businessOwnerInfo.address.house)
        setCity(meUser.businessOwnerInfo.address.city)
        setArea(meUser.businessOwnerInfo.address.area)
        setStreet(meUser.businessOwnerInfo.address.street)
      } else if (meUser.userType === 'admin') {
        setUserName(meUser.userName)
        setMobile(meUser.mobile)
        setEmail(meUser.email)
        setImageUrl(meUser.image)
      }
    } else {
      dispatch(getMeUser())
    }
  }, [
    meUser,
    isMeGetError,
    isMeGetSuccess,
    meGetErrorMessage,
    isMeUpdateError,
    isMeUpdateSuccess,
    meUpdateErrorMessage,
    isChangePasswordError,
    isChangePasswordSuccess,
    changePasswordErrorMessage,
    userInfo,
    navigate,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetMeUser())
      dispatch(resetMeUpdateUser())
      dispatch(resetChangePassword())
    }
  }, [dispatch])

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

      const { data } = await axios.post(
        `/api/upload${imageUrl ? `/${imageUrl.slice(8)}` : ''}`,
        formData,
        config
      )

      setImageUrl(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const updateInfoHandler = () => {
    if (meUser.userType === 'tourist') {
      dispatch(
        updateMeUser({
          userName,
          email,
          mobile,
          image: imageUrl,
          touristInfo: {
            nid,
            passport,
            passportExpire,
            dob,
            gender,
            address: {
              house,
              street,
              area,
              city,
            },
            emergencyContact,
          },
        })
      )
    } else if (meUser.userType === 'businessowner') {
      dispatch(
        updateMeUser({
          userName,
          email,
          mobile,
          image: imageUrl,
          businessOwnerInfo: {
            nid,
            passport,
            passportExpire,
            gender,
            address: {
              house,
              street,
              area,
              city,
            },
          },
        })
      )
    } else if (meUser.userType === 'admin') {
      dispatch(
        updateMeUser({
          userName,
          email,
          mobile,
          image: imageUrl,
        })
      )
    }
  }

  const updatePasswordHandler = () => {
    if (password === '' || confirmPassword === '' || prevPassword === '') {
      toast.error('Please Fill All The Password Fields', {
        position: 'top-center',
      })
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password Does Not Match', {
        position: 'top-center',
      })
    } else {
      dispatch(changePassword({ prevPassword, newPassword: password }))
    }
  }

  return (
    <>
      {isMeGetLoading || isMeUpdateLoading || isChangePasswordLoading ? (
        <Loader />
      ) : (
        <Container className='pt-5' id='personalInfo'>
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
                      <a
                        href='#personalInfo'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaUser className='me-2 mb-2' />
                          Personal Info
                        </Button>
                      </a>
                      <a
                        href='#password'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaKey className='me-2 mb-2' />
                          Password and Security
                        </Button>
                      </a>
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
                      <a
                        href='#personalInfo'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaUser className='me-2 mb-2' />
                          Personal Info
                        </Button>
                      </a>
                      <a
                        href='#password'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaKey className='me-2 mb-2' />
                          Password and Security
                        </Button>
                      </a>
                      {/* <Link
                        to='/businessList'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaBusinessTime className='me-2 mb-2' />
                          My Businesses
                        </Button>
                      </Link> */}
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
                  ) : userInfo && userInfo.userType === 'admin' ? (
                    <>
                      <a
                        href='#personalInfo'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaUser className='me-2 mb-2' />
                          Personal Info
                        </Button>
                      </a>
                      <a
                        href='#password'
                        className='list-group-item list-group-item-action text-center d-grid gap-2'
                      >
                        <Button>
                          <FaKey className='me-2 mb-2' />
                          Password and Security
                        </Button>
                      </a>
                    </>
                  ) : null}
                </Card>
              </Col>

              {/* Right Column For Form */}
              {/* {userInfo && userInfo.userType === 'tourist' ? () : null} */}
              <Col lg={8} md={12} sm={12}>
                <Card className='mb-2 shadow'>
                  <Card.Body>
                    {userInfo && userInfo.userType === 'tourist' ? (
                      <>
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
                                placeholder='Enter 17 Digit Nid Number'
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
                                disabled
                                type='text'
                                placeholder='Date of Birth'
                                value={
                                  dob === ('' || null)
                                    ? ''
                                    : Moment(dob).format('DD.MM.YYYY')
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

                        <h5 className='font-weight-bolder text-muted mb-3'>
                          Address
                        </h5>
                        <Row>
                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='house'>
                              <Form.Label>House Name/No.</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter House Number'
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='street'>
                              <Form.Label>Street Name/No.</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter Road Number'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='area'>
                              <Form.Label>Area</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter The Name of Your Area'
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='city'>
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter The City Name'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
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
                            <Form.Group
                              className='mb-3'
                              controlId='passportExpire'
                            >
                              <Form.Label className='small mb-1'>
                                Passport Expiry Date
                              </Form.Label>
                              <Form.Control
                                disabled
                                type='text'
                                placeholder='Passport Expiration Date'
                                value={
                                  passportExpire === ('' || null)
                                    ? ''
                                    : Moment(passportExpire).format(
                                        'DD.MM.YYYY'
                                      )
                                }
                              ></Form.Control>
                              <Form.Control
                                type='date'
                                placeholder='Select Passport Expiration Date'
                                value={passportExpire}
                                onChange={(e) =>
                                  setPassportExpire(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>

                        <h5 className='font-weight-bolder text-muted mb-3'>
                          Emergency Contact
                        </h5>
                        <Row>
                          <Col lg={6} md={6} sm={12}>
                            <Form.Group
                              className='mb-3'
                              controlId='emergencyContact'
                            >
                              <Form.Label>Phone No.</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter Emergency Number'
                                value={emergencyContact}
                                onChange={(e) =>
                                  setEmergencyContact(e.target.value)
                                }
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
                            <Button
                              variant='success'
                              onClick={updateInfoHandler}
                            >
                              Submit Changes
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : userInfo && userInfo.userType === 'businessowner' ? (
                      <>
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
                                placeholder='Enter 17 Digit Nid Number'
                                value={nid}
                                onChange={(e) => setNid(e.target.value)}
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

                        <h5 className='font-weight-bolder text-muted mb-3'>
                          Address
                        </h5>
                        <Row>
                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='house'>
                              <Form.Label>House Name/No.</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter House Number'
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='street'>
                              <Form.Label>Street Name/No.</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter Road Number'
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='area'>
                              <Form.Label>Area</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter The Name of Your Area'
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col lg={6} md={6} sm={12}>
                            <Form.Group className='mb-3' controlId='city'>
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Enter The City Name'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
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
                            <Form.Group
                              className='mb-3'
                              controlId='passportExpire'
                            >
                              <Form.Label className='small mb-1'>
                                Passport Expiry Date
                              </Form.Label>
                              <Form.Control
                                disabled
                                type='text'
                                placeholder='Passport Expiration Date'
                                value={
                                  passportExpire === ('' || null)
                                    ? ''
                                    : Moment(passportExpire).format(
                                        'DD.MM.YYYY'
                                      )
                                }
                              ></Form.Control>
                              <Form.Control
                                type='date'
                                placeholder='Select Passport Expiration Date'
                                value={passportExpire}
                                onChange={(e) =>
                                  setPassportExpire(e.target.value)
                                }
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
                            <Button
                              variant='success'
                              onClick={updateInfoHandler}
                            >
                              Submit Changes
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : userInfo && userInfo.userType === 'admin' ? (
                      <>
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
                            <Button
                              variant='success'
                              onClick={updateInfoHandler}
                            >
                              Submit Changes
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : null}
                  </Card.Body>
                </Card>

                <Card id='password'>
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
                        {!changePasswordState && (
                          <a
                            href='#changePassword'
                            className='text-decoration-none'
                            onClick={
                              meUser && meUser.loginType === 'local'
                                ? () => setChangePasswordState(true)
                                : null
                            }
                          >
                            {meUser && meUser.loginType === 'local'
                              ? 'Change Password'
                              : 'You are logged in with google'}
                          </a>
                        )}
                      </Col>
                    </Row>

                    {changePasswordState && (
                      <Row id='changePassword'>
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          className='d-flex justify-content-end mb-2'
                        >
                          <Button
                            size='sm'
                            variant='danger'
                            onClick={() => setChangePasswordState(false)}
                          >
                            <MdOutlineClose size='28' />
                          </Button>
                        </Col>
                        <Col lg={12} md={12} sm={12}>
                          <Form.Group className='mb-3' controlId='prevPassword'>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                              required
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
                              required
                              type={showPassword}
                              placeholder='Enter New Password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={12}>
                          <Form.Group
                            className='mb-3'
                            controlId='confirmPassword'
                          >
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                              required
                              type={showPassword}
                              placeholder='Confirm New Password'
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Form.Check
                          className='ms-3'
                          type='checkbox'
                          label='Show Password'
                          onChange={(e) => passwordShow(e)}
                        />

                        <Col lg={12} md={12} sm={12} className='my-3'>
                          <Button
                            className='me-2'
                            variant='success'
                            onClick={updatePasswordHandler}
                          >
                            Update Password
                          </Button>
                          {/* <Button
                            size='sm'
                            variant='danger'
                            onClick={() => setChangePasswordState(false)}
                          >
                            <MdOutlineClose/>
                          </Button> */}
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  )
}

export default ProfileScreen
