import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'
 
export const getShifts = async () => {
  try {
  const { data: { results }} = await axios.get('/users/waiter-shifts/')
  return results
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
}

export const getAllWaiters = createAsyncThunk('appWaiters/getAllWaiters', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/users/waiter')
    while (!isFinished) {
    const { data: { results } } = await axios.get('/users/waiter', { params: { perPage: 100, page }})
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

export const getWaiters = createAsyncThunk('appWaiters/getWaiters', async params => {
try {
  const response = await axios.get('/users/waiter', { params })
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

export const getWaiter = createAsyncThunk('appWaiters/getWaiter', async id => {
try {
  const { data } = await axios.get(`/users/waiter/${id}`)
  return data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addWaiter = createAsyncThunk('appWaiters/addWaiter', async (waiter, { dispatch, getState }) => {
try {
  await axios.post('/users/waiter/', waiter)
  await dispatch(getWaiters(getState().waiters.params))
  return waiter
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteWaiter = createAsyncThunk('appWaiters/deleteWaiter', async (id, { dispatch, getState }) => {
try {
  await axios.delete(`/users/waiter/${id}/`)
  await dispatch(getWaiters(getState().waiters.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const editWaiter = createAsyncThunk('appWaiters/editWaiter', async ({ id, formData }, { dispatch, getState }) => {
 try {
  await axios.patch(`/users/waiter/${id}/`, formData)
  await dispatch(getWaiters(getState().waiters.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appWaitersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    allWaiters: [],
    total: 1,
    params: {},
    loading: false,
    error: null,
    selectedWaiter: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWaiters.fulfilled, (state, { payload: { data, params, total } }) => {
        state.data = data
        state.params = params
        state.total = total
        state.loading = false
        state.error = null
      })
      .addCase(getWaiter.fulfilled, (state, action) => {
        state.selectedWaiter = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllWaiters.fulfilled, (state, action) => {
        state.allWaiters = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getWaiters.pending, handlePending)
      .addCase(getWaiter.pending, handlePending)
      .addCase(getAllWaiters.pending, handlePending)
      .addCase(addWaiter.pending, handlePending)
      .addCase(deleteWaiter.pending, handlePending)
      .addCase(editWaiter.pending, handlePending)
      .addCase(getWaiters.rejected, handleRejected)
      .addCase(getWaiter.rejected, handleRejected)
      .addCase(getAllWaiters.rejected, handleRejected)
      .addCase(addWaiter.rejected, handleRejected)
      .addCase(deleteWaiter.rejected, handleRejected)
      .addCase(editWaiter.rejected, handleRejected)
      .addCase(addWaiter.fulfilled, handleFulfilled)
      .addCase(deleteWaiter.fulfilled, handleFulfilled)
      .addCase(editWaiter.fulfilled, handleFulfilled)
  }
})

export default appWaitersSlice.reducer
