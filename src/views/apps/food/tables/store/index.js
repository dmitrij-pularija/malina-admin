import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'


export const getAllTables = createAsyncThunk('appTable/getAllTables', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/products/table')
    while (!isFinished) {
    const { data: { results } } = await axios.get('/products/table', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appTable/getData', async params => {
  try {
  const response = await axios.get('/products/table', { params })
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

export const getTable = createAsyncThunk('appTable/getTable', async id => {
  try {
  const response = await axios.get(`/products/table/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addTable = createAsyncThunk('appTable/addTable', async (table, { dispatch, getState }) => {
  try {
  await axios.post('/products/table/', table)
  await dispatch(getData(getState().tables.params))
  return table
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editTable = createAsyncThunk('appBranches/editBranches', async ({ id, number, branch, waiter }, { dispatch, getState }) => {
  try {
  await axios.put(`/products/table/${id}/`, { number, branch, waiter })
  await dispatch(getData(getState().tables.params))
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteTable = createAsyncThunk('appTable/deleteTable', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/products/table/${id}/`)
  await dispatch(getData(getState().tables.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const appTableSlice = createSlice({
  name: 'appTable',
  initialState: {
    data: [],
    allTables: [],
    total: 0,
    loading: false,
    error: null,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.params = action.payload.params
      state.loading = false
      state.error = null
    })
    .addCase(getAllTables.fulfilled, (state, action) => {
      state.allTables = action.payload
      state.loading = false
      state.error = null
    })
    .addCase(getData.pending, handlePending)
    .addCase(getTable.pending, handlePending)
    .addCase(addTable.pending, handlePending)
    .addCase(editTable.pending, handlePending)
    .addCase(deleteTable.pending, handlePending)
    .addCase(getAllTables.pending, handlePending)
    .addCase(getAllTables.rejected, handleRejected)
    .addCase(getData.rejected, handleRejected)
    .addCase(getTable.rejected, handleRejected)
    .addCase(addTable.rejected, handleRejected)
    .addCase(editTable.rejected, handleRejected)
    .addCase(deleteTable.rejected, handleRejected)
    .addCase(getTable.fulfilled, handleFulfilled)
    .addCase(addTable.fulfilled, handleFulfilled)
    .addCase(editTable.fulfilled, handleFulfilled)
    .addCase(deleteTable.fulfilled, handleFulfilled)
  }
})

export default appTableSlice.reducer
