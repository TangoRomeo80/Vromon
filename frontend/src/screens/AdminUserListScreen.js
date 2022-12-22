import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, resetUserList } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaPlus } from 'react-icons/fa'

const AdminUserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const {
    users,
    isListLoading: isUserListLoading,
    isListSuccess: isUserListSuccess,
    isListError: isUserListError,
    listErrorMessage: userListErrorMessage,
  } = useSelector((state) => state.user)

  const [userNameSearch, setUserNameSearch] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (userInfo.userType !== 'admin') {
      navigate('/')
    }
  }, [userInfo, navigate])

  useEffect(() => {
    if (isUserListError) {
      toast.error(userListErrorMessage, { position: 'top-center' })
    } else if (!isUserListSuccess) {
      dispatch(getAllUsers())
    }
  }, [
    isUserListError,
    userListErrorMessage,
    isUserListSuccess,
    users,
    userInfo,
    dispatch,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetUserList())
    }
  }, [dispatch])

  return (
    <Container className='pt-3'>
      {isUserListLoading ? (
        <Loader />
      ) : isUserListError ? (
        <Message variant='danger'>{userListErrorMessage}</Message>
      ) : (
        <>
          <Row className='pb-2'>
            <Card.Text as='h2' className='font-weight-bolder text-center'>
              Users
            </Card.Text>
          </Row>
          <Row className='pb-2'>
            <Col sm={4} md={2} lg={2}>
              <Link className='btn btn-primary my-3' to='/adminDash'>
                Back to Dashboard
              </Link>
            </Col>
            <Col sm={4} md={2} lg={2}>
              <Link className='btn btn-success my-3' to='/adminUserCreate'>
                <FaPlus />
                Create New User
              </Link>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={12} md={4} lg={4}>
              <Form.Control
                shadow
                type='text'
                name='userNameSearch'
                onChange={(e) => setUserNameSearch(e.target.value)}
                placeholder='Search User by UserName...'
              ></Form.Control>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col sm={12} md={12} lg={12}>
              <Card>
                <Card.Header
                  as='h5'
                  className='d-flex justify-content-center mb-3'
                >
                  Destinaitons
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>User Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((user) =>
                          user.userName
                            .toLowerCase()
                            .includes(userNameSearch.toLowerCase())
                        )
                        .map((user) => (
                          <LinkContainer to={`/adminUserDetail/${user._id}`}>
                            <tr key={user._id}>
                              <td>{user.userName}</td>
                              <td>{user.email}</td>
                              <td>{user.mobile}</td>
                              <td>{user.userType}</td>
                            </tr>
                          </LinkContainer>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default AdminUserListScreen
