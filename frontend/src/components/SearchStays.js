import React, { useState } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchStays = ({ checkin, checkout, guests, rooms }) => {
  const [checkinDate, setCheckinDate] = useState(checkin ? checkin : "");
  const [checkoutDate, setCheckoutDate] = useState(checkout ? checkout : "");
  const [guestCount, setGuestCount] = useState(guests ? guests : 1);
  const [roomCount, setRoomCount] = useState(rooms ? rooms : 1);
  // const [searchHotel, setSearchHotel] = useState('')

  const [searchSelected, setSearchSelected] = useState(true);

  return (
    <Card>
      <Row className="mt-3">
        <Card.Text as="h5" className="font-weight-bolder text-muted d-flex justify-content-center">
          Search Accomodations
        </Card.Text>
      </Row>

      <Row className="my-5 mx-3">
        {/* <Col>
          <Card.Text>Search for Hotels</Card.Text>
          <Form.Group className='mb-3' controlId='searchHotel'>
            <Form.Control
              type='text'
              placeholder='Search for Hotels'
              value={searchHotel}
              onChange={(e) => setSearchHotel(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col> */}

        <Col>
          <Card.Text>Check-In Date</Card.Text>
          <Form.Group className="mb-3" controlId="checkinDate">
            {/* <InputGroup>
              <div
                onClick={(e) => {
                  setCheckinDate("");
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
            </InputGroup> */}
            <Form.Control
              type="date"
              placeholder={checkinDate === "Select Check-In Date"}
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Check-Out Date</Card.Text>
          <Form.Group className="mb-3" controlId="checkoutDate">
            {/* <InputGroup>
              <div
                onClick={(e) => {
                  setCheckoutDate("");
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
            </InputGroup> */}
            <Form.Control
              type="date"
              placeholder={checkoutDate === "Select Check-Out Date"}
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Guests</Card.Text>
          <Form.Group className="mb-3" controlId="guestCount">
            <Form.Control
              type="text"
              placeholder="Enter Number of Guest(s)"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Card.Text>Rooms</Card.Text>
          <Form.Group className="mb-3" controlId="roomCount">
            <Form.Control
              type="text"
              placeholder="Enter Number of Room(s)"
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <a
        className="mb-3 mx-2 d-grid gap-3"
        href={
          checkinDate && checkoutDate && guestCount && roomCount
            ? `/staysSearch?checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&roomCount=${roomCount}&guestCount=${guestCount}`
            : "/staysSearch"
        }
        onClick={(e) => {
          if(!checkinDate || !checkoutDate || !guestCount || !roomCount){
            e.preventDefault()
            toast.error('Please fill all the fields', {position: 'top-center'})
          }
        }}
      >
        <Button>Submit Search</Button>
      </a>
    </Card>
  );
};

export default SearchStays;
