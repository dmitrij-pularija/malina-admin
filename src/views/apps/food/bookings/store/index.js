import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllBooking = createAsyncThunk('appBooking/getAllBooking', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/products/bookings/')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/products/bookings/', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appBooking/getData', async params => {
  try {
  const response = await axios.get("/products/bookings/", { params })
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

export const getBooking = createAsyncThunk('appBooking/getBooking', async id => {
  try {
  const response = await axios.get(`/products/bookings/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addBooking = createAsyncThunk('appBooking/addBooking', async ({ booking }, { dispatch, getState }) => {
  try {
  await axios.post('/products/bookings/', booking)  
  await dispatch(getData(getState().bookings.params))
  return booking

} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteBooking = createAsyncThunk('appBooking/deleteBooking', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/products/bookings/${id}/`)
  await dispatch(getData(getState().bookings.params))
  // await dispatch(getAllData())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editBooking = createAsyncThunk('appBooking/editBooking', async ({ id, booking}, { dispatch, getState }) => {
  try {
  await axios.patch(`/products/bookings/${id}/`, booking)
  await dispatch(getData(getState().bookings.params))
  return booking
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const updateBooking = createAsyncThunk('appBooking/updateBooking', async ({ id, booking }, { dispatch, getState }) => {
  
  try {
  await axios.patch(`/products/bookings/${id}/`, { ...booking })
  await dispatch(getBooking(id))
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appBookingSlice = createSlice({
  name: 'appBooking',
  initialState: {
    data: [],
    allBooking: [],
    total: 0,
    params: {},
    loading: false,
    error: null,
    selectedBooking: null
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedBooking = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
        state.loading = false
        state.error = null
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.selectedBooking = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.allBooking = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllBooking.pending, handlePending)
      .addCase(getBooking.pending, handlePending)
      .addCase(addBooking.pending, handlePending)
      .addCase(deleteBooking.pending, handlePending)
      .addCase(editBooking.pending, handlePending)
      .addCase(updateBooking.pending, handlePending)
      .addCase(updateBooking.rejected, handleRejected)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllBooking.rejected, handleRejected)
      .addCase(getBooking.rejected, handleRejected)
      .addCase(addBooking.rejected, handleRejected)
      .addCase(deleteBooking.rejected, handleRejected)
      .addCase(editBooking.rejected, handleRejected)  
      .addCase(addBooking.fulfilled, handleFulfilled)
      .addCase(deleteBooking.fulfilled, handleFulfilled)
      .addCase(editBooking.fulfilled, handleFulfilled)
      .addCase(updateBooking.fulfilled, handleFulfilled)
  }
})

export const { selectEvent } = appBookingSlice.actions

export default appBookingSlice.reducer