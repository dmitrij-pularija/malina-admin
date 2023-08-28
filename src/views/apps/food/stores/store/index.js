import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import axios from 'axios'

export const getAllStores = createAsyncThunk('appStores/getAllStores', async () => {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/users/businesses/')

  while (!isFinished) {
  const { data: { results } } = await axios.get('/users/businesses', { params: { perPage: 100, page } })
  acc.push(...results)
  if (acc.length === count) isFinished = true
  page += 1
  }
  return acc
})

export const getData = createAsyncThunk('appStores/getData', async params => {
  const response = await axios.get('/users/businesses', { params })
  return {
    params,
    loading: false,
    error: null,
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
        state.loading = false
        state.error = null
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.allStores = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getStore.pending, (state, action) => {
        state.selectedStore = null
        state.loading = true
        state.error = null
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.selectedStore = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllStores.pending, handlePending)
      .addCase(editStore.pending, handlePending)
      .addCase(deleteStore.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllStores.rejected, handleRejected)
      .addCase(editStore.rejected, handleRejected)
      .addCase(getStore.rejected, handleRejected)
      .addCase(deleteStore.rejected, handleRejected)
      .addCase(editStore.fulfilled, handleFulfilled)
      .addCase(deleteStore.fulfilled, handleFulfilled)

  }
})

export default appStoresSlice.reducer