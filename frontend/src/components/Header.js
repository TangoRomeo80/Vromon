import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import {
  FaMapMarkerAlt,
  FaCar,
  FaPlane,
  FaUmbrellaBeach,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaTag,
} from 'react-icons/fa'
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
              <h3>VROMON</h3>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/destinations'>
                <Nav.Link>
                  <FaMapMarkerAlt />
                  Destinations
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/transports'>
                <Nav.Link>
                  <FaCar />/<FaPlane />
                  Transport
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/packages'>
                <Nav.Link>
                  <FaUmbrellaBeach />
                  Holiday Packages
                </Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.userName} className='me-5'>
                  <NavDropdown.Item>
                    <LinkContainer to='/touristInfo' className='px-0'>
                      <Nav.Link className='text-dark'>
                        <FaUserCircle className='me-2' />
                        Profile
                      </Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <LinkContainer to='/bookingInfo' className='px-0'>
                      <Nav.Link className='text-dark'>
                        <FaTag className='me-2' />
                        My Bookings
                      </Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
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
                  <Button variant='blue'>
                    <FaSignInAlt className='me-2 mb-1' />
                    Sign In
                  </Button>
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
