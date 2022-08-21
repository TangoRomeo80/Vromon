import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container fluid className='bg-dark'>
        <Row>
          <Col className='d-flex justify-content-center text-light py-2'>
            Copyright &copy; 2022, Vromon. All Rights Resereved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
