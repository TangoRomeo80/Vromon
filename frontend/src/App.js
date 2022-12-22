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
import AdminDashboard from './screens/AdminDashboard'
import AdminUserListScreen from './screens/AdminUserListScreen'
import AdminServiceListScreen from './screens/AdminServiceListScreen'
import AdminDestinationListScreen from './screens/AdminDestinationListScreen'
import DestinationCreateScreen from './screens/DestinationCreateScreen'
import StaysSearchByDestinationScreen from './screens/StaysSearchByDestinationScreen'
import TourSearchByDestinationScreen from './screens/TourSearchByDestinationScreen'
import BusinessListScreen from './screens/BusinessListScreen'
import BusinessPaymentScreen from './screens/BusinessPaymentScreen'
import StaysBookingScreen from './screens/StaysBookingScreen'
import ToursBookingScreen from './screens/ToursBookingScreen'
import TransportBookingScreen from './screens/TransportBookingScreen'
import TransportDetailBusiness from './screens/TransportDetailBusiness'
import TransportDetailsTourist from './screens/TransportDetailsTourist'
import StayDetailsBusiness from './screens/StayDetailsBusiness'
import StayDetailsTourist from './screens/StayDetailsTourist'
import TourDetailsTourist from './screens/TourDetailsTourist'
import TourDetailsBusiness from './screens/TourDetailsBusiness'
import ServiceDetailsBusinessScreen from './screens/ServiceDetailsBusinessScreen'
import BookingDetailsTouristScreen from './screens/BookingDetailsTouristScreen'
import BookingDetailsBusinessScreen from './screens/BookingDetailsBusinessScreen'
import BusinessDetailsScreen from './screens/BusinessDetailsScreen'
import ServiceCreateScreen from './screens/ServiceCreateScreen'
import BusinessCreateScreen from './screens/BusinessCreateScreen'
import AdminBookingListScreen from './screens/AdminBookingListScreen'

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
              <Route
                path='/adminBookingList'
                element={<AdminBookingListScreen />}
              />
              <Route path='/serviceList' element={<ServiceListScreen />} />
              <Route path='/businessList' element={<BusinessListScreen />} />
              <Route
                path='/businessPayments'
                element={<BusinessPaymentScreen />}
              />
              <Route
                path='/bookingRequestList'
                element={<BookingRequestsScreen />}
              />
              <Route path='/test' element={<TestScreen />} />
              <Route path='/*' element={<ErrorScreen />} />

              <Route path='/testNav' element={<TestNavbar />} />

              {/* Booking Requests */}
              <Route
                path='/staysBooking/:id'
                element={<StaysBookingScreen />}
              />
              <Route
                path='/toursBooking/:id'
                element={<ToursBookingScreen />}
              />
              <Route
                path='/transportBooking/:id'
                element={<TransportBookingScreen />}
              />

              {/* Details Page */}
              <Route
                path='/transportDetailsBusiness/:id'
                element={<TransportDetailBusiness />}
              />
              <Route
                path='/transportDetailsTourist/:id'
                element={<TransportDetailsTourist />}
              />
              <Route
                path='/staysDetailsBusiness/:id'
                element={<StayDetailsBusiness />}
              />
              <Route
                path='/staysDetailsTourist/:id'
                element={<StayDetailsTourist />}
              />
              <Route
                path='/destinationDetails/:id'
                element={<DestinationDetailsScreen />}
              />
              <Route
                path='/tourDetailsTourist/:id'
                element={<TourDetailsTourist />}
              />
              <Route
                path='/tourDetailsBusiness/:id'
                element={<TourDetailsBusiness />}
              />

              <Route
                path='/bookingDetailsBusiness/:id'
                element={<BookingDetailsBusinessScreen />}
              />

              <Route
                path='/bookingDetailsTourist/:id'
                element={<BookingDetailsTouristScreen />}
              />

              <Route
                path='/businessDetails/:id'
                element={<BusinessDetailsScreen />}
              />

              <Route
                path='/serviceDetailsBusiness/:id'
                element={<ServiceDetailsBusinessScreen />}
              />

              <Route path='/serviceCreate' element={<ServiceCreateScreen />} />
              <Route
                path='/businessCreate'
                element={<BusinessCreateScreen />}
              />
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
