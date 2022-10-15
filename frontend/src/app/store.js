import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from '../features/service/serviceSlice'
import authReducer from '../features/auth/authSlice'
import businessReducer from '../features/business/businessSlice'
import userReducer from '../features/user/userSlice'
import destinationReducer from '../features/destination/destinationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    business: businessReducer,
    destination: destinationReducer,
  },
})
