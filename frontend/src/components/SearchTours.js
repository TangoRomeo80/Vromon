import React, { useState } from 'react'
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'

const SearchTours = () => {
  const [searchTourCity, setSearchTourCity] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelerCount, setTravelerCount] = useState('')

  return (
    <Card>
      <Row className='mt-3'>
        <Card.Text as='h5' className='font-weight-bolder text-muted'>
          Search Holiday Packages
        </Card.Text>
      </Row>

      <Row className='my-5 mx-3'>
        <Col>
          <Card.Text>Enter City</Card.Text>
          <Form.Group className='mb-3' controlId='searchTourCity'>
            <Form.Control
              type='text'
              placeholder='Enter the City Name'
              value={searchTourCity}
              onChange={(e) => setSearchTourCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Travel Date</Card.Text>
          <Form.Group className='mb-3' controlId='travelDate'>
            <InputGroup>
              <div
                onClick={(e) => {
                  setTravelDate('')
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
              placeholder={travelDate === 'Select Check-In Date'}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Number of Travelers</Card.Text>
          <Form.Group className='mb-3' controlId='travelerCount'>
            <Form.Control
              type='text'
              placeholder='Number of Travelers'
              value={travelerCount}
              onChange={(e) => setTravelerCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Link
        className='mb-3'
        to='tourSearch'
        state={{
          searchTourCity: searchTourCity,
          travelDate: travelDate,
          travelerCount: travelerCount,
        }}
      >
        <Button>Search</Button>
      </Link>
    </Card>
  )
}

export default SearchTours
