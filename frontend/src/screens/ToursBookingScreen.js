import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import {
  getTourById,
  resetServiceDetails,
} from "../features/service/serviceSlice";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  resetBookingCreate,
  resetBookingUpdate,
  resetBookingDetails,
  resetBookingDelete,
} from "../features/booking/bookingSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

const ToursBookingScreen = () => {
  const [searchParams] = useSearchParams();
  const tourId = useParams().id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    tour,
    isDetailsLoading: isTourDetailsLoading,
    isDetailsError: isTourDetailsError,
    detailsErrorMessage: tourDetailsErrorMessage,
    isDetailsSuccess: isTourDetailsSuccess,
  } = useSelector((state) => state.service);

  const {
    booking,
    isCreateLoading: isBookingCreateLoading,
    isCreateError: isBookingCreateError,
    isCreateSuccess: isBookingCreateSuccess,
    createErrorMessage: bookingCreateErrorMessage,
    isUpdateLoading: isBookingUpdateLoading,
    isUpdateError: isBookingUpdateError,
    isUpdateSuccess: isBookingUpdateSuccess,
    updateErrorMessage: bookingUpdateErrorMessage,
    isDeleteLoading: isBookingDeleteLoading,
    isDeleteError: isBookingDeleteError,
    isDeleteSuccess: isBookingDeleteSuccess,
    deleteErrorMessage: bookingDeleteErrorMessage,
  } = useSelector((state) => state.booking);

  const [tourDetails, setTourDetails] = useState({});
  const [travelerName, setTravelerName] = useState("");
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelerPhone, setTravelerPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [alert, setAlert] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleClose = () => setShowBookingModal(false);
  const handleShow = () => setShowBookingModal(true);

  useEffect(() => {
    if (searchParams.get("status")) {
      if (searchParams.get("status") === "success") {
        dispatch(
          updateBooking({
            id: searchParams.get("bookingId"),
            bookingData: {
              paymentStatus: "paid",
              paymentMethod: "card",
              paymentAmount: searchParams.get("amount") * 1,
              bookingStatus: "booked",
            },
          })
        );
        toast.success("Payment Successful, Booking Confirmed", {
          position: "top-center",
        });
      } else if (searchParams.get("status") === "fail") {
        dispatch(deleteBooking(searchParams.get("bookingId")));
        toast.error("Payment Failed, Booking Cancelled", {
          position: "top-center",
        });
      } else if (searchParams.get("status") === "cancel") {
        dispatch(deleteBooking(searchParams.get("bookingId")));
        toast.error("Payment Cancelled, Booking Cancelled", {
          position: "top-center",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isTourDetailsError) {
      toast.error(tourDetailsErrorMessage, {
        position: "top-center",
      });
    } else if (isTourDetailsSuccess) {
      setTourDetails(tour);
    } else {
      dispatch(getTourById(tourId));
    }
  }, [dispatch, tourId]);

  useEffect(() => {
    if (isBookingCreateError) {
      toast.error(bookingCreateErrorMessage, {
        position: "top-center",
      });
    } else if (isBookingUpdateError) {
      toast.error(bookingUpdateErrorMessage, {
        position: "top-center",
      });
    } else if (isBookingDeleteError) {
      toast.error(bookingDeleteErrorMessage, {
        position: "top-center",
      });
    } else if (isBookingCreateSuccess) {
      handleShow();
    }
  }, [dispatch, isBookingCreateSuccess, isBookingCreateError]);

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails());
      dispatch(resetBookingDetails());
      dispatch(resetBookingCreate());
      dispatch(resetBookingUpdate());
      dispatch(resetBookingDelete());  
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const bookingData = {
      user: userInfo._id,
      service: tour._id,
      customerInfo: {
        travelerName,
        travelerPhone,
        remarks,
        alert,
      },
    };
    dispatch(createBooking(bookingData));
  };

  const handleConfirm = () => {
    const bookingData = {
      paymentMethod,
      bookingStatus: "booked",
    };
    dispatch(updateBooking({ id: booking._id, bookingData }));
    handleClose();
    toast.success("Booking Confirmed", { position: "top-center" });
  };

  const handleCancel = () => {
    dispatch(deleteBooking(booking._id));
    handleClose();
    toast.error("Booking Cancelled", { position: "top-center" });
  };

  const handlePayment = () => {
    const bookingData = {
      paymentMethod,
      // bookingStatus: "pending",
    };
    updateBooking({ id: booking._id, bookingData });
    window.open(
      `http://localhost:5000/api/bookings/ssl-request?bookingId=${booking._id}`,
      "_self"
    );
    handleClose();
  };

  return (
    <>
      {isTourDetailsLoading ||
      isBookingCreateLoading ||
      isBookingDeleteLoading ? (
        <Loader />
      ) : isTourDetailsError ? (
        <Message variant="danger">{tourDetailsErrorMessage}</Message>
      ) : (
        tour && (
          <Container className="pt-4">
            {/* Header Card */}
            <Card className="mb-2 shadow">
              <Card.Body>
                <Row>
                  <h3 className="text-center">Tour Package Name</h3>
                </Row>
              </Card.Body>
            </Card>

            <Row className="my-3 d-flex">
              <Col lg={7} md={7} sm={12}>
                <Card>
                  <Card.Img
                    className="img-fluid"
                    cascade
                    src="/uploads/stays-2.jpg"
                    style={{ height: "53vh" }}
                  />
                </Card>
              </Col>

              <Col lg={5} md={5} sm={12}>
                <Row>
                  <Col lg={6} md={12} sm={12} className="mb-4">
                    <Card>
                      <Card.Img
                        className="img-fluid"
                        cascade
                        src="/uploads/stays-2.jpg"
                        style={{ height: "25vh" }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className="img-fluid"
                        cascade
                        src="/uploads/stays-2.jpg"
                        style={{ height: "25vh" }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className="img-fluid"
                        cascade
                        src="/uploads/stays-2.jpg"
                        style={{ height: "25vh" }}
                      />
                    </Card>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Card>
                      <Card.Img
                        className="img-fluid"
                        cascade
                        src="/uploads/stays-2.jpg"
                        style={{ height: "25vh" }}
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Booking Card */}

            <Row className="mt-4">
              {/* Left Column For Personal Information */}
              <Col lg={8} md={6} sm={12}>
                <Form onSubmit={submitHandler}>
                  <Card className="shadow">
                    <Card.Header as="h5" className="my-2">
                      Traveler Information
                    </Card.Header>
                    <Card.Text className="small mx-3 mt-2">
                      Booking Requested By :{" "}
                      {userInfo ? userInfo.userName : "Guest"}
                    </Card.Text>
                    <Card.Text className="small mx-3 mt-2">
                      * Please enter the contact details of the person who would
                      like to receive the confirmation and be contacted if
                      required.
                    </Card.Text>
                    <Card.Body>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="travelerName">
                            <Form.Label className="">Traveler Name</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="shadow"
                              placeholder="Please Enter Your Name"
                              value={travelerName}
                              onChange={(e) => setTravelerName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="travelerCounts"
                          >
                            <Form.Label className="">
                              Traveler Counts
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="shadow"
                              placeholder="Please Enter Number of Traveler(s)"
                              value={travelerCount}
                              onChange={(e) => setTravelerCount(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="phone">
                            <Form.Label className="">Phone Number</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="shadow"
                              placeholder="Please Enter Your Contact Number"
                              value={travelerPhone}
                              onChange={(e) => setTravelerPhone(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="remarks">
                            <Form.Label className="">Remarks</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              className="shadow"
                              placeholder="Please write if you have any remarks regarding your booking"
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="my-3 py-2">
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Receive text alerts about this trip. Message and data rates may apply"
                            checked={alert}
                            onChange={(e) => setAlert(e.target.checked)}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="py-3">
                        <Button>Confirm Booking</Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>

              {/* Payment Modal */}
              {!isBookingCreateLoading && (
                <Modal
                  show={showBookingModal}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Booking Information For {tour.serviceName}
                    </Modal.Title>
                  </Modal.Header>

                  {isBookingCreateLoading ? (
                    <Loader />
                  ) : isBookingCreateError ? (
                    <Message variant="danger">
                      {bookingCreateErrorMessage}
                    </Message>
                  ) : (
                    <Modal.Body>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card.Title className="">
                            {tour.tourInfo.address.house},{" "}
                            {tour.tourInfo.rooms} {"Rooms"}
                          </Card.Title>
                          <Card.Text className="small">
                            <MdLocationOn />{" "}
                            {tour.tourInfo.address.city}{" "}
                            <MdDateRange />{" "}
                            {Moment(
                              tour.tourInfo.checkinDate
                            ).format("DD MMM YYYY")}
                            to <MdDateRange />{" "}
                            {Moment(
                              tour.tourInfo.checkoutDate
                            ).format("DD MMM YYYY")}
                          </Card.Text>
                          <Card.Text className="small">
                            Customer Name : {travelerName}
                            <br />
                            Customer Phone: {travelerPhone}
                            <br />
                            Guest Count: {travelerCount}
                            <br />
                            Remarks: {remarks}
                            <br />
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col lg={12} md={12} sm={12}>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="paymentMethod"
                            >
                              <Form.Label className="">
                                Payment Method
                              </Form.Label>
                              <Form.Control
                                as="select"
                                className="shadow"
                                value={paymentMethod}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              >
                                <option value="">Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="card">
                                  Card / Mobile Banking
                                </option>
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                    </Modal.Body>
                  )}
                  <Modal.Footer>
                    {paymentMethod === "cash" && (
                      <Button variant="success" onClick={handleConfirm}>
                        Confirm Booking
                      </Button>
                    )}
                    {paymentMethod === "card" && (
                      <Button variant="primary" onClick={handlePayment}>
                        Make Payment and Confirm
                      </Button>
                    )}
                    <Button variant="danger" onClick={handleCancel}>
                      Cancel Booking
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}

              {/* Right Column For Booking Information */}
              <Col lg={4} md={6} sm={12}>
                <Card className="shadow">
                  <Card.Body>
                    {/* Image and Hotel Row */}
                    <Row className="mb-5">
                      <Col lg={4} md={12} sm={12}>
                        <Card.Img
                          src="/uploads/stays-1.jpg"
                          className="img-fluid"
                        />
                      </Col>

                      <Col lg={8} md={12} sm={12}>
                        <Card.Title className="small">
                          Tour Package Name
                        </Card.Title>
                        <Card.Text className="small">
                          <MdLocationOn />
                          Address
                        </Card.Text>
                      </Col>
                    </Row>

                    {/* Booking Information Row */}
                    <Row className="mb-5">
                      <Col sm={12} md={8} lg={8}>
                        <Card.Title as="h5">Booking Summary</Card.Title>
                      </Col>

                      <Col sm={12} md={4} lg={4}>
                        <Card.Text className="d-flex justify-content-end small">
                          <strong>1 Night</strong>
                        </Card.Text>
                      </Col>

                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text>
                            <strong>Travel Date</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Travelers</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Lead Tour Guide</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className="d-flex justify-content-end">
                            12-14-2022
                          </Card.Text>
                          <Card.Text className="d-flex justify-content-end">
                            15 Person(s)
                          </Card.Text>
                          <Card.Text className="d-flex justify-content-end">
                            Ailshe Tripura
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>

                    {/* Total Price Row */}
                    <Row>
                      <Card.Title as="h5" className="mb-3">
                        Fare Summary
                      </Card.Title>

                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text>
                            <strong>Total Rate</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Discount</strong>
                          </Card.Text>
                          <Card.Text>
                            <strong>Price To Be Paid</strong>
                          </Card.Text>
                        </Row>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Row>
                          <Card.Text className="d-flex justify-content-end">
                            BDT 5000 <TbCurrencyTaka className="mt-1" />
                          </Card.Text>
                          <Card.Text className="d-flex justify-content-end">
                            0%
                          </Card.Text>
                          <Card.Text className="d-flex justify-content-end">
                            BDT 5000 <TbCurrencyTaka className="mt-1" />
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  );
};

export default ToursBookingScreen;
