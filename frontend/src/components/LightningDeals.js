import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import {motion} from 'framer-motion'

const LightningDeals = () => {
  return (
    <div>
      <Container>
        <h2 className="font-weight-bold text-center mb-4 my-4"> Lightning Deals </h2>

        {/* <motion.div animate={{ x: 1 }} transition={{ delay: 1 }}>
          <Row>
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
        </motion.div> */}

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

        <Row>
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
  );
};

export default LightningDeals;
