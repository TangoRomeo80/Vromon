import React, { useState } from 'react'
import { Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

const SearchStays = ({ loc }) => {
  const [checkinDate, setCheckinDate] = useState('')
  const [checkoutDate, setCheckoutDate] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [roomCount, setRoomCount] = useState('')
  const [searchHotel, setSearchHotel] = useState('')

  return (
    <Card>
      <Row className='mt-3'>
        <Card.Text as='h5' className='font-weight-bolder text-muted'>
          Search Stays
        </Card.Text>
      </Row>

      <Row className='my-5 mx-3'>
        <Col>
          <Card.Text>Search for Hotels</Card.Text>
          <Form.Group className='mb-3' controlId='searchHotel'>
            <Form.Control
              type='text'
              placeholder='Search for Hotels'
              value={searchHotel}
              onChange={(e) => setSearchHotel(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Check-In Date</Card.Text>
          <Form.Group className='mb-3' controlId='checkinDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setCheckinDate('')
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
              placeholder={checkinDate === 'Select Check-In Date'}
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Check-Out Date</Card.Text>
          <Form.Group className='mb-3' controlId='checkoutDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setCheckoutDate('')
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
              placeholder={checkoutDate === 'Select Check-Out Date'}
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Guests</Card.Text>
          <Form.Group className='mb-3' controlId='guestCount'>
            <Form.Control
              type='text'
              placeholder='Enter Number of Guest(s)'
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Rooms</Card.Text>
          <Form.Group className='mb-3' controlId='roomCount'>
            <Form.Control
              type='text'
              placeholder='Enter Number of Room(s)'
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Card>
  )
}

export default SearchStays
