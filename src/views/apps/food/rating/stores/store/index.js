// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appRatingStores/getData', async params => {
  const response = await axios.get('/user/rating', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const appRatingStoresSlice = createSlice({
  name: 'appRatingStores',
  initialState: {
    data: [],
    total: 1,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
      })
  }
})

export default appRatingStoresSlice.reducer