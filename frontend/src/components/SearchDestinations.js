import React, { useState } from 'react'
import { Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap'
import districts from '../staticData/districts'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const SearchDestinations = ({ district, division }) => {
  const [searchDistrict, setSearchDistrict] = useState(district ? district : '')
  const [searchDivision, setSearchDivision] = useState(division ? division : '')
  const [searchSelected, setSearchSelected] = useState(true)

  return (
    <div>
      <Card>
        <Row className='mt-3'>
          <Card.Text as='h5' className='font-weight-bolder text-muted'>
            Search Destinations
          </Card.Text>
        </Row>
        <Row className='my-5 mx-3'>
          <Col>
            <Card.Text>Select Division</Card.Text>
            <Form.Group className='mb-3' controlId='searchDivision'>
              <Form.Control
                className='form-select'
                as='select'
                type='select'
                placeholder='Select Division'
                value={searchDivision}
                onChange={(e) => setSearchDivision(e.target.value)}
              >
                <option disabled selected value=''>
                  Select Division
                </option>
                <option value='Dhaka'>Dhaka</option>
                <option value='Chattogram'>Chattogram</option>
                <option value='Sylhet'>Sylhet</option>
                <option value='Rajshahi'>Rajshahi</option>
                <option value='Khulna'>Khulna</option>
                <option value='Barisal'>Barisal</option>
                <option value='Rangpur'>Rangpur</option>
                <option value='Mymensingh'>Mymensingh</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Enter District</Card.Text>
            <Form.Group className='mb-3' controlId='searchDistrict'>
              <Form.Control
                type='text'
                placeholder='Enter District Name'
                value={searchDistrict}
                onChange={(e) => {
                  setSearchDistrict(e.target.value)
                  setSearchSelected(false)
                }}
              ></Form.Control>
            </Form.Group>
            {searchDistrict && !searchSelected && (
              <ListGroup
                style={{
                  position: 'absolute',
                  zIndex: '9999',
                }}
              >
                {districts
                  .filter((district) =>
                    district
                      .toLowerCase()
                      .startsWith(searchDistrict.toLowerCase())
                  )
                  .map((district, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={(e) => {
                        setSearchDistrict(e.target.innerText)
                        setSearchSelected(true)
                      }}
                    >
                      {district}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Col>
        </Row>
        <a
          className='mb-3 mx-2 d-grid gap-3'
          href={`/destinationSearch?district=${searchDistrict}&division=${searchDivision}`}
          onClick={(e) => {
            if (!searchDistrict || !searchDivision) {
              e.preventDefault()
              toast.error('Please select both division and district', {
                position: 'top-center',
              })
            }
          }}
        >
          <Button>Submit Search</Button>
        </a>
      </Card>
    </div>
  )
}

export default SearchDestinations
