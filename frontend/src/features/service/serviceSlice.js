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

//get transport by id
export const getTransportById = createAsyncThunk(
  'service/getTransportById',
  async (id, thunkAPI) => {
    try {
      return await serviceService.getTransportById(id)
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
export const getAllAccomodations = createAsyncThunk(
  'services/getAllAccomodations',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getAllAccomodations()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get accomodation by id
export const getAccomodationById = createAsyncThunk(
  'service/getAccomodationById',
  async (id, thunkAPI) => {
    try {
      return await serviceService.getAccomodationById(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get all tours
export const getAllTours = createAsyncThunk(
  'services/getAllTours',
  async (_, thunkAPI) => {
    try {
      return await serviceService.getAllTours()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get tour by id
export const getTourById = createAsyncThunk(
  'service/getTourById',
  async (id, thunkAPI) => {
    try {
      return await serviceService.getTourById(id)
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
    resetServiceCreate: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetServiceUpdate: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetServiceDelete: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
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
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
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
        state.isCreateError = false
        state.isCreateSuccess = false
        state.createErrorMessage = ''
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
        state.isUpdateError = false
        state.isUpdateSuccess = false
        state.updateErrorMessage = ''
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
        state.isDeleteError = false
        state.isDeleteSuccess = false
        state.deleteErrorMessage = ''
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
      .addCase(getTransportById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getTransportById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.transport = action.payload
      })
      .addCase(getTransportById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(getAllAccomodations.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllAccomodations.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.accomodations = action.payload
      })
      .addCase(getAllAccomodations.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getAccomodationById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getAccomodationById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.accomodation = action.payload
      })
      .addCase(getAccomodationById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(getAllTours.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.tours = action.payload
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getTourById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getTourById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.tour = action.payload
      })
      .addCase(getTourById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
  },
})

export const {
  resetServiceList,
  resetServiceDetails,
  resetServiceCreate,
  resetServiceDelete,
  resetServiceUpdate,
} = serviceSlice.actions
export default serviceSlice.reducer
