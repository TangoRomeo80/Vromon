import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from '../features/service/serviceSlice'
import authReducer from '../features/auth/authSlice'
import businessReducer from '../features/business/businessSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
    business: businessReducer,
    user: userReducer,
  },
})
