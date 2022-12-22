import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  user: null,
  meUser: null,
  isListError: false,
  isListSuccess: false,
  isListLoading: false,
  listErrorMessage: '',
  isDetailsError: false,
  isDetailsSuccess: false,
  isDetailsLoading: false,
  detailsErrorMessage: '',
  isMeGetError: false,
  isMeGetSuccess: false,
  isMeGetLoading: false,
  meGetErrorMessage: '',
  isMeUpdateError: false,
  isMeUpdateSuccess: false,
  isMeUpdateLoading: false,
  meUpdateErrorMessage: '',
  isChangePasswordError: false,
  isChangePasswordSuccess: false,
  isChangePasswordLoading: false,
  changePasswordErrorMessage: '',
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

//get all users
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.getAllUsers(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get user by id
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.getUserById(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//create user
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.createUser(userData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    const { id, userData } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.updateUser(id, userData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.deleteUser(id, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get info about logged in user
export const getMeUser = createAsyncThunk(
  'user/getMeUser',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.getMeUser(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update info about logged in user
export const updateMeUser = createAsyncThunk(
  'user/updateMeUser',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.updateMeUser(userData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//change password of logged in user
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, thunkAPI) => {
    const { prevPassword, newPassword } = data
    try {
      const token = thunkAPI.getState().auth.userInfo.token
      return await userService.changePassword(prevPassword, newPassword, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserList: (state) => {
      state.users = []
      state.isListError = false
      state.isListSuccess = false
      state.isListLoading = false
      state.listErrorMessage = ''
    },
    resetUserDetails: (state) => {
      state.user = null
      state.isDetailsError = false
      state.isDetailsSuccess = false
      state.isDetailsLoading = false
      state.detailsErrorMessage = ''
    },
    resetMeUser: (state) => {
      state.meUser = null
      state.isMeGetError = false
      state.isMeGetSuccess = false
      state.isMeGetLoading = false
      state.meGetMessage = ''
    },
    resetCreateUser: (state) => {
      state.isCreateError = false
      state.isCreateSuccess = false
      state.isCreateLoading = false
      state.createErrorMessage = ''
    },
    resetUpdateUser: (state) => {
      state.isUpdateError = false
      state.isUpdateSuccess = false
      state.isUpdateLoading = false
      state.updateErrorMessage = ''
    },
    resetDeleteUser: (state) => {
      state.isDeleteError = false
      state.isDeleteSuccess = false
      state.isDeleteLoading = false
      state.deleteErrorMessage = ''
    },
    resetMeUpdateUser: (state) => {
      state.isMeUpdateError = false
      state.isMeUpdateSuccess = false
      state.isMeUpdateLoading = false
      state.meUpdateMessage = ''
    },
    resetChangePassword: (state) => {
      state.isChangePasswordError = false
      state.isChangePasswordSuccess = false
      state.isChangePasswordLoading = false
      state.changePasswordErrorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isListLoading = true
        state.isListError = false
        state.isListSuccess = false
        state.listErrorMessage = ''
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isListLoading = false
        state.isListSuccess = true
        state.isListError = false
        state.listErrorMessage = ''
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isListLoading = false
        state.isListError = true
        state.listErrorMessage = action.payload
      })
      .addCase(getUserById.pending, (state) => {
        state.isDetailsLoading = true
        state.isDetailsError = false
        state.isDetailsSuccess = false
        state.detailsErrorMessage = ''
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsSuccess = true
        state.isDetailsError = false
        state.detailsErrorMessage = ''
        state.user = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.isDetailsError = true
        state.detailsErrorMessage = action.payload
      })
      .addCase(createUser.pending, (state) => {
        state.isCreateLoading = true
        state.isCreateError = false
        state.isCreateSuccess = false
        state.createErrorMessage = ''
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.isCreateSuccess = true
        state.isCreateError = false
        state.createErrorMessage = ''
        state.users.push(action.payload)
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateLoading = false
        state.isCreateError = true
        state.createErrorMessage = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateError = false
        state.isUpdateSuccess = false
        state.updateErrorMessage = ''
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        state.isUpdateError = false
        state.updateErrorMessage = ''
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        )
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateError = true
        state.updateErrorMessage = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isDeleteLoading = true
        state.isDeleteError = false
        state.isDeleteSuccess = false
        state.deleteErrorMessage = ''
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteSuccess = true
        state.isDeleteError = false
        state.deleteErrorMessage = ''
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        )
        state.user = state.user._id === action.payload._id ? null : state.user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleteLoading = false
        state.isDeleteError = true
        state.deleteErrorMessage = action.payload
      })
      .addCase(getMeUser.pending, (state) => {
        state.isMeGetLoading = true
        state.isMeGetError = false
        state.isMeGetSuccess = false
        state.meGetMessage = ''
      })
      .addCase(getMeUser.fulfilled, (state, action) => {
        state.isMeGetLoading = false
        state.isMeGetSuccess = true
        state.isMeGetError = false
        state.meGetErrorMessage = ''
        state.meUser = action.payload
      })
      .addCase(getMeUser.rejected, (state, action) => {
        state.isMeGetLoading = false
        state.isMeGetError = true
        state.meGetErrorMessage = action.payload
      })
      .addCase(updateMeUser.pending, (state) => {
        state.isMeUpdateLoading = true
        state.isMeUpdateError = false
        state.isMeUpdateSuccess = false
        state.meUpdateMessage = ''
      })
      .addCase(updateMeUser.fulfilled, (state, action) => {
        state.isMeUpdateLoading = false
        state.isMeUpdateSuccess = true
        state.isMeUpdateError = false
        state.meUpdateErrorMessage = ''
        state.meUser = action.payload
      })
      .addCase(updateMeUser.rejected, (state, action) => {
        state.isMeUpdateLoading = false
        state.isMeUpdateError = true
        state.meUpdateErrorMessage = action.payload
      })
      .addCase(changePassword.pending, (state) => {
        state.isChangePasswordLoading = true
        state.isChangePasswordError = false
        state.isChangePasswordSuccess = false
        state.changePasswordErrorMessage = ''
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isChangePasswordLoading = false
        state.isChangePasswordSuccess = true
        state.isChangePasswordError = false
        state.changePasswordErrorMessage = ''
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isChangePasswordLoading = false
        state.isChangePasswordError = true
        state.changePasswordErrorMessage = action.payload
      })
  },
})

export const {
  resetUserList,
  resetUserDetails,
  resetCreateUser,
  resetUpdateUser,
  resetDeleteUser,
  resetMeUser,
  resetMeUpdateUser,
  resetChangePassword,
} = userSlice.actions
export default userSlice.reducer
