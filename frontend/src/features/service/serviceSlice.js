import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serviceService from './serviceService'

const initialState = {
  services: [],
  transports: [],
  accomodations: [],
  tours: [],
  service: null,
  transport: null,
  accomodation: null,
  tour: null,
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

//get top services
export const getTopServices = createAsyncThunk(
  'services/getTopServices',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getTopServices()
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
  async (data, thunkAPI) => {
    const { id, serviceData } = data
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

//get all transports
export const getAllTransports = createAsyncThunk(
  'services/getAllTransports',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getAllTransports()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get all accomodations
export const getAllAcomodations = createAsyncThunk(
  'services/getAllAcomodations',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getAllAcomodations()
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
      state.transports = []
      state.accomodations = []
      state.tours = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetServiceDetails: (state) => {
      state.service = null
      state.transport = null
      state.accomodation = null
      state.tour = null
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
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getTopServices.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getTopServices.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.services = action.payload
      })
      .addCase(getTopServices.rejected, (state, action) => {
        state.isListLoading = false
        state.listErrorMessage = true
        state.listErrorMessage = action.payload
      })
      .addCase(getServiceById.pending, (state) => {
        state.isDetailsLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
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
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
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
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
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
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
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

      .addCase(getAllTransports.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllTransports.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.transports = action.payload
      })
      .addCase(getAllTransports.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getAllAcomodations.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllAcomodations.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.accomodations = action.payload
      })
      .addCase(getAllAcomodations.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
  },
})

export const { resetServiceList, resetServiceDetails } = serviceSlice.actions
export default serviceSlice.reducer
