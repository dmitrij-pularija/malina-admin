// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
// http://167.99.246.103/myapps/venv/api/item/clientorder/
export const getAllData = createAsyncThunk('appOrders/getAllData', async () => {
  const response = await axios.get('item/clientorder/')
// console.log(response.data.results)
  // const response = await axios.get('/api/users/list/all-data')
  return response.data.results
})

export const getData = createAsyncThunk('appOrders/getData', async params => {
  const response = await axios.get('item/clientorder/', params)
  // const response = await axios.get('/api/users/list/data', params)
  return {
    params,
    data: response.data.results,
    totalPages: response.data.count
  }
})

export const getWaiter = createAsyncThunk('appOrders/getWaiters', async () => {
  const { data: { results } } = await axios.get('user/waiter/')
  return results
})

export const getOrder = createAsyncThunk('appOrders/getOrder', async id => {
  const response = await axios.get('item/clientorder/', { id })
  return response.data.user
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/users/user', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appOrdersSlice = createSlice({
  name: 'appOrders',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    waiters: [],
    selectedOrder: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload
      })
      .addCase(getWaiter.fulfilled, (state, action) => {
        state.waiters = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appOrdersSlice.reducer
