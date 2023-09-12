import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllСhefs = createAsyncThunk('appСhefs/getAllСhefs', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/users/chefs')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/users/chefs', { params: { perPage: 100, page } })
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

export const getСhefs = createAsyncThunk('appСhefs/getСhefs', async params => {
  try {
  const response = await axios.get('/users/chefs', { params })
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

export const editСhefs = createAsyncThunk('appСhefs/editСhefs', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/users/chefs/${id}/`, formData)
  await dispatch(getСhefs(getState().chefs.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addСhefs = createAsyncThunk('appСhefs/addСhefs', async (chef, { dispatch, getState }) => {
  try {
  await axios.post('/users/chefs/', chef)
  await dispatch(getСhefs(getState().chefs.params))
  return chef
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteСhefs = createAsyncThunk('appСhefs/deleteСhefs', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/users/chefs/${id}/`)
  await dispatch(getСhefs(getState().chefs.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appСhefsSlice = createSlice({
  name: 'appСhefs',
  initialState: {
    data: [],
    allСhefs: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getСhefs.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getAllСhefs.fulfilled, (state, action) => {
        state.allСhefs = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getСhefs.pending, handlePending)
      .addCase(getAllСhefs.pending, handlePending)
      .addCase(editСhefs.pending, handlePending)
      .addCase(addСhefs.pending, handlePending)
      .addCase(deleteСhefs.pending, handlePending)
      .addCase(getСhefs.rejected, handleRejected)
      .addCase(getAllСhefs.rejected, handleRejected)
      .addCase(editСhefs.rejected, handleRejected)
      .addCase(addСhefs.rejected, handleRejected)
      .addCase(deleteСhefs.rejected, handleRejected)
      .addCase(editСhefs.fulfilled, handleFulfilled)
      .addCase(addСhefs.fulfilled, handleFulfilled)
      .addCase(deleteСhefs.fulfilled, handleFulfilled)
  }
})

export default appСhefsSlice.reducer