import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getData = createAsyncThunk('appComplaints/getData', async params => {
  try {
  const response = await axios.get('/products/complaints/', { params })
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

export const appComplaintsSlice = createSlice({
  name: 'appComplaints',
  initialState: {
    data: [],
    total: 0,
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

export default appComplaintsSlice.reducer
