import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { getAuthedUser, reset } from '../features/auth/authSlice'

const Navbar = () => {
  const [searchParams] = useSearchParams()

  const { userInfo, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (searchParams.get('id')) {
      if (!isSuccess || !userInfo) {
        dispatch(getAuthedUser(searchParams.get('id')))
      }
      if (isError) {
        alert(message)
      }
      dispatch(reset())
    }
  }, [searchParams, userInfo, isError, isSuccess, message, dispatch])

  return (
    <>
      <Card>
        <Card.Img variant='top' src='/Nav/test2.jpg' />
        <Card.Body></Card.Body>
      </Card>
    </>
  )
}

export default Navbar
