import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import businessService from './businessService'

const initialState = {
  businesses: [],
  business: null,
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

//get all businesses
export const getAllBusinesses = createAsyncThunk(
  'business/getAllBusinesses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await businessService.getAllBusinesses(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get business by id
export const getBusinessById = createAsyncThunk(
  'business/getBusinessById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await businessService.getBusinessById(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create business
export const createBusiness = createAsyncThunk(
  'business/createBusiness',
  async (businessData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await businessService.createBusiness(businessData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update business
export const updateBusiness = createAsyncThunk(
  'business/updateBusiness',
  async (data, thunkAPI) => {
    const { id, businessData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await businessService.updateBusiness(id, businessData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete business
export const deleteBusiness = createAsyncThunk(
  'business/deleteBusiness',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await businessService.deleteBusiness(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    resetBusinessList: (state) => {
      state.businesses = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetBusinessDetails: (state) => {
      state.business = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
    resetBusinessCreate: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetBusinessUpdate: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetBusinessDelete: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBusinesses.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllBusinesses.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.businesses = action.payload
      })
      .addCase(getAllBusinesses.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getBusinessById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsSuccess = false
        state.isDetailsError = false
        state.detailsErrorMessage = ''
      })
      .addCase(getBusinessById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.business = action.payload
      })
      .addCase(getBusinessById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createBusiness.pending, (state) => {
        state.isCreateLoading = true
        state.isCreateSuccess = false
        state.isCreateError = false
        state.createErrorMessage = ''
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
        state.businesses.push(action.payload)
        state.business = action.payload
      })
      .addCase(createBusiness.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updateBusiness.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateSuccess = false
        state.isUpdateError = false
        state.updateErrorMessage = ''
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.businesses = state.businesses.map((business) =>
          business._id === action.payload._id ? action.payload : business
        )
        state.business =
          state.business._id === action.payload._id
            ? action.payload
            : state.business
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deleteBusiness.pending, (state) => {
        state.isDeleteLoading = true
        state.isDeleteSuccess = false
        state.isDeleteError = false
        state.deleteErrorMessage = ''
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.businesses = state.businesses.filter(
          (business) => business._id !== action.payload._id
        )
        state.business =
          state.business._id === action.payload._id ? null : state.business
      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
  },
})

export const {
  resetBusinessList,
  resetBusinessDetails,
  resetBusinessCreate,
  resetBusinessUpdate,
  resetBusinessDelete,
} = businessSlice.actions
export default businessSlice.reducer
