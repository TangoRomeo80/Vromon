import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getAllPayments,
  resetPaymentList,
} from '../features/payment/paymentSlice'
import Moment from 'moment'
import StatCard from '../components/StatCard'

const TouristPaymentsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    payments,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.payment)

  const [ownedPayments, setOwnedPayments] = useState([])
  const [inPayments, setInPayments] = useState([])
  const [outPayments, setOutPayments] = useState([])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'tourist') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess && payments) {
      setOwnedPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'C2B') {
            return payment.paymentFrom._id === userInfo._id
          } else if (payment.paymentParties === 'V2C') {
            return payment.paymentForCustomer._id === userInfo._id
          }
        })
      )

      setInPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'V2C') {
            return payment.paymentForCustomer._id === userInfo._id
          } else {
            return false
          }
        })
      )

      setOutPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'C2B') {
            return payment.paymentFrom._id === userInfo._id
          } else {
            return false
          }
        })
      )
    } else {
      dispatch(getAllPayments())
    }
  }, [
    isListError,
    listErrorMessage,
    isListSuccess,
    payments,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetPaymentList())
    }
  }, [dispatch])

  return (
    <Container className='py-3'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <h1>Payments and Transactions</h1>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col lg={6} sm={12} md={6} className='d-flex justify-content-center'>
          <StatCard
            linkTo='#'
            data={payments ? outPayments.length : 0}
            description='Completed Payments'
            bgColor='danger'
            width='30'
            loading={isListLoading ? true : false}
            error={isListError ? listErrorMessage : null}
            imgSrc='./moneyOut.png'
          />
        </Col>
        <Col lg={6} sm={12} md={6} className='d-flex justify-content-center'>
          <StatCard
            linkTo='#'
            data={payments ? inPayments.length : 0}
            description='Recieved Refunds'
            bgColor='success'
            width='30'
            loading={isListLoading ? true : false}
            error={isListError ? listErrorMessage : null}
            imgSrc='./moneyIn.png'
          />
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col sm={12} md={12} lg={12}>
          <Card>
            <Card.Header as='h5' className='d-flex justify-content-center mb-3'>
              Transaction History
            </Card.Header>
            {isListLoading ? (
              <Loader />
            ) : isListError ? (
              <Message variant='danger'>{listErrorMessage}</Message>
            ) : (
              payments && (
                <Table
                  bordered
                  hover
                  responsive
                  className='table-sm overflow-auto'
                  style={{ maxHeight: '20vh' }}
                >
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Transaction Date</th>
                      <th>Transaction Type</th>
                      <th>Transaction Amount</th>
                      <th>Payment For Service(If applicable)</th>
                    </tr>
                  </thead>
                  {ownedPayments.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan='5' className='text-center'>
                          No Transactions Found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {ownedPayments.map((payment) => (
                        <tr key={payment._id}>
                          <td>{payment._id}</td>
                          <td>
                            {Moment(payment.createdAt).format(
                              'DD/MM/YYYY hh:mm A'
                            )}
                          </td>
                          <td>
                            {payment.paymentParties === 'C2B'
                              ? 'Payment'
                              : 'Refund'}
                          </td>
                          <td>{payment.paymentAmount}</td>
                          <td>
                            {payment.paymentParties === 'C2B'
                              ? payment.paymentForBooking.service.serviceName
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TouristPaymentsScreen
