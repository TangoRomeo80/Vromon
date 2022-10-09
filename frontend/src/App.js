import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import TransportScreen from './screens/TransportScreen'
import DestinationScreen from './screens/DestinationScreen'
import HolidayPackagesScreen from './screens/HolidayPackagesScreen'
import TouristInfoScreen from './screens/TouristInfoScreen' 
import GuidedTourSearchScreen from './screens/GuidedTourSearchScreen'
import BusinessOwnerInfoScreen from './screens/BusinessOwnerInfoScreen'
import ErrorScreen from './screens/ErrorScreen'


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid className='px-0'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/transports' element={<TransportScreen/>}/>
            <Route path='/destinations' element={<DestinationScreen/>}/>
            <Route path='/packages' element={<HolidayPackagesScreen/>}/>
            <Route path='/touristInfo' element={<TouristInfoScreen/>}/>
            <Route path='/tourSearch' element={<GuidedTourSearchScreen/>}/>
            <Route path='/businessOwnerInfo' element={<BusinessOwnerInfoScreen />} />
            <Route path='/*' element={<ErrorScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
