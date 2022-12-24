import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getAccomodationById,
  resetServiceDetails,
} from "../features/service/serviceSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const StayDetailsTourist = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    accomodation,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
  } = useSelector((state) => state.service);

  const [accomodationDetails, setAccomodationDetails] = useState({});

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setAccomodationDetails(accomodation);
    } else {
      dispatch(getAccomodationById(params.id));
    }
  }, [
    dispatch,
    accomodation,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  ]);

  const reFetchAccomodation = () => {
    dispatch(getAccomodationById(params.id));
  };

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails());
    };
  }, [dispatch]);

  return (
    <Container className="pt-4">
      {isDetailsLoading ? (
        <Loader />
      ) : isDetailsError ? (
        <Message variant="danger">{detailsErrorMessage}</Message>
      ) : (
        accomodation && (
          <>
            <Row className="pb-4">
              <Card.Text as="h2" className="font-weight-bolder text-center">
                Details Information of {accomodation.serviceName}
              </Card.Text>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Img
                    cascade
                    className="img-fluid"
                    src={accomodation.coverImg}
                    style={{ maxHeight: "50vh" }}
                  />
                  <Card.Body cascade>
                    <Card.Title as="h3">{accomodation.serviceName}</Card.Title>
                    <Card.Text>
                      <MdLocationOn /> &nbsp;
                      {`${accomodation.accomodationInfo.address.house}, ${accomodation.accomodationInfo.address.street}, ${accomodation.accomodationInfo.address.area}, ${accomodation.accomodationInfo.address.city} `}
                    </Card.Text>
                    <Card.Text>
                      <Rating
                        value={accomodation.rating}
                        text={`${accomodation.numOfRatings} reviews`}
                        num={accomodation.numOfRatings}
                      />
                      {/* Yaha Rating Ayega ** Yaha Number of Ratings Ayega */}
                    </Card.Text>
                    <Card.Text>
                      {/* <AddDestinationReview
                        reset={reFetchAccomodation}
                        id={params.id}
                      /> */}

                      {/* <ReadDestinationReviews
                        accomodation={accomodation}
                        user
                      /> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h3 className="my-4 d-flex justify-content-center">
              Detailed Information
            </h3>

            <Row className='my-3'>
              <Col lg={6} md={6} sm={12}>
                <Carousel>
                  {accomodation.images.length === 0 ? (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={accomodation.coverImg}
                        alt="Destination Images"
                        style={{ maxHeight: "45vh", objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  ) : (
                    <>
                      {accomodation.images.map((image, index) => (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt="Destination Images"
                            style={{ maxHeight: "45vh", objectFit: "cover" }}
                          />
                        </Carousel.Item>
                      ))}
                    </>
                  )}
                </Carousel>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Card>
                  <Card.Header as="h4" className="text-center">
                    Information About {accomodation.serviceName}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <strong>Hotel Name : </strong>
                      {accomodation.serviceName}
                    </Card.Text>
                    <Card.Text>
                      <strong>Location : </strong>
                      {`${accomodation.accomodationInfo.address.house}, ${accomodation.accomodationInfo.address.street}, ${accomodation.accomodationInfo.address.area}, ${accomodation.accomodationInfo.address.city}, `}
                    </Card.Text>
                    <Card.Text>
                      <strong>Rooms Available : </strong>
                      {accomodation.accomodationInfo.rooms}
                    </Card.Text>
                    <Card.Text>
                      <strong>Max Guests (Per Room) : </strong>
                      {accomodation.accomodationInfo.maxGuests}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cost (Per Room) : </strong>
                      BDT {accomodation.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Discount : </strong>
                      {accomodation.priceDiscount}%
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </Container>
  );
};

export default StayDetailsTourist;
