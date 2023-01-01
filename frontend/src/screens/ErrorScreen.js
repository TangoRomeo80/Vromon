import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ErrorScreen = () => {
  return (
    <Container>
      <Row>
        <Col className='d-flex justify-content-center align-items-center'>
          <h1>Not Found</h1>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center align-items-center'>
          <p>Sorry, the page you are looking for could not be found.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorScreen
