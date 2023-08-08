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

export const getData = createAsyncThunk('appStores/getData', async params => {
  const response = await axios.get('/user/store', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getStore = createAsyncThunk('appStores/getStore', async id => {
  const response = await axios.get(`/user/store/${id}`)
  return response.data
})

export const addStore = createAsyncThunk('appStores/addStore', async (user, { dispatch, getState }) => {
  // await axios.post('/user/store', user)
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return user
})

export const editStore = createAsyncThunk('appStores/editStore', async (id, { dispatch, getState }) => {
  // await axios.post('/user/store//', { id })
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const deleteStore = createAsyncThunk('appStores/deleteStore', async (id, { dispatch, getState }) => {
  // await axios.delete('/user/store/', { id })
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const appStoresSlice = createSlice({
  name: 'appStores',
  initialState: {
    data: [],
    total: 1,
    params: {},
    selectedStore: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.selectedStore = action.payload
      })
  }
})

export default appStoresSlice.reducer