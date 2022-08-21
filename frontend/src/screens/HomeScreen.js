import React from 'react'
import Navbar from '../components/Navbar'
import LightningDeals from '../components/LightningDeals'
import PopularDestinations from '../components/PopularDestinations'
import TopAirlines from '../components/TopAirlines'

const HomeScreen = () => {
  return (
    <div>
      <Navbar/>
      <LightningDeals/>
      <PopularDestinations/>
      <TopAirlines/>
    </div>
  )
}

export default HomeScreen