import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import {
  FaMapMarkerAlt,
  FaCar,
  FaUmbrellaBeach,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaTag,
  FaRoute,
  FaBusinessTime,
  FaMoneyBill,
} from 'react-icons/fa'
import { GoDashboard } from 'react-icons/go'
import { BiLocationPlus, BiHotel } from 'react-icons/bi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className='fixed-top'>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img style={{ maxWidth: '150px' }} src='/Nav/logp.png' />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto align-items-center pt-2 pb-2'>
              {userInfo ? (
                <>
                  {userInfo.userType === 'tourist' && (
                    <>
                      <LinkContainer to='/destinationSearch'>
                        <Nav.Link>
                          <FaMapMarkerAlt className='me-1' />
                          Destinations
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/transportSearch'>
                        <Nav.Link>
                          <FaCar className='me-1' />
                          Transport
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/staysSearch'>
                        <Nav.Link>
                          <BiHotel className='me-1' />
                          Stays
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/tourSearch'>
                        <Nav.Link>
                          <FaUmbrellaBeach className='me-1' />
                          Tours
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/myBookings'>
                        <Nav.Link>
                          <FaTag className='me-1' />
                          My Bookings
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/destinationCreate'>
                        <Nav.Link>
                          <BiLocationPlus className='me-1' />
                          Add a Destination
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  {userInfo.userType === 'businessowner' && (
                    <>
                      <LinkContainer to='/businessDash'>
                        <Nav.Link>
                          <MdOutlineSpaceDashboard className='me-1' />
                          Dashboard
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/serviceList'>
                        <Nav.Link>
                          <FaRoute className='me-1' />
                          My Services
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/businessList'>
                        <Nav.Link>
                          <FaBusinessTime className='me-1' />
                          My Businesses
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/businessPayments'>
                        <Nav.Link>
                          <FaMoneyBill className='me-1' />
                          Payments
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/bookingRequestList'>
                        <Nav.Link>
                          <FaTag className='me-1' />
                          Booking Requests
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/businessOwnerAnalytics'>
                        <Nav.Link>
                          <GoDashboard className='me-1' />
                          Analytics
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/destinationCreate'>
                        <Nav.Link>
                          <BiLocationPlus className='me-1' />
                          Add a Destination
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  {userInfo.userType === 'admin' && (
                    <>
                      <LinkContainer to='/adminDash'>
                        <Nav.Link>
                          <MdOutlineSpaceDashboard className='me-1' />
                          Dashboard
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/serviceList'>
                        <Nav.Link>
                          <FaMapMarkerAlt className='me-1' />
                          Destinations
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/serviceList'>
                        <Nav.Link>
                          <FaRoute className='me-1' />
                          Services
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/bookingRequestList'>
                        <Nav.Link>
                          <FaUserCircle className='me-1' />
                          Users
                        </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/businessOwnerAnalytics'>
                        <Nav.Link>
                          <FaTag className='me-1' />
                          Bookings
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </>
              ) : (
                <>
                  <LinkContainer to='/destinationSearch'>
                    <Nav.Link>
                      <FaMapMarkerAlt className='me-1' />
                      Destinations
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/transportSearch'>
                    <Nav.Link>
                      <FaCar className='me-1' />
                      Transport
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/staysSearch'>
                    <Nav.Link>
                      <BiHotel className='me-1' />
                      Stays
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/tourSearch'>
                    <Nav.Link>
                      <FaUmbrellaBeach className='me-1' />
                      Tours
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>

            <Nav className='align-items-center ms-auto py-2'>
              {userInfo ? (
                <NavDropdown title={userInfo.userName}>
                  <NavDropdown.Item>
                    <LinkContainer to='/profile' className='px-0'>
                      <Nav.Link className='text-dark'>
                        <FaUserCircle className='me-2' />
                        Profile
                      </Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  {userInfo.userType === 'tourist' && (
                    <NavDropdown.Item>
                      <LinkContainer to='/myBookings' className='px-0'>
                        <Nav.Link className='text-dark'>
                          <FaTag className='me-2' />
                          My Bookings
                        </Nav.Link>
                      </LinkContainer>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    <LinkContainer to='#' className='px-0'>
                      <Nav.Link className='text-dark'>
                        <FaSignOutAlt className='me-2' />
                        Sign out
                      </Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='px-0 py-0'>
                    <Button variant='blue'>
                      <FaSignInAlt className='me-2 mb-1' />
                      Sign In
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
