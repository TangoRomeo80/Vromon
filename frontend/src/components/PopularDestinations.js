import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";

const PopularDestinations = () => {
  return (
    <div>
      <Container>
        <h2 className="font-weight-bold text-center mb-4">
          Popular Destinations
        </h2>

        <Row>
          <Col xs={12} md={12} lg={12}>
            <LinkContainer to="">
              {/* <Card className='mb-3' style={{ width: '50%' }}>
                <Card.Img
                variant="top"
                  src="/LightningDeals/test.jpg"
                />

                <Card.Body>
                  <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
                </Card.Body>
              </Card> */}
              <Card>
        <Card.Img variant="top" src="/LightningDeals/test.jpg" style={{height: '50vh', objectFit: 'cover'}} />
        <Card.ImgOverlay >
        <Card.Title>Fly, Baby! Fly!</Card.Title>
                  <Card.Text>
                    <MdDateRange /> &nbsp;4 day <br />
                    <MdLocationOn /> &nbsp;Kathmundu, Nepal
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    BDT 15,500/Person
                  </Card.Text>
        </Card.ImgOverlay>
      </Card>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PopularDestinations;
