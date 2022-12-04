import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import districts from "../staticData/districts";

const SearchTours = ({ district, travel, traveler }) => {
  const [searchTourDistrict, setSearchTourDistrict] = useState(
    district ? district : ""
  );
  const [travelDate, setTravelDate] = useState(travel ? travel : "");
  const [travelerCount, setTravelerCount] = useState(traveler ? traveler : 1);

  const [searchSelected, setSearchSelected] = useState(true);

  return (
    <Card>
      <Row className="mt-3">
        <Card.Text as="h5" className="font-weight-bolder text-muted">
          Search Holiday Packages
        </Card.Text>
      </Row>

      <Row className="my-5 mx-3">
        <Col>
          <Card.Text>Enter District</Card.Text>
          <Form.Group className="mb-3" controlId="searchTourDistrict">
            <Form.Control
              type="text"
              placeholder="Enter District Name"
              value={searchTourDistrict}
              onChange={(e) => {
                setSearchTourDistrict(e.target.value);
                setSearchSelected(false);
              }}
            ></Form.Control>
          </Form.Group>
          {searchTourDistrict && !searchSelected && (
            <ListGroup style={{ position: "absolute", zIndex: "9999" }}>
              {districts
                .filter((district) =>
                  district
                    .toLowerCase()
                    .startsWith(searchTourDistrict.toLowerCase())
                )
                .map((district, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={(e) => {
                      setSearchTourDistrict(e.target.innerText);
                      setSearchSelected(true);
                    }}
                  >
                    {district}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>

        <Col>
          <Card.Text>Travel Date</Card.Text>
          <Form.Group className="mb-3" controlId="travelDate">
            <InputGroup>
              <div
                onClick={(e) => {
                  setTravelDate("");
                }}
                className="cancle-icon"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  zIndex: "9999",
                  width: "3vh",
                }}
              ></div>
            </InputGroup>
            <Form.Control
              type="date"
              placeholder={travelDate === "Select Travel Date"}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Number of Travelers</Card.Text>
          <Form.Group className="mb-3" controlId="travelerCount">
            <Form.Control
              type="text"
              placeholder="Number of Traveler(s)"
              value={travelerCount}
              onChange={(e) => setTravelerCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <a
        className="mb-3 mx-2 d-grid gap-3"
        href={
          searchTourDistrict && travelDate && travelerCount
            ? `/tourSearch?district=${searchTourDistrict}&travelDate=${travelDate}&traveler=${travelerCount}`
            : "/tourSearch"
        }
        onClick={(e) => {
          if (!searchTourDistrict || !travelDate || !travelerCount) {
            e.preventDefault();
            toast.error("Please Fill All The Fields", {
              position: "top-center",
            });
          }
        }}
      >
        <Button>Submit Search</Button>
      </a>
    </Card>
  );
};

export default SearchTours;
