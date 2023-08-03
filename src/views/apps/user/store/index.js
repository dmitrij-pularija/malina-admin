// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
//   const response = await axios.get('/user/client')
//   return response.data.results
// })

// export const getWaiter = createAsyncThunk('appOrders/getWaiters', async () => {
//   const { data } = await axios.get('user/waiter/')
//   return data
// })

export const getAllCount = createAsyncThunk('appUsers/getAllCount', async () => {
  const all = await axios.get('/user/client')
  const users = await axios.get('/user/client', { params: { client_type: 'user' } })
  const customers = await axios.get('/user/client', { params: { client_type: 'customer' } })
  const guests = await axios.get('/user/client', { params: { client_type: 'guest' }})
  return {
    totalCount: all.data.count,
    totalUsers: users.data.count,
    totalCustomers: customers.data.count,
    totalGuests: guests.data.count
  }
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/user/client', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get(`/user/client/${id}`)
  return response.data
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/user/client', user)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/user/client/', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
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
  }
})

export default appUsersSlice.reducer