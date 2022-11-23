import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAuthedUser, resetAuth } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import SearchStays from '../components/SearchStays'
import SearchTransports from '../components/SearchTransports'
import SearchDestinations from '../components/SearchDestinations'
import SearchTours from '../components/SearchTours'


const Navbar = () => {
  const [searchParams] = useSearchParams()
  const [searchSelection, setSearchSelection] = useState('destinations')

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('id')) {
      if (!isSuccess || !userInfo) {
        dispatch(getAuthedUser(searchParams.get('id')))
        navigate('/')
      }
      if (isError) {
        alert(message)
      }
      dispatch(resetAuth())
    }
  }, [searchParams, userInfo, isError, isSuccess, message, dispatch])

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundImage: 'url("/Nav/test2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='d-flex justify-content-center align-items-center'
    >
      <Card className='text-center w-75 shadow bg-light'>
        <Card.Header>
          <Container>
            <Row>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center pe-0'
                onClick={() => setSearchSelection('destinations')}
              >
                <Link
                  to=''
                  className='text-decoration-none d-flex justify-content-center align-items-center text-dark shadow py-1'
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'destinations'
                      ? 'success'
                      : 'outline-success'
                  }
                >
                  <b>Destination</b>
                </Link>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center px-0'
                onClick={() => setSearchSelection('transports')}
              >
                <Link
                  to=''
                  className='text-decoration-none d-flex justify-content-center align-items-center text-dark shadow'
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'transports'
                      ? 'success'
                      : 'outline-success'
                  }
                >
                  <b>Transports</b>
                </Link>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center px-0'
                onClick={() => setSearchSelection('stays')}
              >
                <Link
                  to=''
                  className='text-decoration-none d-flex justify-content-center align-items-center text-dark shadow'
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'stays' ? 'success' : 'outline-success'
                  }
                >
                  <b>Stays</b>
                </Link>
              </Col>
              <Col
                sm={6}
                lg={3}
                className='d-flex justify-content-center ps-0'
                onClick={() => setSearchSelection('tours')}
              >
                <Link
                  to=''
                  className='text-decoration-none d-flex justify-content-center align-items-center text-dark shadow'
                  style={{ width: '100%', borderRadius: '0' }}
                  variant={
                    searchSelection === 'tours' ? 'success' : 'outline-success'
                  }
                >
                  <b>Tours</b>
                </Link>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          {searchSelection === 'stays' ? (
            <SearchStays loc='nav' />
          ) : searchSelection === 'destinations' ? (
            <SearchDestinations loc='nav' />
          ) : searchSelection === 'tours' ? (
            <SearchTours loc='nav' />
          ) : searchSelection === 'transports' ? (
            <SearchTransports loc='nav' />
          ) : null}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Navbar
