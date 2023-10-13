import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllAddons = createAsyncThunk('appAddons/getAllAddons', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/products/addons')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/products/addons', { params: { perPage: 100, page } })
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

export const getAddons = createAsyncThunk('appAddons/getAddons', async params => {
  try {
  const response = await axios.get('/products/addons', { params })
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

export const editAddon = createAsyncThunk('appAddons/editAddon', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/products/addons/${id}/`, formData)
  await dispatch(getAddons(getState().addons.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addAddon = createAsyncThunk('appAddons/addAddon', async (addon, { dispatch, getState }) => {
  try {
  await axios.post('/products/addons/', addon)
  await dispatch(getAddons(getState().addons.params))
  return addon
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteAddon = createAsyncThunk('appAddons/deleteAddon', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/products/addons/${id}/`)
  await dispatch(getAddons(getState().addons.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appAddonsSlice = createSlice({
  name: 'appAddons',
  initialState: {
    data: [],
    allAddons: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAddons.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getAllAddons.fulfilled, (state, action) => {
        state.allAddons = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAddons.pending, handlePending)
      .addCase(getAllAddons.pending, handlePending)
      .addCase(editAddon.pending, handlePending)
      .addCase(addAddon.pending, handlePending)
      .addCase(deleteAddon.pending, handlePending)
      .addCase(getAddons.rejected, handleRejected)
      .addCase(getAllAddons.rejected, handleRejected)
      .addCase(editAddon.rejected, handleRejected)
      .addCase(addAddon.rejected, handleRejected)
      .addCase(deleteAddon.rejected, handleRejected)
      .addCase(editAddon.fulfilled, handleFulfilled)
      .addCase(addAddon.fulfilled, handleFulfilled)
      .addCase(deleteAddon.fulfilled, handleFulfilled)
  }
})

export default appAddonsSlice.reducer