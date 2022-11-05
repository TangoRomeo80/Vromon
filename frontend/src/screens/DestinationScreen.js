import React from "react";
import {motion} from 'framer-motion'
import { Row, Col, Container, Card,Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";

const DestinationScreen = () => {
  return (
    <div>
      <Container className='mb-3 pt-5'>
      <Card className='mb-3 pt-5'>
        <Row>
          <Card.Text as='h5' className='font-weight-bolder text-center'>Search Destinations</Card.Text>
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
              >
                <option value='Dhaka'>Dhaka</option>
                <option value='Chittagong'>Chittagong</option>
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
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Card.Text>Enter City</Card.Text>
            <Form.Group className='mb-3' controlId='searchCity'>
              <Form.Control
                type='text'
                placeholder='Enter the City Name'
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Card>

        <h2 className="font-weight-bold text-center mb-4">
          Popular Destinations
        </h2>
        <Row className="my-4">
          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

        <Row className="my-4">
          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>

          <Col xs={12} md={3}>
            <LinkContainer to="">
              <Card>
                <Card.Img
                  cascade
                  className="img-fluid"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body cascade>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default DestinationScreen