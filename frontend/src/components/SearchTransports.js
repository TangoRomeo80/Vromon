import React, { useState } from 'react'
import { Row, Col, Card, Form, ListGroup, Button } from 'react-bootstrap'
import districts from '../staticData/districts'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

const TicketSearch = ({ from, to, dep, ret }) => {
  const [departFrom, setDepartFrom] = useState(from ? from : '')
  const [departTo, setDepartTo] = useState(to ? to : '')
  const [departOn, setDepartOn] = useState(dep ? dep : '')
  const [returnOn, setReturnOn] = useState(ret ? ret : '')
  const [departFromSelected, setDepartFromSelected] = useState(true)
  const [departToSelected, setDepartToSelected] = useState(true)

  return (
    <>
      <Row className='my-5 mx-3'>
        <Col lg={3} md={3} sm={12}>
          <Card.Text>Depart From</Card.Text>
          <Form.Group className='mb-3' controlId='departFrom'>
            <Form.Control
              required
              type='text'
              placeholder='Depart From'
              value={departFrom}
              onChange={(e) => {
                setDepartFrom(e.target.value)
                setDepartFromSelected(false)
              }}
            ></Form.Control>
          </Form.Group>
          {departFrom && !departFromSelected && (
            <ListGroup
              style={{
                position: 'absolute',
                zIndex: '9999',
              }}
            >
              {districts
                .filter((district) =>
                  district.toLowerCase().startsWith(departFrom.toLowerCase())
                )
                .map((district, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={(e) => {
                      setDepartFrom(e.target.innerText)
                      setDepartFromSelected(true)
                    }}
                  >
                    {district}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>

        <Col lg={3} md={3} sm={12}>
          <Card.Text>Depart To</Card.Text>
          <Form.Group className='mb-3' controlId='departTo'>
            <Form.Control
              type='text'
              placeholder='Depart To'
              value={departTo}
              onChange={(e) => {
                setDepartTo(e.target.value)
                setDepartToSelected(false)
              }}
            ></Form.Control>
          </Form.Group>
          {departTo && !departToSelected && (
            <ListGroup
              style={{
                position: 'absolute',
                zIndex: '9999',
              }}
            >
              {districts
                .filter((district) =>
                  district.toLowerCase().startsWith(departTo.toLowerCase())
                )
                .map((district, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={(e) => {
                      setDepartTo(e.target.innerText)
                      setDepartToSelected(true)
                    }}
                  >
                    {district}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>

        <Col lg={3} md={3} sm={12}>
          <Card.Text>Depart On</Card.Text>
          <Form.Group className='mb-3' controlId='departOn'>
            <Form.Control
              type='date'
              value={departOn}
              onChange={(e) => setDepartOn(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col lg={3} md={3} sm={12}>
          <Card.Text>Return On</Card.Text>
          <Form.Group className='mb-3' controlId='returnOn'>
            <Form.Control
              type='date'
              value={returnOn}
              onChange={(e) => setReturnOn(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <a
        className='mb-3 mx-2 d-grid gap-3'
        href={`/transportSearch?from=${departFrom}&to=${departTo}&dep=${departOn}&ret=${returnOn}&rental=false`}
        onClick={(e) => {
          if (!departFrom || !departTo || !departOn || !returnOn) {
            e.preventDefault()
            alert('Please fill all the fields')
          }
        }}
      >
        <Button>Search</Button>
      </a>
    </>
  )
}

const RentalSearch = ({
  pick,
  drop,
  pickDate,
  dropDate,
  pickTime,
  dropTime,
}) => {
  const [pickUp, setPickUp] = useState(pick ? pick : '')
  const [dropOff, setDropOff] = useState(drop ? drop : '')
  const [pickUpDate, setPickUpDate] = useState(pickDate ? pickDate : '')
  const [dropOffDate, setDropOffDate] = useState(dropDate ? dropDate : '')
  const [pickUpTime, setPickUpTime] = useState(pickTime ? pickTime : '')
  const [dropOffTime, setDropOffTime] = useState(dropTime ? dropTime : '')
  const [pickUpSelected, setPickUpSelected] = useState(true)
  const [dropOffSelected, setDropOffSelected] = useState(true)

  return (
    <>
      <Row className='my-5 mx-3'>
        <Col lg={6} md={6} sm={6}>
          <Card.Text>Pick Up</Card.Text>
          <Form.Group className='mb-3' controlId='pickUp'>
            <Form.Control
              type='text'
              placeholder='Pick Up Location'
              value={pickUp}
              onChange={(e) => {
                setPickUp(e.target.value)
                setPickUpSelected(false)
              }}
            ></Form.Control>
          </Form.Group>
          {pickUp && !pickUpSelected && (
            <ListGroup
              style={{
                position: 'absolute',
                zIndex: '9999',
              }}
            >
              {districts
                .filter((district) =>
                  district.toLowerCase().startsWith(pickUp.toLowerCase())
                )
                .map((district, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={(e) => {
                      setPickUp(e.target.innerText)
                      setPickUpSelected(true)
                    }}
                  >
                    {district}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={6} md={6} sm={6}>
          <Card.Text>Drop Off</Card.Text>
          <Form.Group className='mb-3' controlId='dropOff'>
            <Form.Control
              type='text'
              placeholder='Drop Off Location'
              value={dropOff}
              onChange={(e) => {
                setDropOff(e.target.value)
                setDropOffSelected(false)
              }}
            ></Form.Control>
          </Form.Group>
          {dropOff && !dropOffSelected && (
            <ListGroup
              style={{
                position: 'absolute',
                zIndex: '9999',
              }}
            >
              {districts
                .filter((district) =>
                  district.toLowerCase().startsWith(dropOff.toLowerCase())
                )
                .map((district, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={(e) => {
                      setDropOff(e.target.innerText)
                      setDropOffSelected(true)
                    }}
                  >
                    {district}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={3} md={3} sm={6}>
          <Card.Text>Pick Up Date</Card.Text>
          <Form.Group className='mb-3' controlId='pickUpDate'>
            <Form.Control
              type='date'
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col lg={3} md={3} sm={6}>
          <Card.Text>Drop Off Date</Card.Text>
          <Form.Group className='mb-3' controlId='dropOffDate'>
            <Form.Control
              type='date'
              value={dropOffDate}
              onChange={(e) => setDropOffDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col lg={3} md={3} sm={6}>
          <Card.Text>Pick Up Time</Card.Text>
          <Form.Group className='mb-3' controlId='pickUpTime'>
            <Form.Control
              type='time'
              value={pickUpTime}
              onChange={(e) => setPickUpTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col lg={3} md={3} sm={6}>
          <Card.Text>Drop Off Time</Card.Text>
          <Form.Group className='mb-3' controlId='dropOffTime'>
            <Form.Control
              type='time'
              value={dropOffTime}
              onChange={(e) => setDropOffTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <a
        className='mb-3 mx-2 d-grid gap-3'
        href={`/transportSearch?pick=${pickUp}&drop=${dropOff}&pickDate=${pickUpDate}&dropDate=${dropOffDate}&pickTime=${pickUpTime}&dropTime=${dropOffTime}&rental=true`}
        onClick={(e) => {
          if (
            !pickUp ||
            !dropOff ||
            !pickUpDate ||
            !dropOffDate ||
            !pickUpTime ||
            !dropOffTime
          ) {
            e.preventDefault()
            alert('Please fill all the fields')
          }
        }}
      >
        <Button>Search</Button>
      </a>
    </>
  )
}

const SearchTransports = ({
  rental,
  pick,
  drop,
  pickDate,
  dropDate,
  pickTime,
  dropTime,
  from,
  to,
  dep,
  ret,
}) => {
  const [isRent, setIsRent] = useState(rental ? rental : false)

  return (
    <div>
      <Card>
        <Row className='mt-2'>
          <Col lg={12} md={12} sm={12}>
            <Button
              variant={isRent ? 'outline-primary' : 'primary'}
              className='me-2'
              onClick={() => setIsRent(false)}
            >
              Bus
            </Button>
            <Button
              variant={isRent ? 'primary' : 'outline-primary'}
              className='ms-2'
              onClick={() => setIsRent(true)}
            >
              Car
            </Button>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Card.Text as='h5' className='font-weight-bolder text-muted'>
            {isRent ? 'Rent a Car' : 'Book a Bus'}
          </Card.Text>
        </Row>
        {isRent ? (
          <RentalSearch
            pick={pick}
            drop={drop}
            pickDate={pickDate}
            dropDate={dropDate}
            pickTime={pickTime}
            dropTime={dropTime}
          />
        ) : (
          <TicketSearch
            from={from}
            to={to}
            dep={dep}
            ret={ret}
          />
        )}
      </Card>
    </div>
  )
}

SearchTransports.defaultProps = {
  rental: false,
}

export default SearchTransports
