import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  services: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer
