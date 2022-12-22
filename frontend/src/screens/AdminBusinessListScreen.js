import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllBusinesses,
  resetBusinessList,
} from '../features/business/businessSlice'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminBusinessListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business)

  const [businessNameSearch, setBusinessNameSearch] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: 'top-center' })
    } else if (!isBusinessListSuccess) {
      dispatch(getAllBusinesses())
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetBusinessList())
    }
  }, [dispatch])

  return (
    <Container className='pt-5'>
      {isBusinessListLoading ? (
        <Loader />
      ) : isBusinessListError ? (
        <Message variant='danger'>{businessListErrorMessage}</Message>
      ) : (
        <>
          <Row className='pb-2'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Businesses
            </Card.Text>
          </Row>
          <Row className='pb-2'>
            <Col sm={4} md={2} lg={2}>
              <Link className='btn btn-primary my-3' to='/adminDash'>
                Back to Dashboard
              </Link>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={12} md={6} lg={6}>
              <Form.Control
                shadow
                type='text'
                name='businessNameSearch'
                onChange={(e) => setBusinessNameSearch(e.target.value)}
                placeholder='Search Business by name...'
              ></Form.Control>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col sm={12} md={12} lg={12}>
              <Card>
                <Card.Header
                  as='h5'
                  className='d-flex justify-content-center mb-3'
                >
                  Businesses
                </Card.Header>
                <Card.Body>
                  <Table bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>Business Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Website</th>
                        <th>Email</th>
                        <th>Payment Recieved</th>
                        <th>Payment Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {businesses
                        .filter((business) =>
                          business.businessName
                            .toLowerCase()
                            .includes(businessNameSearch.toLowerCase())
                        )
                        .map((business) => (
                          <>
                            <LinkContainer
                              to={`/adminBusinessDetail/${business._id}`}
                            >
                              <tr
                                key={business._id}
                                style={{ cursor: 'pointer' }}
                              >
                                <td>{business.businessName}</td>
                                <td>{business.businessAddress}</td>
                                <td>{business.businessPhone}</td>
                                <td>{business.businessWebsite}</td>
                                <td>{business.businessEmail}</td>
                                <td>{business.recievedPaymentAmount}</td>
                                <td>{business.duePaymentAmount}</td>
                              </tr>
                            </LinkContainer>
                          </>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default AdminBusinessListScreen
