import React from 'react'
import Navbar from '../components/Navbar'
import LightningDeals from '../components/LightningDeals'
import PopularDestinations from '../components/PopularDestinations'
import TopAirlines from '../components/TopAirlines'
import Quicklinks from '../components/Quicklinks'

const HomeScreen = () => {
  return (
    <div>
      <Navbar/>
      <LightningDeals/>
      <PopularDestinations/>
      <TopAirlines/>
      <Quicklinks/>
    </div>
  )
}

export default HomeScreen