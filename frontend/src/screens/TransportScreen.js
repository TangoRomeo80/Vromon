import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransports, resetServiceList } from '../features/service/serviceSlice'

const TransportScreen = () => {
  const dispatch = useDispatch()

  const [allTransports, setAllTransports] = useState([])

  const {
    services,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service)

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: 'top-center' })
    }
    if (isListSuccess) {
      setAllTransports(services)
    } else {
      dispatch(getAllTransports())
    }
  }, [dispatch, services, isListSuccess, isListError, listErrorMessage])

  useEffect(() => {
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch]);

  return <div>TransportScreen</div>
}

export default TransportScreen
