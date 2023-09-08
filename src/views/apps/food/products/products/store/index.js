import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllUsers = createAsyncThunk('appProducts/getAllUsers', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/users/user')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/users/user', { params: { perPage: 100, page }})
      acc.push(...results)
      if (acc.length === count) isFinished = true
      page += 1
      }
      return acc 
  } catch (error) {
    errorMessage(error.response.data.detail)
    return thunkAPI.rejectWithValue(error)
  }
})

export const getAllCount = createAsyncThunk('appProducts/getAllCount', async () => {
  try {
  const all = await axios.get('/users/user')
  const users = await axios.get('/users/user', { params: { user_type: 'user' } })
  const customers = await axios.get('/users/user', { params: { user_type: 'customer' } })
  const guests = await axios.get('/users/user', { params: { user_type: 'guest' }})
  return {
    totalCount: all.data.count,
    totalUsers: users.data.count,
    totalCustomers: customers.data.count,
    totalGuests: guests.data.count
  }
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const getData = createAsyncThunk('appProducts/getData', async params => {
  try {
  const response = await axios.get('/users/user', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const getUser = createAsyncThunk('appProducts/getUser', async id => {
  try {
  const response = await axios.get(`/users/user/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addUser = createAsyncThunk('appProducts/addUser', async ({ formData, avatar }, { dispatch, getState }) => {
  if (avatar && avatar.startsWith('data:image')) {
    const formDataImage = new FormData()
    try {  
      const avatarBlob = dataURLtoBlob(avatar)
      formDataImage.append('image', avatarBlob, 'avatar.jpg')
      const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
      formData.append('avatar', image)
    } catch (error) {
      errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  try {
  await axios.post('/users/user/', formData)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  // return user
} catch (error) {
  errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteUser = createAsyncThunk('appProducts/deleteUser', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/users/user/${id}/`)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editUser = createAsyncThunk('appProducts/editUser', async ({ id, formData, avatar }, { dispatch, getState }) => {
    if (avatar && avatar.startsWith('data:image')) {
      const formDataImage = new FormData()
      try {  
        const avatarBlob = dataURLtoBlob(avatar)
        formDataImage.append('image', avatarBlob, 'avatar.jpg')
        const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
        formData.append('avatar', image)
      } catch (error) {
        errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
      }
      }
  try {
  await axios.patch(`/users/user/${id}/`, formData)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  // return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    data: [],
    allUsers: [],
    total: 1,
    count: { totalCount: 0, totalUsers: 0,  totalCustomers: 0,  totalGuests: 0 },
    params: {},
    loading: false,
    error: null,
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
        state.loading = false
        state.error = null
      })
      .addCase(getAllCount.fulfilled, (state, { payload }) => {
        state.count = payload
        state.loading = false
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllCount.pending, handlePending)
      .addCase(getUser.pending, handlePending)
      .addCase(addUser.pending, handlePending)
      .addCase(deleteUser.pending, handlePending)
      .addCase(editUser.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(getAllCount.rejected, handleRejected)
      .addCase(getUser.rejected, handleRejected)
      .addCase(addUser.rejected, handleRejected)
      .addCase(deleteUser.rejected, handleRejected)
      .addCase(editUser.rejected, handleRejected)  
      .addCase(addUser.fulfilled, handleFulfilled)
      .addCase(deleteUser.fulfilled, handleFulfilled)
      .addCase(editUser.fulfilled, handleFulfilled)
  }
})

export default appProductsSlice.reducer