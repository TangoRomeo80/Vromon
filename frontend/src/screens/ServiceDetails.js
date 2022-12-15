import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ServiceDetails = () => {
  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [description, setDescription] = useState("");
  //   const [house, setHouse] = useState('')
  //   const [street, setStreet] = useState('')
  //   const [city, setCity] = useState('')
  //   const [area, setArea] = useState('')
  const [serviceMobileNumber, setServiceMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  //   const [ownerName, setOwnerName] = useState('')
  //   const [ownerNid, setOwnerNid] = useState('')

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  return (
    <Container className="pt-5">
      <Row className="pb-5">
        <Card.Text as="h2" className="font-weight-bolder text-center">
          Service Information
        </Card.Text>
      </Row>

      <Form>
        <Row>
          <Col xs={12} md={4} xl={3}>
            <Card className="mb-4">
              <Card.Header>Service Image</Card.Header>
              <Card.Body className="text-center">
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
              <Card.Header>Service Information</Card.Header>
              <Card.Body>
                <Row>
                  <h5 className="font-weight-bolder text-muted mb-3">
                    Service Information
                  </h5>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="serviceType">
                      <Form.Label className="small mb-1">
                        Service Type
                      </Form.Label>
                      <Form.Control
                        type="select"
                        as="select"
                        placeholder="Service Type"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                      >
                        <option disabled selected value="">
                          Select Service Type
                        </option>
                        <option value="Transportation">Transport</option>
                        <option value="Stays">Stays</option>
                        <option value="Tours">Tours</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="serviceName">
                      <Form.Label className="small mb-1">
                        Service Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Service Name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3" controlId="coverImg">
                      <Form.Label className="small mb-1">
                        Service Contact Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Contact No."
                        value={serviceMobileNumber}
                        onChange={(e) => setServiceMobileNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label className="small mb-1">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Detailed Description of The Service"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="py-4">
                  <Button variant="outline-dark" type="submit">
                    Save Changes
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

export default ServiceDetails;
