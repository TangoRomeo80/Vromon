import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import FormContainer from "../components/FormContainer";
import { signinLocal, resetAuth } from "../features/auth/authSlice";

const RegistrationScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signinLocal({ email, password }))
  }

  const passwordShow = (e) => {
    e.target.checked ? setShowPassword("text") : setShowPassword("password");
  };

  const handleGoogle = () => {
    console.log("hello");
    window.open("http://localhost:5000/api/users/signin/google", "_self");
  };

  return (
    <FormContainer>
      <h1 className="d-flex justify-content-center pt-1">Registration</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Please a Valid Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Mobile Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type={showPassword}
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showPassword}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="showPassword">
          <Form.Check
            type="checkbox"
            label="Show password"
            onChange={(e) => passwordShow(e)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Register
          </Button>
        </div>
      </Form>

      {/* <Row>
        <h6 className="d-flex justify-content-center pt-5">OR</h6>
        <Col className="d-grid gap-2" sm={12} md={12} lg={12}>
          <Button
            variant="outline-danger"
            align="end"
            size="lg"
            onClick={handleGoogle}
          >
            <FcGoogle /> Sign in with Google
          </Button>
        </Col>
      </Row> */}

      <Row>
        <div className="d-flex justify-content-center py-3 mt-3 ">
          <p>
            New User?
            <a href="#">
              <b>Sign Up</b>
            </a>
          </p>
        </div>
      </Row>

      <Row className="py-1 mt-2">
        <Col>
          <Link to="/">
            <Button variant="primary" size="md">
              Back to Home page
            </Button>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegistrationScreen;
