import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewUserScreen from './screens/NewUserScreen'
import TransportScreen from './screens/TransportScreen'
import DestinationScreen from './screens/DestinationScreen'
import HolidayPackagesScreen from './screens/HolidayPackagesScreen'
import ProfileScreen from './screens/ProfileScreen'
import GuidedTourSearchScreen from './screens/GuidedTourSearchScreen'
import BusinessOwnerInfoScreen from './screens/BusinessOwnerInfoScreen'
import ErrorScreen from './screens/ErrorScreen'
import TestScreen from './screens/TestScreen'
import TestNavbar from './screens/TestNavbar'
import DestinationSearchScreen from './screens/DestinationSearchScreen'
import DestinationDetailsScreen from './screens/DestinationDetailsScreen'
import StaysSearchScreen from './screens/StaysSearchScreen'
import TransportSearchScreen from './screens/TransportSearchScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import TouristBookingScreen from './screens/TouristBookingScreen'
import BusinessListScreen from './screens/BusinessListScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import BusinessOwnerDashoard from './screens/BusinessOwnerDashoard'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='mt-6'>
          <Container fluid className='px-0'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/registration' element={<RegistrationScreen />} />
              <Route path='/forgotPassword/:token' element={<ForgotPasswordScreen />} />
              <Route path='/newUser' element={<NewUserScreen />} />
              <Route path='/transports' element={<TransportScreen />} />
              <Route path='/destinations' element={<DestinationScreen />} />
              <Route path='/packages' element={<HolidayPackagesScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/tourSearch' element={<GuidedTourSearchScreen />} />
              <Route path='/myBookings' element={<TouristBookingScreen />}/>
              <Route path='/businessDash' element={<BusinessOwnerDashoard/>}/>
              <Route path='/destinationDetails' element={<DestinationDetailsScreen />} />
              <Route
                path='/destinationSearch'
                element={<DestinationSearchScreen />}
              />
              <Route path='/staysSearch' element={<StaysSearchScreen />} />
              <Route
                path='/transportSearch'
                element={<TransportSearchScreen />}
              />
              <Route
                path='/businessOwnerInfo'
                element={<BusinessOwnerInfoScreen />}
              />
              <Route path='/businessList' element={<BusinessListScreen />}/>
              <Route path='/test' element={<TestScreen />} />
              <Route path='/*' element={<ErrorScreen />} />

              <Route path='/testNav' element={<TestNavbar />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
