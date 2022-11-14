import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaUser, FaServicestack, FaEdit } from "react-icons/fa";
import {
  MdBusiness,
  MdPayment,
  MdAddBusiness,
  MdLocationOn,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

const BusinessOwnerDashoard = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [serviceType, setServiceType] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [uploadLicense, setUploadLicense] = useState('')
  const [tinNumber, setTinNumber] = useState('')
  const [location, setLocation] = useState('')
  const [businessContact, setBusinessContact] = useState('')
  

  const uploadUserImageFileHandler = async (e) => {
    // const file = e.target.files[0]
    // const formData = new FormData()
    // formData.append('image', file)
    // setUploading(true)

    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }

    //   const { data } = await axios.post('/upload', formData, config)

    //   setImageUrl(data)
    //   setUploading(false)
    // } catch (error) {
    //   console.error(error)
    //   setUploading(false)
    // }
    alert("Image upload needs to be implemented");
  };

  return (
    <Container className="py-3">
      <Row>
        <h1 className="text-center">Dashboard</h1>
      </Row>

      <Row className="my-2">
        <Col lg={3} md={6} sm={12}>
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Row>
                <Card.Title as="h5" className="text-center">
                  Your Services
                </Card.Title>
              </Row>
              <Row>
                {/* <Col lg={12} md={12} sm={12} className='d-grid gap-2 py-2'>
                  <Button>
                    <FaServicestack className="me-2 mb-1" />
                    Service List
                  </Button>
                </Col> */}
                <Col lg={12} md={12} sm={12} className="d-grid gap-2 py-2">
                  <Button>
                    <MdBusiness className="me-2 mb-1" />
                    Business List
                  </Button>
                </Col>
                <Col lg={12} md={12} sm={12} className="d-grid gap-2 py-2">
                  <Button>
                    <MdPayment className="me-2 mb-1" />
                    Users Payment Info
                  </Button>
                </Col>
                <Col lg={12} md={12} sm={12} className="d-grid gap-2 py-2">
                  <Button>
                    <RiSecurePaymentFill className="me-2 mb-1" />
                    Service Payment Info
                  </Button>
                </Col>
                <Col lg={12} md={12} sm={12} className="d-grid gap-2 py-2">
                  <Button>
                    <MdAddBusiness className="me-2 mb-1" />
                    Add New Business
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9} md={6} sm={12} className="mt-2">
          {/* <Row>
            <Card.Header as="h4" className="mx-4 mb-3">
              Business List
            </Card.Header>
          </Row> */}

          <Card>
            <Card.Header as="h5" className="mb-2">
              Business List
            </Card.Header>
            <Row className="mb-3">
              <Col sm={4} md={3} lg={3}>
                <Card.Img
                  src="/Destinations/Test.jpg"
                  className="img-fluid rounded-start"
                  variant="top"
                  style={{ objectFit: "cover", height: "220px" }}
                />
              </Col>
              <Col sm={4} md={6} lg={6}>
                <Card.Body>
                  <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone, Cox's
                    Bazar, Bangladesh
                  </Card.Text>
                  <Card.Text>*Rating Here</Card.Text>
                  <Card.Text>*Trip Coin</Card.Text>
                </Card.Body>
              </Col>

              <Col sm={4} md={3} lg={3} className="d-flex justify-content-end">
                <Card.Body>
                  <Card.Text className="my-3">Starts From</Card.Text>
                  <Card.Text>BDT Magna/Night</Card.Text>

                  <Button className="mt-4">Book Now</Button>
                </Card.Body>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} md={3} lg={3}>
                <Card.Img
                  src="/Destinations/Test.jpg"
                  className="img-fluid rounded-start"
                  variant="top"
                  style={{ objectFit: "cover", height: "220px" }}
                />
              </Col>
              <Col sm={4} md={6} lg={6}>
                <Card.Body>
                  <Card.Title as="h5">Sayeman Hotel & Resort</Card.Title>
                  <Card.Text>
                    <MdLocationOn /> &nbsp;14 Kalatoli Hotel Motel Zone, Cox's
                    Bazar, Bangladesh
                  </Card.Text>
                  <Card.Text>*Rating Here</Card.Text>
                  <Card.Text>*Trip Coin</Card.Text>
                </Card.Body>
              </Col>

              <Col sm={4} md={3} lg={3} className="d-flex justify-content-end">
                <Card.Body>
                  <Card.Text className="my-3">Starts From</Card.Text>
                  <Card.Text>BDT Magna/Night</Card.Text>

                  <Button className="mt-4">Book Now</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Form>
            <Card className="mb-1 shadow">
              <Card.Header as="h5" className="mb-2">
                Add a Business
              </Card.Header>

              <Col lg={4} md={6} sm={12} className="d-grid gap-2 py-2">
                <Card.Body>
                  <Row>
                    <Col
                      className="d-flex justify-content-start"
                      lg={6}
                      md={6}
                      sm={6}
                    >
                      <img
                        className="mb-2"
                        src={
                          imageUrl !== ""
                            ? imageUrl
                            : "http://bootdey.com/img/Content/avatar/avatar7.png"
                        }
                        alt="User Image"
                        style={{ height: "7rem", borderRadius: "50%" }}
                      />
                    </Col>
                    <Col
                      className="d-flex justify-content-end"
                      lg={6}
                      md={6}
                      sm={6}
                    >
                      <Form.Group controlId="image 1">
                        <Form.Label>
                          <FaEdit className="me-2 mb-2" />
                          Edit Picture
                        </Form.Label>
                        <Form.Control
                          type="file"
                          id="image-file"
                          label="User Image"
                          custom
                          onChange={uploadUserImageFileHandler}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>

              <Col lg={8} md={6} sm={12}>
                <Card>
                  <Card.Body>
                    <h4>Business Information</h4>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="serviceType">
                          <Form.Label>Service Type</Form.Label>
                          <Form.Control
                            as="select"
                            type="select"
                            placeholder="Select Service Type"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                          >
                            <option value='stays'>Accomodation</option>
                            <option value='transport'>Transport</option>
                            <option value='food'>Food</option>
                            <option value='tours'>Tour Guide</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="businessName">
                          <Form.Label>Business Institute Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Business Institute Name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          >
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col lg={6} md={12} sm={12}>
                        <Form.Group className="mb-3" controlId="licenseNumber">
                          <Form.Label>License Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter License Number"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                          >
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessOwnerDashoard;
