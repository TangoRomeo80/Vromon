import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";

const SearchStays = () => {
  return (
    <div>
      <h1>Search Stays</h1>
    </div>
  );
};

const SearchTransports = () => {
  return (
    <div>
      <h1>Search Transports</h1>
    </div>
  );
};

const SearchDestinations = () => {
  return (
    <div>
      <h1>Search Destinations</h1>
    </div>
  );
};

const SearchTours = () => {
  return (
    <div>
      <h1>Search Tours</h1>
    </div>
  );
};

const TestNavbar = () => {
  const [searchSelection, setSearchSelection] = useState("destinations");

  return (
    <div
      style={{
        minHeight: "80vh",
        backgroundColor: "red",
        backgroundImage: 'url("/Nav/test2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="d-flex flex-row justify-content-center align-items-center"
    >
      <Card>
        {/* <Card.Img variant="top" src="/Nav/test2.jpg" /> */}

        <Card.Body>
          <Card.Text>
            {searchSelection === "stays" ? (
              <SearchStays />
            ) : searchSelection === "destinations" ? (
              <SearchDestinations />
            ) : searchSelection === "tours" ? (
              <SearchTours />
            ) : searchSelection === "transports" ? (
              <SearchTransports />
            ) : null}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TestNavbar;
