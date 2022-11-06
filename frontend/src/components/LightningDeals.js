import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopServices,
  resetServiceList,
} from "../features/service/serviceSlice";

const LightningDeals = () => {
  const dispatch = useDispatch();

  const [topServices, setTopServices] = useState([]);

  const {
    services,
    isListLoading,
    isListSuccess,
    isListError,
    listErrorMessage,
  } = useSelector((state) => state.service);

  useEffect(() => {
    if (isListError) {
      toast.error(listErrorMessage, { position: "top-center" });
    }
    if (isListSuccess) {
      setTopServices(services);
    } else {
      dispatch(getTopServices());
    }
  }, [dispatch, services, isListSuccess, isListError, listErrorMessage]);

  useEffect(() => {
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch]);

  return (
    <div>
      <Container>
        <h2 className="font-weight-bold text-center mb-4 my-4">
          {" "}
          Lightning Deals{" "}
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

        <Row className="mb-4">
          <Button variant="info" size="sm">
            Show More
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default LightningDeals;
