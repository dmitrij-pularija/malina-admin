import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getWaiterRating = async id => {
  try {
  const { data: { results }} = await axios.get(`/users/waiter-rating/${id}/`)
  return results || []
} catch (error) {
  errorMessage(error.response.data.detail)
  return []
  // return thunkAPI.rejectWithValue(error)
}
}


export const getData = createAsyncThunk('appRatingWaiters/getData', async params => {
  try {
  const response = await axios.get('/users/waiter-rating', { params })
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
