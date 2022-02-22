import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {
  FaMapMarkerAlt,
  FaCar,
  FaPlane,
  FaUmbrellaBeach,
  FaUser,
} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
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
              <LinkContainer to='/destinations'>
                <Nav.Link>
                  <FaUmbrellaBeach />
                  Holiday Packages
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <NavDropdown title={<FaUser />} id='basic-nav-dropdown'>
                <NavDropdown.Item>Sign In</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
