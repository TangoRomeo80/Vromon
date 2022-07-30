import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const HomeScreen = () => {
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

  return (
    <div className='h-25 d-inline-block w-100'>
      <h1>HomeScreen</h1>
      {user && <p>{user.userName}</p>}
    </div>
  )
}

export default HomeScreen
