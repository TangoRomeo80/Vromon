import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import TransportScreen from './screens/TransportScreen'
import DestinationScreen from './screens/DestinationScreen'
import HolidayPackagesScreen from './screens/HolidayPackagesScreen'
import UserInfoScreen from './screens/UserInfoScreen' 


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid className='px-0'>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route exact path='/login' element={<LoginScreen />} />
            <Route exact path='/transports' element={<TransportScreen/>}/>
            <Route exact path='/destinations' element={<DestinationScreen/>}/>
            <Route exact path='/packages' element={<HolidayPackagesScreen/>}/>
            <Route exact path='/userInfo' element={<UserInfoScreen/>}/>
          </Routes>
          <Routes></Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
