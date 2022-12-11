import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import destinationService from './destinationService'

const initialState = {
  destinations: [],
  destination: null,
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
  isReviewError: false,
  isReviewSuccess: false,
  isReviewLoading: false,
  reviewErrorMessage: '',
}

//get all destinations
export const getAllDestinations = createAsyncThunk(
  'destination/getAllDestinations',
  async (_, thunkAPI) => {
    try {
      return await destinationService.getAllDestinations()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get top destinations
export const getTopDestinations = createAsyncThunk(
  'destination/getTopDestinations',
  async (_, thunkAPI) => {
    try {
      return await destinationService.getTopDestinations()
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get destination by id
export const getDestinationById = createAsyncThunk(
  'destination/getDestinationById',
  async (id, thunkAPI) => {
    try {
      return await destinationService.getDestinationById(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create destination
export const createDestination = createAsyncThunk(
  'destination/createDestination',
  async (destinationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await destinationService.createDestination(destinationData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update destination
export const updateDestination = createAsyncThunk(
  'destination/updateDestination',
  async (data, thunkAPI) => {
    const { id, destinationData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await destinationService.updateDestination(
        id,
        destinationData,
        token
      )
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete destination
export const deleteDestination = createAsyncThunk(
  'destination/deleteDestination',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await destinationService.deleteDestination(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Add destination review
export const addDestinationReview = createAsyncThunk(
  'destination/addDestinationReview',
  async (data, thunkAPI) => {
    const { id, reviewData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await destinationService.addDestinationReview(
        id,
        reviewData,
        token
      )
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    resetDestinationList: (state) => {
      state.destinations = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetDestinationDetails: (state) => {
      state.destination = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
    resetDestinationReview: (state) => {
      state.isReviewError = false
      state.isReviewSuccess = false
      state.isReviewLoading = false
      state.reviewErrorMessage = ''
    },
    resetDestinationCreate: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetDestinationUpdate: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetDestinationDelete: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDestinations.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllDestinations.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.destinations = action.payload
      })
      .addCase(getAllDestinations.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getTopDestinations.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getTopDestinations.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.destinations = action.payload
      })
      .addCase(getTopDestinations.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getDestinationById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getDestinationById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.destination = action.payload
      })
      .addCase(getDestinationById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createDestination.pending, (state) => {
        state.isCreateLoading = true
        state.isCreateError = false
        state.isCreateSuccess = false
        state.createErrorMessage = ''
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
        state.destinations.push(action.payload)
        state.destination = action.payload
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updateDestination.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateError = false
        state.isUpdateSuccess = false
        state.updateErrorMessage = ''
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.destinations = state.destinations.map((destination) =>
          destination._id === action.payload._id ? action.payload : destination
        )
        state.destination =
          state.destination._id === action.payload._id
            ? action.payload
            : state.destination
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deleteDestination.pending, (state) => {
        state.isDeleteLoading = true
        state.isDeleteError = false
        state.isDeleteSuccess = false
        state.deleteErrorMessage = ''
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.destinations = state.destinations.filter(
          (destination) => destination._id !== action.payload._id
        )
        state.destination =
          state.destination._id === action.payload._id
            ? null
            : state.destination
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
      .addCase(addDestinationReview.pending, (state) => {
        state.isReviewLoading = true
        state.isReviewError = false
        state.isReviewSuccess = false
        state.reviewErrorMessage = ''
      })
      .addCase(addDestinationReview.fulfilled, (state, action) => {
        state.isReviewLoading = false
        state.isReviewSuccess = true
        state.isReviewError = false
        state.reviewErrorMessage = ''
        state.destinations = state.destinations.map((destination) =>
          destination._id === action.payload._id ? action.payload : destination
        )
        state.destination =
          state.destination._id === action.payload._id
            ? action.payload
            : state.destination
      })
      .addCase(addDestinationReview.rejected, (state, action) => {
        state.isReviewLoading = false
        state.isReviewError = true
        state.reviewErrorMessage = action.payload
      })
  },
})

export const {
  resetDestinationList,
  resetDestinationDetails,
  resetDestinationReview,
  resetDestinationCreate,
  resetDestinationUpdate,
  resetDestinationDelete,
} = destinationSlice.actions
export default destinationSlice.reducer
