import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Row, Col, Container, Card, Form, InputGroup } from 'react-bootstrap'
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

  return (
   <div>
    <Container className='mb-3 pt-5'>
        <Card className='mb-3 pt-5 bg-light shadow' >
        <Row>
        <Card.Text as='h5' className='font-weight-bolder text-center'>
              Transports
            </Card.Text>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Depart From</Card.Text>
            <Form.Group className='mb-3' controlId='departFrom'>
              <Form.Control
                type='text'
                placeholder='Depart From'
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Depart To</Card.Text>
            <Form.Group className='mb-3' controlId='departTo'>
              <Form.Control
                type='text'
                placeholder='Depart To'
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col style={{ width: '15px' }}>
            <Card.Text>Depart On</Card.Text>
            <Form.Group className='mb-3' controlId='departOn'>
              <InputGroup>
                <div
                  className='cancle-icon'
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    zIndex: '9999',
                    width: '3vh',
                  }}
                ></div>
              </InputGroup>
              <Form.Control
                type='date'
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Return On</Card.Text>
            <Form.Group className='mb-3' controlId='returnOn'>
              <InputGroup>
                <div
                  className='cancle-icon'
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    zIndex: '9999',
                    width: '3vh',
                  }}
                ></div>
              </InputGroup>
              <Form.Control
                type='date'
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Category</Card.Text>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Control
                className='form-select'
                as='select'
                type='select'
                placeholder='Select Category'
              >
                <option value='AC'>AC</option>
                <option value='Non AC'>Non AC</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </Container>
   </div>
  )
}

export default TransportScreen
