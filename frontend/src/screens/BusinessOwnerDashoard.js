import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import { FaUser, FaServicestack, FaEdit } from "react-icons/fa";
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

      <Row className='my-4'>
        <Col>
          <Card>
            <Card.Header as="h5" className='d-flex justify-content-center mb-3'>New Bookings</Card.Header>
            <Table bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Booking Type/Service Type</th>
                  <th>Service Name</th>
                  <th>Service Availed Date</th>
                  <th>Service End Date</th>
                  <th>Service Fare</th>
                  <th>Edit</th>
                  <th>Accept</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                <tr key=''>
                  <td>Kashem Boyati</td>
                  <td>Stays</td>
                  <td>Bashundhara Stays</td>
                  <td>15-12-2022</td>
                  <td>19-12-2022</td>
                  <td>5500 BDT</td>
                  <td>Button</td>
                  <td>Button</td>
                  <td>Button</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4'>
        {/* Left Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as="h5" className='d-flex justify-content-center my-3'>Recent Service List</Card.Header>
            <Table bordered hover responsive className='table-sm'>
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
                <tr key=''>
                  <td>Transportation</td>
                  <td>Bashundhara Transportation Service</td>
                  <td>Rangamati, Bandarban</td>
                  <td>01765468115</td>
                  <td>Button</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Right Table */}
        <Col lg={6} md={6} sm={12}>
          <Card>
            <Card.Header as="h5" className='d-flex justify-content-center my-3'>Recent Business List</Card.Header>
            <Table bordered hover responsive className='table-sm'>
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
                <tr key=''>
                  <td>Sheraton Bus</td>
                  <td>Baridhara</td>
                  <td>01532183551</td>
                  <td>www.unga.com</td>
                  <td>196854813118441</td>
                  <td>Button</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessOwnerDashoard;
