import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { FaUser, FaServicestack, FaEdit, FaTrash } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  MdBusiness,
  MdPayment,
  MdAddBusiness,
  MdLocationOn,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  resetBookingList,
} from "../features/booking/bookingSlice";
import {
  getAllBusinesses,
  resetBusinessList,
} from "../features/business/businessSlice";
import {
  getAllServices,
  resetServiceList,
} from "../features/service/serviceSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Moment from "moment";

const BusinessOwnerDashoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    bookings,
    isListLoading: isBookingListLoading,
    isListSuccess: isBookigListSuccess,
    isListError: isBookingListError,
    listErrorMessage: bookingListErrorMessage,
  } = useSelector((state) => state.booking);

  const {
    businesses,
    isListLoading: isBusinessListLoading,
    isListSuccess: isBusinessListSuccess,
    isListError: isBusinessListError,
    listErrorMessage: businessListErrorMessage,
  } = useSelector((state) => state.business);

  const {
    services,
    isListLoading: isServiceListLoading,
    isListSuccess: isServiceListSuccess,
    isListError: isServiceListError,
    listErrorMessage: serviceListErrorMessage,
  } = useSelector((state) => state.service);

  const [ownedServices, setOwnedServices] = useState([]);
  const [newBookings, setNewBookings] = useState([]);
  const [ownedBookings, setOwnedBookings] = useState([]);
  const [ownedBusinesses, setOwnedBusinesses] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.userType !== "businessowner") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (isBookingListError) {
      toast.error(bookingListErrorMessage, { position: "top-center" });
    } else if (isBookigListSuccess) {
      setOwnedBookings(
        bookings.filter(
          (booking) =>
            booking.service.business.businessOwner._id === userInfo._id
        )
      );
      setNewBookings(
        bookings.filter(
          (booking) =>
            booking.service.business.businessOwner._id === userInfo._id &&
            booking.bookingStatus === "booked"
        )
      );
    } else {
      dispatch(getAllBookings());
    }
  }, [
    isBookingListError,
    bookingListErrorMessage,
    isBookigListSuccess,
    bookings,
    userInfo,
    dispatch,
  ]);

  useEffect(() => {
    if (isBusinessListError) {
      toast.error(businessListErrorMessage, { position: "top-center" });
    } else if (isBusinessListSuccess) {
      setOwnedBusinesses(
        businesses.filter(
          (business) => business.businessOwner._id === userInfo._id
        )
      );
    } else {
      dispatch(getAllBusinesses());
    }
  }, [
    isBusinessListError,
    businessListErrorMessage,
    isBusinessListSuccess,
    businesses,
    userInfo,
    dispatch,
  ]);

  useEffect(() => {
    if (isServiceListError) {
      toast.error(serviceListErrorMessage, { position: "top-center" });
    } else if (isServiceListSuccess) {
      setOwnedServices(
        services.filter(
          (service) => service.business.businessOwner._id === userInfo._id
        )
      );
    } else {
      dispatch(getAllServices());
    }
  }, [
    isServiceListError,
    serviceListErrorMessage,
    isServiceListSuccess,
    services,
    userInfo,
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetBookingList());
      dispatch(resetBusinessList());
      dispatch(resetServiceList());
    };
  }, [dispatch]);

  return (
    <Container className="py-3">
      <Row>
        <h1 className="text-center">Dashboard</h1>
      </Row>

      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header as="h5" className="d-flex justify-content-center mb-3">
              New Bookings
            </Card.Header>
            {isBookingListLoading ? (
              <Loader />
            ) : isBookingListError ? (
              <Message variant="danger">{bookingListErrorMessage}</Message>
            ) : (
              bookings && (
                <Table bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Booking Date</th>
                      <th>Booking Fare</th>
                      <th>Edit</th>
                      <th>Accept</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.user.userName}</td>
                        <td>{booking.service.serviceType}</td>
                        <td>{booking.service.serviceName}</td>
                        <td>
                          {Moment(booking.bookingDate).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          BDT {booking.service.price}
                          <TbCurrencyTaka className="mb-1" />
                        </td>
                        <td>
                          <Button variant="info" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </td>
                        <td>
                          <Button variant="success" className="btn-sm">
                            Accept
                          </Button>
                        </td>
                        <td>
                          <Button variant="danger" className="btn-sm">
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        {/* Left Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as="h5" className="d-flex justify-content-center my-3">
              Recent Service List
            </Card.Header>
            {isServiceListLoading ? (
              <Loader />
            ) : isServiceListError ? (
              <Message variant="danger">{serviceListErrorMessage}</Message>
            ) : (
              services && (
                <Table bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service._id}>
                        <td>{service.serviceType}</td>
                        <td>{service.serviceName}</td>
                        <td>
                          {service.destination.district},
                          {service.destination.division}
                        </td>
                        <td>{service.serviceMobileNumber}</td>
                        <td>
                          <Button variant="info" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>

        {/* Right Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as="h5" className="d-flex justify-content-center my-3">
              Recent Business List
            </Card.Header>
            {isBusinessListLoading ? (
              <Loader />
            ) : isBusinessListError ? (
              <Message variant="danger">{businessListErrorMessage}</Message>
            ) : (
              businesses && (
                <Table bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Website</th>
                      <th>TIN Number</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business) => (
                      <tr key={business._id}>
                        <td>{business.businessName}</td>
                        <td>{business.businessAddress}</td>
                        <td>{business.businessPhone}</td>
                        <td>{business.businessWebsite}</td>
                        <td>{business.businessTIN}</td>
                        <td>
                          <Button variant="info" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessOwnerDashoard;
