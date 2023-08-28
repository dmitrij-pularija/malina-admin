import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import axios from 'axios'

export const getData = createAsyncThunk('appRatingWaiters/getData', async params => {
  const response = await axios.get('/users/waiter-rating', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const appRatingWaitersSlice = createSlice({
  name: 'appRatingWaiters',
  initialState: {
    data: [],
    total: 1,
    loading: false,
    error: null,
    params: {}
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
      .addCase(getData.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
  }
})

export default appRatingWaitersSlice.reducer
