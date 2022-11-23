import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const DestinationCreateScreen = () => {

    // const navigate = useNavigate()

    // const [name, setName] = useState('')
    // const [district, setDistrict] = useState('')
    // const [division, setDivision] = useState('')
    // const [address, setAddress] = useState('')
    // const [description, setDescription] = useState('')
    // const [coverImg, setCoverImg] = useState('')
    // const [images, setImages] = useState('')

    // const useDispatch=useDispatch()
  return (
    <Container className="pt-5">
      <Row className="pb-5">
        <Card.Text as="h2" className="font-weight-bolder text-center">
          Create Destination
        </Card.Text>
      </Row>

      <Form>
        <Row>
          <Col xs={12} md={4} xl={3}>
            <Card className="mb-4">
              <Card.Header>Cover Image</Card.Header>
              <Card.Body className="text-center">
                <img
                  className="mb-2"
                  alt="Other Images"
                  style={{ height: "10rem", borderRadius: "50%" }}
                />
                <Form.Group controlId="image 1">
                  <Form.Label>Upload New Image</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="file"
                    id="image-file"
                    label="Cover Image"
                  ></Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>Other Images</Card.Header>
              <Card.Body className="text-center">
                <img
                  className="mb-2"
                  alt="Other Images"
                  style={{ height: "10rem", borderRadius: "50%" }}
                />
                <Form.Group controlId="image 1">
                  <Form.Label>Upload New Image</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="file"
                    id="image-file"
                    label="Cover Image"
                  ></Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={8} xl={9}>
            <Card className="mb-4">
              <Card.Header>Destination Information</Card.Header>
              <Card.Body>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="destinationName">
                      <Form.Label className="small mb-1">
                        Destination Name
                      </Form.Label>
                      <Form.Control type="text"></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Label className="small mb-1">
                      Select Division
                    </Form.Label>
                    <Form.Group className="mb-3" controlId="searchDivision">
                      <Form.Control
                        className="form-select"
                        as="select"
                        type="select"
                        placeholder="Select Division"
                      >
                        <option disabled selected value="">
                          Select Division
                        </option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="districtName">
                      <Form.Label className="small mb-1">
                        District Name
                      </Form.Label>
                      <Form.Control type="text"></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="destinationAddress">
                      <Form.Label className="small mb-1">
                        Destination Address
                      </Form.Label>
                      <Form.Control as="textarea" rows={2}></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="destinationDescription"
                    >
                      <Form.Label className="small mb-1">
                        Destination Description
                      </Form.Label>
                      <Form.Control as="textarea" rows={4}></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-4">
            <Button variant="outline-dark" size="md">
              <b>Create Destination</b>
            </Button>
        </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Form>
    </Container>
  );
};

export default DestinationCreateScreen;