// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getBranches = createAsyncThunk('appBranches/getBranches', async params => {
  const response = await axios.get('/item/branch', { params })
  return {
    params,
    data: response.data.results
  }
})

export const editBranch = createAsyncThunk('appBranches/editBranches', async id => {
  const response = await axios.put(`/item/branch/${id}`)
  return response
})


export const addBranch = createAsyncThunk('appBranches/addBranches', async (category, { dispatch, getState }) => {
  // await axios.post('/item/branch', category)
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return category
})

export const deleteBranch = createAsyncThunk('appBranches/deleteBranches', async (id, { dispatch, getState }) => {
  // await axios.delete('/item/branch/', { id })
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const appBranchesSlice = createSlice({
  name: 'appBranches',
  initialState: {
    data: [],
    params: {},
    selectedBranch: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBranches.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
      })
  }
})

export default appBranchesSlice.reducer