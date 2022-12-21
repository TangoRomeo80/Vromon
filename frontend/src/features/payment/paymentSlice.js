import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paymenntService from './paymentService'

const initialState = {
  payments: [],
  payment: null,
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

//get all payments
export const getAllPayments = createAsyncThunk(
  'payment/getAllPayments',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await paymenntService.getAllPayments(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get payment by id
export const getPaymentById = createAsyncThunk(
  'payment/getPaymentById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await paymenntService.getPaymentById(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create payment
export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await paymenntService.createPayment(paymentData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update payment
export const updatePayment = createAsyncThunk(
  'payment/updatePayment',
  async (data, thunkAPI) => {
    const { id, paymentData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await paymenntService.updatePayment(id, paymentData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete payment
export const deletePayment = createAsyncThunk(
  'payment/deletePayment',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await paymenntService.deletePayment(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentList: (state) => {
      state.payments = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetPaymentDetails: (state) => {
      state.payment = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
    resetPaymentCreate: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetPaymentUpdate: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetPaymentDelete: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayments.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.payments = action.payload
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getPaymentById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.payment = action.payload
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createPayment.pending, (state) => {
        state.isCreateLoading = true
        state.isCreateSuccess = false
        state.isCreateError = false
        state.createErrorMessage = ''
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
        state.payments.push(action.payload)
        state.payment = action.payload
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updatePayment.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateSuccess = false
        state.isUpdateError = false
        state.updateErrorMessage = ''
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.payments = state.payments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        )
        state.payment = action.payload
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deletePayment.pending, (state) => {
        state.isDeleteLoading = true
        state.isDeleteSuccess = false
        state.isDeleteError = false
        state.deleteErrorMessage = ''
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload._id
        )
        state.payment =
          state.payment._id === action.payload._id ? null : state.payment
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
  },
})

export const {
  resetPaymentList,
  resetPaymentDetails,
  resetPaymentCreate,
  resetPaymentUpdate,
  resetPaymentDelete,
} = paymentSlice.actions

export default paymentSlice.reducer
