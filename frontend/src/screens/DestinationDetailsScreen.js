import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Col, Container, Card, Form } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import Carousel from 'react-bootstrap/Carousel'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDestinationById,
  resetDestinationDetails,
} from '../features/destination/destinationSlice'

const DestinationDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const [destinationDetails, setDestinationDetails] = useState()

  const {
    destination,
    isDetailsLoading,
    isDetailsError,
    isDetailsSuccess,
    detailsErrorMessage,
  } = useSelector((state) => state.destination)

  useEffect(() => {
    if (isDetailsError) {
      toast.error(detailsErrorMessage, { position: 'top-center' })
    }
    if (isDetailsSuccess) {
      setDestinationDetails(destination)
    } else {
      dispatch(getDestinationById(params.id)) //id
    }
  }, [
    dispatch,
    destination,
    isDetailsSuccess,
    isDetailsError,
    detailsErrorMessage,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationDetails())
    }
  }, [dispatch])

  return (
    <>
      {isDetailsLoading ? (
        <Loader />
      ) : (
        destination && (
          <div>
            <Container className='py-3'>
              <Row className='my-2'>
                <h3 className='text-center'>Explore {destination.name}</h3>
              </Row>
              <Row className='my-2'>
                <Col md={12} sm={12} lg={12}>
                  <Card className='mb-2'>
                    <Card.Img
                      cascade
                      className='img-fluid'
                      src={destination.coverImg}
                      style={{ maxHeight: '40vh', objectFit: 'cover' }}
                    />
                  </Card>
                </Col>
              </Row>
              <Row className='pt-3'>
                <Col lg={6} sm={12} md={6}>
                  <Carousel>
                    {destination.images.map((image, index) => (
                      <Carousel.Item>
                        <img
                          className='d-block w-100'
                          src={image}
                          alt={`Image-${index}`}
                          style={{ maxHeight: '40vh', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>

                <Col lg={6} sm={12} md={6}>
                  <Card style={{height: '40vh'}}>
                    <iframe src={destination.mapEmbed} width="100%" height="100%"></iframe>
                  </Card>
                </Col>
              </Row>
              <Row className='pt-3'>
                <Card>
                  <Card.Header as='h3' className='text-center'>
                    About This Place
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum
                      comes from sections 1.10.32 and 1.10.33 of "de Finibus
                      Bonorum et Malorum" (The Extremes of Good and Evil) by
                      Cicero, written in 45 BC. This book is a treatise on the
                      theory of ethics, very popular during the Renaissance. The
                      first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                      comes from a line in section 1.10.32.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </div>
        )
      )}
    </>
  )
}

export default DestinationDetails
