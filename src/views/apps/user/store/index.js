// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllUsers = createAsyncThunk('appUsers/getAllWaiters', async () => {
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
    return []
  }
})

export const getAllCount = createAsyncThunk('appUsers/getAllCount', async () => {
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
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/users/user', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get(`/users/user/${id}/`)
  return response.data
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/users/user/', user)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete(`/users/user/${id}/`)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const editUser = createAsyncThunk('appUsers/editUser', async ({ id, formData }, { dispatch, getState }) => {
  await axios.patch(`/users/user/${id}/`, formData)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    allUsers: [],
    total: 1,
    count: { totalCount: 0, totalUsers: 0,  totalCustomers: 0,  totalGuests: 0 },
    params: {},
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
      })
      .addCase(getAllCount.fulfilled, (state, { payload }) => {
        state.count = payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload
      })
  }
})

export default appUsersSlice.reducer