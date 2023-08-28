import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import axios from 'axios'

export const getData = createAsyncThunk('appTable/getData', async params => {
  const response = await axios.get('/products/table', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})
export const getTable = createAsyncThunk('appTable/getTable', async id => {
  const response = await axios.get(`/products/table/${id}/`)
  return response.data
})

export const addTable = createAsyncThunk('appTable/addTable', async (table, { dispatch, getState }) => {
  await axios.post('/products/table/', table)
  await dispatch(getData(getState().tables.params))
  return table
})

export const editTable = createAsyncThunk('appBranches/editBranches', async ({ id, number, branch, waiter }, { dispatch, getState }) => {
  await axios.put(`/products/table/${id}/`, { number, branch, waiter })
  await dispatch(getData(getState().tables.params))
})

export const deleteTable = createAsyncThunk('appTable/deleteTable', async (id, { dispatch, getState }) => {
  await axios.delete(`/products/table/${id}/`)
  await dispatch(getData(getState().tables.params))
  return id
})

export const appTableSlice = createSlice({
  name: 'appTable',
  initialState: {
    data: [],
    total: 1,
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
    .addCase(getData.pending, handlePending)
    .addCase(getTable.pending, handlePending)
    .addCase(addTable.pending, handlePending)
    .addCase(editTable.pending, handlePending)
    .addCase(deleteTable.pending, handlePending)
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
