import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Carousel,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getTourById,
  updateService,
  deleteService,
  resetServiceDetails,
  resetServiceUpdate,
  resetServiceDelete,
} from "../features/service/serviceSlice";
import Moment from "react-moment";
import Message from "../components/Message";
import Loader from "../components/Loader";

const TourDetailsBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    tour,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    updateErrorMessage,
    isDeleteLoading,
    isDeleteError,
    isDeleteSuccess,
    deleteErrorMessage,
  } = useSelector((state) => state.service);

  const [coverImg, setCoverImg] = useState("");
  const [images, setImages] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [business, setBusiness] = useState("");
  const [serviceMobileNumber, setServiceMobileNumber] = useState("");

  const [tourName, setTourName] = useState("");
  const [duration, setDuration] = useState(0);
  const [travelDate, setTravelDate] = useState(null);
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const [startLocation, setStartLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [leadGuideName, setLeadGuideName] = useState("");
  const [guideNames, setGuideNames] = useState([]);
  const [leadGuideNid, setLeadGuideNid] = useState("");
  const [leadGuideContact, setLeadGuideContact] = useState("");

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: "top-center" });
    } else if (isDetailsSuccess) {
      setCoverImg(tour.coverImg);
      setImages(tour.images);
      setServiceName(tour.serviceName);
      setServiceType(tour.serviceType);
      setPrice(tour.price);
      setPriceDiscount(tour.priceDiscount);
      setDescription(tour.description);
      setDestination(tour.destination);
      setBusiness(tour.business);
      setServiceMobileNumber(tour.serviceMobileNumber);

      setTourName(tour.tourName);
      setDuration(tour.duration);
      setTravelDate(tour.travelDate);
      setMaxGroupSize(tour.maxGroupSize);
      setStartLocation(tour.startLocation);
      setLocations(tour.locations);
      setLeadGuideName(tour.leadGuideName);
      setGuideNames(tour.guideNames);
      setLeadGuideNid(tour.leadGuideNid);
      setLeadGuideContact(tour.leadGuideContact);
    } else {
      dispatch(getTourById(params.id));
    }
  }, [dispatch, isDetailsError, isDetailsSuccess, detailsErrorMessage, tour]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateErrorMessage, { position: "top-center" });
    } else if (isUpdateSuccess) {
      toast.success("Tour Updated Successfully", { position: "top-center" });
    }
  });

  useEffect(() => {
    return () => {
      dispatch(resetServiceDetails());
      dispatch(resetServiceUpdate());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteErrorMessage, { position: "top-center" });
    } else if (isDeleteSuccess) {
      toast.success("Tour Deleted Successfully", { position: "top-center" });
      navigate("/serviceList");
    }
  });

  //To be Implemented
  const updateHandler = () => {};
  const deleteHandler = () => {
    dispatch(deleteService(params.id));
  };

  const uploadCoverImageFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `/api/upload${coverImg ? `/${coverImg.slice(8)}` : ""}`,
        formData,
        config
      );
      setCoverImg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/upload/`, formData, config);

      setImages([...images, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="pt-4">
      <Row className="pb-5">
        <Card.Text as="h2" className="font-weight-bolder text-center">
          Tour Details
        </Card.Text>
      </Row>

      <Form>
        <Row>
          <Col xs={12} md={4} xl={3}>
            <Card className="mb-4">
              <Card.Header>Cover Image</Card.Header>
              <Card.Body className="text-center">
                <Card.Img
                  cascade
                  className="img-fluid"
                  src={coverImg !== "" ? coverImg : "/destinations/test.png"}
                  style={{ height: "20vh", objectFit: "cover" }}
                />
                <Form.Group controlId="image 1">
                  <Form.Label>Upload New Image</Form.Label>
                  <Form.Control
                    required
                    className="mb-3"
                    type="file"
                    id="image-file"
                    label="Cover Image"
                    controlId="coverImg"
                    onChange={uploadCoverImageFileHandler}
                  ></Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>Other Images</Card.Header>
              <Card.Body className="text-center">
                {images.length <= 0 ? (
                  <Card.Img
                    cascade
                    className="img-fluid"
                    src="/destinations/test.png"
                    style={{ height: "20vh", objectFit: "cover" }}
                  />
                ) : (
                  <Carousel>
                    {images.map((image, index) => (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt={`Image-${index}`}
                          style={{ maxHeight: "20vh", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}

                <Form.Group controlId="image 1">
                  <Form.Label>Upload New Images</Form.Label>
                  <Form.Control
                    controlId="images"
                    className="mb-3"
                    type="file"
                    id="image-file"
                    label="Images"
                    onChange={uploadImageFileHandler}
                  ></Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={8} xl={9}>
            <Card className="mb-4">
              <Card.Header>Tour Details</Card.Header>
              <Card.Body>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Form.Group className="mb-3" controlId="destinationName">
                      <Form.Label className="small mb-1">
                        Service Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* Destination, Business */}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TourDetailsBusiness;
