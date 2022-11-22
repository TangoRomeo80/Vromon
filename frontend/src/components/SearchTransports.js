import React, { useState } from 'react'
import { Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

const SearchTransports = () => {
  const [departFrom, setDepartFrom] = useState('')
  const [departTo, setDepartTo] = useState('')
  const [departOn, setDepartOn] = useState('')
  const [returnOn, setReturnOn] = useState('')
  const [passengerCount, setPassengerCount] = useState('')
  const [category, setCategory] = useState('')

  return (
    <div>
      <Card>
        <Row className='mt-3'>
          <Card.Text as='h5' className='font-weight-bolder text-muted'>
            Search Transports
          </Card.Text>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Depart From</Card.Text>
            <Form.Group className='mb-3' controlId='departFrom'>
              <Form.Control
                type='text'
                placeholder='Depart From'
                value={departFrom}
                onChange={(e) => setDepartFrom(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Depart To</Card.Text>
            <Form.Group className='mb-3' controlId='departTo'>
              <Form.Control
                type='text'
                placeholder='Depart To'
                value={departTo}
                onChange={(e) => setDepartTo(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col style={{ width: '15px' }}>
            <Card.Text>Depart On</Card.Text>
            <Form.Group className='mb-3' controlId='departOn'>
              <InputGroup>
                <div
                  onClick={(e) => {
                    setDepartOn('')
                  }}
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
                value={departOn}
                onChange={(e) => setDepartOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Return On</Card.Text>
            <Form.Group className='mb-3' controlId='returnOn'>
              <InputGroup>
                <div
                  onClick={(e) => {
                    setReturnOn('')
                  }}
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
                value={returnOn}
                onChange={(e) => setReturnOn(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Passengers</Card.Text>
            <Form.Group className='mb-3' controlId='passengerCount'>
              <Form.Control
                type='text'
                placeholder='Enter Number of Passenger(s)'
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>{category}</option>
                <option value='AC'>AC</option>
                <option value='Non AC'>Non AC</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default SearchTransports
