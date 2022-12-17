import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import Message from './Message'

const StatCard = ({
  linkTo,
  data,
  description,
  bgColor,
  width,
  loading,
  error,
  imgSrc,
}) => {
  return (
    <Card
      className='my-3 p-3 rounded'
      bg={bgColor}
      style={{ width: `${width}rem` }}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <LinkContainer to={linkTo}>
          <CardGroup>
            <Card
              bg={bgColor}
              className='text-center'
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Card.Text>{description}</Card.Text>
                <Card.Title>{data}</Card.Title>
              </Card.Body>
            </Card>
            <Card
              bg={bgColor}
              className='text-center'
              style={{ border: 'none' }}
            >
              <Card.Body>
                <Card.Img
                  variant='top'
                  src={imgSrc}
                  style={{ height: '4rem', width: '4rem' }}
                ></Card.Img>
              </Card.Body>
            </Card>
          </CardGroup>
        </LinkContainer>
      )}
    </Card>
  )
}

export default StatCard
