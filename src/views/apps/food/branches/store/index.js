// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getBranches = createAsyncThunk('appBranches/getBranches', async params => {
  const response = await axios.get('/item/branch', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const editBranch = createAsyncThunk('appBranches/editBranches', async ({ id, name, address, storeid }, { dispatch, getState }) => {
  await axios.put(`/item/branch/${id}/`, {name, address, storeid })
  await dispatch(getBranches(getState().branches.params))
})


export const addBranch = createAsyncThunk('appBranches/addBranches', async (category, { dispatch, getState }) => {
  await axios.post('/item/branch/', category)
  await dispatch(getBranches(getState().branches.params))
  // await dispatch(getAllData())
  return category
})

export const deleteBranch = createAsyncThunk('appBranches/deleteBranches', async (id, { dispatch, getState }) => {
  await axios.delete('/item/branch/', { id })
  await dispatch(getBranches(getState().branches.params))
  // await dispatch(getAllData())
  return id
})

export const appBranchesSlice = createSlice({
  name: 'appBranches',
  initialState: {
    data: [],
    params: {},
    total: 1,
    selectedBranch: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBranches.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
      })
  }
  // reducers: {
  //   setSelectedBranch(state) {
  //     state.selectedBranch = false
  //   }
  // }
})

export default appBranchesSlice.reducer
// export const { setSelectedBranch } = appBranchesSlice.actions