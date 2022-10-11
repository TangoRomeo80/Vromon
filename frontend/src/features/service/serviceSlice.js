import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serviceService from './serviceService'

const initialState = {
  services: [],
  service: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//get all services
export const getAllServices = createAsyncThunk(
  'service/getAllServices',
  async (thunkAPI) => {
    try {
      return await serviceService.getAllServices()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get service by id
export const getServiceById = createAsyncThunk(
  'service/getServiceById',
  async (id, thunkAPI) => {
    try {
      return await serviceService.getServiceById(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create service
export const createService = createAsyncThunk(
  'service/createService',
  async (serviceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await serviceService.createService(serviceData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update service
export const updateService = createAsyncThunk(
  'service/updateService',
  async (id, serviceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await serviceService.updateService(id, serviceData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete service
export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await serviceService.deleteService(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.services = []
      })
      .addCase(getServiceById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.service = action.payload
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.service = {}
      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.services.push(action.payload)
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        )
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        )
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer
