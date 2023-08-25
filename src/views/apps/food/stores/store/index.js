// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllStores = createAsyncThunk('appStores/getAllStores', async param => {
  const { data: { count } } = await axios.get('/users/businesses/')
  const { data: { results } } = await axios.get('/users/businesses', { params: { perPage: count, ...param } })
  return results
})

// export const getWaiter = createAsyncThunk('appOrders/getWaiters', async () => {
//   const { data } = await axios.get('user/waiter/')
//   return data
// })

export const getData = createAsyncThunk('appStores/getData', async params => {
  const response = await axios.get('/users/businesses', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getStore = createAsyncThunk('appStores/getStore', async id => {
  const response = await axios.get(`/users/businesses/${id}/`)
  return response.data
})

export const addStore = createAsyncThunk('appStores/addStore', async (formData, { dispatch, getState }) => {
  await axios.post('/users/businesses/', formData)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
})

export const editStore = createAsyncThunk('appStores/editStore', async ({ id, formData }, { dispatch, getState }) => {
  await axios.put(`/users/businesses/${ id }/`, formData)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
  return id
})

export const deleteStore = createAsyncThunk('appStores/deleteStore', async (id, { dispatch, getState }) => {
  await axios.delete(`/users/businesses/${ id }/`)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
  return id
})

export const appStoresSlice = createSlice({
  name: 'appStores',
  initialState: {
    data: [],
    allStores: [],
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
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.allStores = action.payload
      })
      .addCase(getStore.pending, (state, action) => {
        state.selectedStore = null
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.selectedStore = action.payload
      })
  }
})

export default appStoresSlice.reducer