import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//get user from local storage
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  userInfo: userInfo ? userInfo : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//signup user locally
export const signupLocal = createAsyncThunk(
  'auth/signupLocal',
  async (userData, thunkAPI) => {
    try {
      return await authService.signupLocal(userData)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//signin user locally
export const signinLocal = createAsyncThunk(
  'auth/signinLocal',
  async (userData, thunkAPI) => {
    try {
      return await authService.signinLocal(userData)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get google loggedin user information
export const getAuthedUser = createAsyncThunk(
  'auth/getAuthedUser',
  async (id, thunkAPI) => {
    try {
      return await authService.getAuthedUser(id)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update authed user for further Information
export const updateAuthedUser = createAsyncThunk(
  'auth/updateAuthedUser',
  async (data, thunkAPI) => {
    const { id, userData } = data
    try {
      return await authService.updateAuthedUser(id, userData)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//logout user
// export const logout = createAsyncThunk('auth/logout', async () => {
//   await authService.logout()
// })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      document.location.href = '/'
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupLocal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signupLocal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload
      })
      .addCase(signupLocal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userInfo = null
      })
      .addCase(signinLocal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signinLocal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload
      })
      .addCase(signinLocal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userInfo = null
      })
      .addCase(getAuthedUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAuthedUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload
      })
      .addCase(getAuthedUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userInfo = null
      })
      .addCase(updateAuthedUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAuthedUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
        state.userInfo = action.payload
      })
      .addCase(updateAuthedUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userInfo = null
      })
    // .addCase(logout.fulfilled, (state) => {
    //   state.userInfo = null
    // })
  },
})

export const { resetAuth, logout } = authSlice.actions
export default authSlice.reducer
