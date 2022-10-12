import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serviceService from './serviceService'

const initialState = {
  services: [],
  service: null,
  isListError: false,
  isListSuccess: false,
  isListLoading: false,
  listErrorMessage: '',
  isDetailsError: false,
  isDetailsSuccess: false,
  isDetailsLoading: false,
  detailsErrorMessage: '',
  isCreateError: false,
  isCreateSuccess: false,
  isCreateLoading: false,
  createErrorMessage: '',
  isUpdateError: false,
  isUpdateSuccess: false,
  isUpdateLoading: false,
  updateErrorMessage: '',
  isDeleteError: false,
  isDeleteSuccess: false,
  isDeleteLoading: false,
  deleteErrorMessage: '',
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
        state.isListLoading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
        state.services = []
      })
      .addCase(getServiceById.pending, (state) => {
        state.isDetailsLoading = true
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.service = action.payload
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
        state.service = null
      })
      .addCase(createService.pending, (state) => {
        state.isCreateLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.services.push(action.payload)
      })
      .addCase(createService.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updateService.pending, (state) => {
        state.isUpdateLoading = true
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        )
        state.service = state.service._id === action.payload._id ? action.payload : state.service
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deleteService.pending, (state) => {
        state.isDeleteLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        )
        state.service = state.service._id === action.payload._id ? null : state.service
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
  },
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer
