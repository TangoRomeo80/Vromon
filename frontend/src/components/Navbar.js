import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('id')) {
      axios
        .get(`/api/users/auth/${searchParams.get('id')}`)
        .then((res) => {
          setUser(res.data.data)
          localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        })
    }
  }, [])


  return (
    <>
      <Card>
        <Card.Img variant="top" src="/Nav/test2.jpg" />
        <Card.Body>
          
        </Card.Body>
      </Card>
    </>
  )
}

export default Navbar
