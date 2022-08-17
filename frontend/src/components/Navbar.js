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
        .get(`http://localhost:5000/api/users/auth/${searchParams.get('id')}`)
        .then((res) => {
          setUser(res.data.data)
        })
    }
  }, [])

  console.log(user)

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
