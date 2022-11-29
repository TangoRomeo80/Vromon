import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {
  addDestinationReview,
  resetDestinationReview,
} from '../features/destination/destinationSlice'

const AddDestinationReview = ({ reset, id }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    isReviewError,
    isReviewSuccess,
    isReviewLoading,
    reviewErrorMessage,
  } = useSelector((state) => state.destination)

  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    if (userInfo) {
      setShow(true)
    } else {
      toast.error('Please login to add review', { position: 'top-center' })
    }
  }

  const submitHandler = () => {
    if (rating === 0 || description === '') {
      toast.error('Please Fill up all the fields', { position: 'top-center' })
    } else {
      dispatch(
        addDestinationReview({
          id,
          reviewData: { user: userInfo._id, rating, description },
        })
      )
    }
  }

  useEffect(() => {
    if (isReviewError) {
      toast.error(reviewErrorMessage, { position: 'top-center' })
    } else if (isReviewSuccess) {
      reset()
      handleClose()
      toast.success('Review added successfully', { position: 'top-center' })
    }
  }, [isReviewError, isReviewSuccess, reviewErrorMessage])

  useEffect(() => {
    return () => {
      dispatch(resetDestinationReview())
    }
  }, [dispatch])

  return (
    <>
      <Button
        className='me-1'
        style={{ backgroundColor: 'indigo' }}
        onClick={handleShow}
      >
        Write a Review
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as='select'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value=''>Select Rating...</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                row='3'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={submitHandler}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddDestinationReview
