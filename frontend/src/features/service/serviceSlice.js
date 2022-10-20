import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serviceService from './serviceService'

const initialState = {
  services: [],
  searchedServices: [],
  service: null,
  isListError: false,
  isListSuccess: false,
  isListLoading: false,
  listErrorMessage: '',
  isSearchedListError: false,
  isSearchedListSuccess: false,
  isSearchedListLoading: false,
  searchedListErrorMessage: '',
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
  async (_, thunkAPI) => {
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

//get all services by searchParams
export const getAllServicesBySearchParams = createAsyncThunk(
  'service/getAllServicesBySearchParams',
  async (searchParams, thunkAPI) => {
    try {
      return await serviceService.getAllServicesBySearchParams(searchParams)
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
    resetServiceList: (state) => {
      state.services = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetSearchedServiceList: (state) => {
      state.searchedServices = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetServiceDetails: (state) => {
      state.service = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => {
        state.isListLoading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.message = ''
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getAllServicesBySearchParams.pending, (state) => {
        state.isSearchedListLoading = true
      })
      .addCase(getAllServicesBySearchParams.fulfilled, (state, action) => {
        state.isSearchedListLoading = false
        state.isSearchedListSuccess = true
        state.isSearchedListError = false
        state.message = ''
        state.searchedServices = action.payload
      })
      .addCase(getAllServicesBySearchParams.rejected, (state, action) => {
        state.isSearchedListLoading = false
        state.isSearchedListError = true
        state.searchedListErrorMessage = action.payload
      })
      .addCase(getServiceById.pending, (state) => {
        state.isDetailsLoading = true
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.service = action.payload
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createService.pending, (state) => {
        state.isCreateLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
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
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        )
        state.service =
          state.service._id === action.payload._id
            ? action.payload
            : state.service
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
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        )
        state.service =
          state.service._id === action.payload._id ? null : state.service
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
  },
})

export const {
  resetServiceList,
  resetSearchedServiceList,
  resetServiceDetails,
} = serviceSlice.actions
export default serviceSlice.reducer
