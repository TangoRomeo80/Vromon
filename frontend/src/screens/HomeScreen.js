import React from 'react'
import Navbar from '../components/Navbar'
import LightningDeals from '../components/LightningDeals'
import PopularDestinations from '../components/PopularDestinations'

const HomeScreen = () => {
  return (
    <div>
      <Navbar/>
      <LightningDeals/>
      <PopularDestinations/>
    </div>
  )
}

export default HomeScreen