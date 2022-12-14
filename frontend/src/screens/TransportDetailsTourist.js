import React from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";


const TransportDetailsTourist = () => {
  return (
    <Container className="pt-5">
    <Row className="pb-5">
      <Card.Text as="h2" className="font-weight-bolder text-center">
        Transport Details
      </Card.Text>
    </Row>

    <Form>
      <Row>
        <Col xs={12} md={4} xl={3}>
          <Card className="mb-4">
            <Card.Header>Transport Image</Card.Header>
            <Card.Body className="text-center">
                <Card.Img
                src='/destinations/test.png'
                />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8} xl={9}>
          <Card className="mb-4">
            <Card.Header>Transport Information</Card.Header>
            <Card.Body>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Transport Name
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Car Type
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Car Model
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Pick From
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Drop To
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Pick Time
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3" controlId="transportName">
                    <Form.Label className="small mb-1">
                      Drop Ttime
                    </Form.Label>
                    <Form.Control required type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Form>
  </Container>
  )
}

export default TransportDetailsTourist