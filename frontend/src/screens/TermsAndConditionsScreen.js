import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

const TermsAndConditionsScreen = () => {
  return (
    <Container>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <h1>Terms and Conditions</h1>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of the Website of the travel aggregation platform "Vromon".
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <p>
            By accessing this website we assume you accept these terms and
            conditions in full. Do not continue to use Vromons's website if you
            do not accept all of the terms and conditions stated on this page.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <p>
            Please read the following terms and conditions before using this
            website:
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <ol>
            <li>
              Booking and Payment: All bookings made through our website are
              subject to availability of the service providers and must be
              confirmed by the business owner before the reservation is final.
              Payment must be made in full at the time of booking, if cash is
              not used. For cash payments, 30% of the total payment needs to be
              paid as booking money. We reserve the right to cancel any booking
              that has not been paid in accordance with the aforementioned
              policy.
            </li>
            <li>
              Changes and Cancellations: You may request to change or cancel
              your booking through the website or by contacting us over phone.
              Any changes or cancellations are subject to the terms and
              conditions of the individual service provider and may result in
              additional fees.
            </li>
            <li>
              Responsibility: We are not responsible for any injuries, losses,
              or damages that may occur during your travel. It is your
              responsibility to ensure that you have proper travel insurance and
              to follow all safety guidelines provided by the service provider.
            </li>
            <li>
              Disclaimer: We do not endorse or guarantee the accuracy of any
              information provided on our website. We provide the informatoin as
              provided by the service providers. It is your responsibility to
              verify all information with the service provider before booking.
            </li>
            <li>
              Intellectual Property: All content on our website, including text,
              images, and logos, is the property of our company and is protected
              by copyright laws. You may not use any of this content without our
              written permission.
            </li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <p>Followings are the refund policies for the customers</p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <ol>
            <li>
              <p>
                Cancellations made more than 30 days prior to the service
                availing date will receive a full refund.
              </p>
            </li>
            <li>
              <p>
                Cancellations made between 8 and 30 days prior to the service
                availing date will receive a 50% refund.
              </p>
            </li>
            <li>
              <p>
                Cancellations made 7 days or less prior to the service availing
                date are not eligible for a refund.
              </p>
            </li>
            <li>
              <p>
                No-shows on the day of the service will not be eligible for a
                refund.
              </p>
            </li>
            <li>
              <p>
                If the service provicder needs to cancel the service for any
                reason, customers will receive a full refund.
              </p>
            </li>
            <li>
              <p>
                In the event of unforeseen circumstances, such as inclement
                weather or natural disasters, the service provider reserves the
                right to alter the itinerary or provide a partial refund at
                their discretion.
              </p>
            </li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex jusify-content-center align-items-center'>
          <p>
            By using our website, you agree to these terms and conditions. If
            you do not agree, please do not use our website. We reserve the
            right to update or modify these terms and conditions at any time
            without prior notice.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default TermsAndConditionsScreen
