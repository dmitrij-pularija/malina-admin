import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../@core/components/errorMessage"
import axios from 'axios'

export const getFeeds = createAsyncThunk('appFeeds/getFeeds', async params => {
  try {
  const response = await axios.get('/feed/article/', { params })
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

export const editFeed = createAsyncThunk('appFeeds/editFeed', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/feed/article/${id}/`, formData)
  await dispatch(getFeeds(getState().feeds.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addFeed = createAsyncThunk('appFeeds/addFeed', async (feed, { dispatch, getState }) => {
  try {
  await axios.post('/feed/article/', feed)
  await dispatch(getFeeds(getState().feeds.params))
  return feed
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteFeed = createAsyncThunk('appFeeds/deleteFeed', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/feed/article/${id}/`)
  await dispatch(getFeeds(getState().feeds.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appFeedSlice = createSlice({
  name: 'appFeeds',
  initialState: {
    data: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getFeeds.pending, handlePending)
      .addCase(editFeed.pending, handlePending)
      .addCase(addFeed.pending, handlePending)
      .addCase(deleteFeed.pending, handlePending)
      .addCase(getFeeds.rejected, handleRejected)
      .addCase(editFeed.rejected, handleRejected)
      .addCase(addFeed.rejected, handleRejected)
      .addCase(deleteFeed.rejected, handleRejected)
      .addCase(editFeed.fulfilled, handleFulfilled)
      .addCase(addFeed.fulfilled, handleFulfilled)
      .addCase(deleteFeed.fulfilled, handleFulfilled)
  }
})

export default appFeedSlice.reducer