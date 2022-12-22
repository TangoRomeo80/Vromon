import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Card, Row, Col } from "react-bootstrap";
import Rating from "./Rating";

const ReadAccomodationReviews = ({ accomodation }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="ms-1"
        style={{ backgroundColor: "green" }}
        onClick={handleShow}
      >
        See all Reviews
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reviews for {accomodation.serviceName}</Modal.Title>
        </Modal.Header>
        {accomodation.reviews.length !== 0 ? (
          <Modal.Body>
            {accomodation.reviews.map((review) => (
              <Card key={review._id} className="my-3 p-3 rounded">
                <Row>
                  <Col md={3} sm={3} lg={3}>
                    <img
                      src={
                        review.user.image
                          ? review.user.image
                          : "http://bootdey.com/img/Content/avatar/avatar7.png"
                      }
                      alt={review.user.name}
                      className="img-fluid"
                      style={{ maxHeight: "10vh", objectFit: "cover" }}
                    />
                  </Col>
                  <Col md={9} sm={9} lg={9}>
                    <Card.Body>
                      <Card.Title as="div">
                        <strong>{review.user.userName}</strong>
                      </Card.Title>
                      <Card.Text as="div">
                        <Rating value={review.rating} />
                      </Card.Text>
                      <Card.Text as="p">{review.description}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Modal.Body>
        ) : (
          <Modal.Body>
            <h3 className="text-center">No Reviews yet</h3>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReadAccomodationReviews;
