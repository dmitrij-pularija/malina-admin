// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appTable/getData', async params => {
  const response = await axios.get('/item/table', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})
export const getTable = createAsyncThunk('appTable/getTable', async id => {
  const response = await axios.get(`/item/table/${id}`)
  return response.data
})

export const addTable = createAsyncThunk('appTable/addTable', async (table, { dispatch, getState }) => {
  await axios.post('/item/table/', table)
  await dispatch(getData(getState().tables.params))
  return table
})

export const editTable = createAsyncThunk('appBranches/editBranches', async ({ id, number, branch, waiter }, { dispatch, getState }) => {
  await axios.put(`/item/table/${id}/`, { number, branch, waiter })
  await dispatch(getData(getState().branches.params))
})

export const deleteTable = createAsyncThunk('appTable/deleteTable', async (id, { dispatch, getState }) => {
  await axios.delete('/item/table/', { id })
  await dispatch(getData(getState().tables.params))
  return id
})

export const appTableSlice = createSlice({
  name: 'appTable',
  initialState: {
    data: [],
    total: 1,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.params = action.payload.params
    })
  }
})

export default appTableSlice.reducer
