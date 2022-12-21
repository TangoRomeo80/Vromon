import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const initialState = {
  bookings: [],
  booking: null,
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

//get all bookings
export const getAllBookings = createAsyncThunk(
  'booking/getAllBookings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await bookingService.getAllBookings(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get booking by id
export const getBookingById = createAsyncThunk(
  'booking/getBookingById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await bookingService.getBookingById(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create booking
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await bookingService.createBooking(bookingData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update booking
export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async (data, thunkAPI) => {
    const { id, bookingData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await bookingService.updateBooking(id, bookingData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete booking
export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await bookingService.deleteBooking(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingList: (state) => {
      state.bookings = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetBookingDetails: (state) => {
      state.booking = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
    resetBookingCreate: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetBookingUpdate: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetBookingDelete: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.bookings = action.payload
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getBookingById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.booking = action.payload
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createBooking.pending, (state) => {
        state.isCreateLoading = true
        state.isCreateError = false
        state.isCreateSuccess = false
        state.createErrorMessage = ''
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
        state.bookings.push(action.payload)
        state.booking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updateBooking.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateError = false
        state.isUpdateSuccess = false
        state.updateErrorMessage = ''
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        )
        state.booking = action.payload
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deleteBooking.pending, (state) => {
        state.isDeleteLoading = true
        state.isDeleteError = false
        state.isDeleteSuccess = false
        state.deleteErrorMessage = ''
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload._id
        )
        state.booking =
          state.booking._id === action.payload._id ? null : state.booking
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
  },
})

export const {
  resetBookingList,
  resetBookingDetails,
  resetBookingCreate,
  resetBookingUpdate,
  resetBookingDelete,
} = bookingSlice.actions
export default bookingSlice.reducer
