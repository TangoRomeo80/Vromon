import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaPlus, FaMinus } from 'react-icons/fa'
import {
  getAllPayments,
  resetPaymentList,
} from '../features/payment/paymentSlice'
import Moment from 'moment'

const BusinessPaymentScreen = () => {
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
    } else if (userInfo.userType !== 'businessowner') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    } else if (isListSuccess) {
      setOwnedPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'C2B') {
            return (
              payment.paymentForBooking.service.business.businessOwner._id ===
              userInfo._id
            )
          } else {
            return payment.paymentFrom.businessOwner._id === userInfo._id
          }
        })
      )

      setInPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'C2B') {
            return (
              payment.paymentForBooking.service.business.businessOwner._id ===
              userInfo._id
            )
          } else {
            return false
          }
        })
      )

      setOutPayments(
        payments.filter((payment) => {
          if (payment.paymentParties === 'B2V') {
            return payment.paymentFrom.businessOwner._id === userInfo._id
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

  console.log('ownedPayments', ownedPayments)
  console.log('inPayments', inPayments)
  console.log('outPayments', outPayments)

  return <div>BusinessPaymentScreen</div>
}

export default BusinessPaymentScreen
