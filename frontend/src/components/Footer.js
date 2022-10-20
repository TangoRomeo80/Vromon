import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container fluid className='bg-light'>
        <Row>
          <Col className='d-flex justify-content-center text-dark py-2'>
            Copyright &copy; 2022, Vromon. All Rights Resereved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
