import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewUserScreen from './screens/NewUserScreen'
import ProfileScreen from './screens/ProfileScreen'
import TourSearchScreen from './screens/TourSearchScreen'
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
import ServiceListScreen from './screens/ServiceListScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import BusinessOwnerDashoard from './screens/BusinessOwnerDashoard'
import BookingRequestsScreen from './screens/BookingRequestsScreen'
import BusinessOwnerAnalyticsScreen from './screens/BusinessOwnerAnalyticsScreen'
import AdminDashboard from './screens/AdminDashboard'
import AdminUserListScreen from './screens/AdminUserListScreen'
import AdminServiceListScreen from './screens/AdminServiceListScreen'
import AdminDestinationListScreen from './screens/AdminDestinationListScreen'
import DestinationCreateScreen from './screens/DestinationCreateScreen'
import TransportSearchByDestinationScreen from './screens/TransportSearchByDestinationScreen'
import StaysSearchByDestinationScreen from './screens/StaysSearchByDestinationScreen'
import TourSearchByDestinationScreen from './screens/TourSearchByDestinationScreen'
import BusinessListScreen from './screens/BusinessListScreen'
import BusinessPaymentScreen from './screens/BusinessPaymentScreen'
import StaysBookingScreen from './screens/StaysBookingScreen'
import ToursBookingScreen from './screens/ToursBookingScreen'

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
              <Route
                path='/forgotPassword/:token'
                element={<ForgotPasswordScreen />}
              />
              <Route path='/newUser' element={<NewUserScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/tourSearch' element={<TourSearchScreen />} />
              <Route path='/myBookings' element={<TouristBookingScreen />} />
              <Route
                path='/destinationDetails/:id'
                element={<DestinationDetailsScreen />}
              />
              <Route path='/businessDash' element={<BusinessOwnerDashoard />} />
              <Route
                path='/destinationSearch'
                element={<DestinationSearchScreen />}
              />
              <Route
                path='/destinationCreate'
                element={<DestinationCreateScreen />}
              />
              <Route path='/staysSearch' element={<StaysSearchScreen />} />
              <Route
                path='/transportSearch'
                element={<TransportSearchScreen />}
              />
              <Route
                path='/transportByDestination'
                element={<TransportSearchByDestinationScreen />}
              />
              <Route
                path='/staysByDestination'
                element={<StaysSearchByDestinationScreen />}
              />
              <Route
                path='/tourByDestination'
                element={<TourSearchByDestinationScreen />}
              />
              <Route
                path='/businessOwnerInfo'
                element={<BusinessOwnerInfoScreen />}
              />
              <Route
                path='/businessOwnerAnalytics'
                element={<BusinessOwnerAnalyticsScreen />}
              />
              <Route path='/adminDash' element={<AdminDashboard />} />
              <Route path='/adminUserList' element={<AdminUserListScreen />} />
              <Route
                path='/adminServiceList'
                element={<AdminServiceListScreen />}
              />
              <Route
                path='/adminDestinationList'
                element={<AdminDestinationListScreen />}
              />
              <Route path='/serviceList' element={<ServiceListScreen />} />
              <Route path='/businessList' element={<BusinessListScreen />} />
              <Route path='/businessPayments' element={<BusinessPaymentScreen />} />
              <Route
                path='/bookingRequestList'
                element={<BookingRequestsScreen />}
              />
              <Route path='/test' element={<TestScreen />} />
              <Route path='/*' element={<ErrorScreen />} />

              <Route path='/testNav' element={<TestNavbar />} />


              {/* Booking Requests */}
              <Route path='/staysBooking' element={<StaysBookingScreen />} />
              <Route path='/toursBooking' element={<ToursBookingScreen />} />

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
