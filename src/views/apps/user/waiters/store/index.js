import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getShifts = async () => {
  try {
  const { data: { results }} = await axios.get('/users/waiter-shifts/')
  return results
} catch (error) {
  return []
}
}

export const getAllWaiters = createAsyncThunk('appWaiters/getAllWaiters', async param => {
  try {
    const { data: { count } } = await axios.get('/user/waiter')
    const { data: { results } } = await axios.get('/user/waiter', { params: { perPage: count, ...param } })
    return { allWaiters: results }
    // const response = await axios.get('/user/waiter', { params })
    // return await {
    //   data: response.data.results,
    //   total: response.data.count
    // }
  } catch (error) {
    return []
  }

})

export const getWaiters = createAsyncThunk('appWaiters/getWaiters', async params => {
  const response = await axios.get('/users/waiter', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getWaiter = createAsyncThunk('appWaiters/getWaiter', async id => {
  const { data } = await axios.get(`/users/waiter/${id}`)
  return data
})

export const addWaiter = createAsyncThunk('appWaiters/addWaiter', async (waiter, { dispatch, getState }) => {
  await axios.post('/users/waiter/', waiter)
  await dispatch(getWaiters(getState().waiters.params))
  return waiter
})

export const deleteWaiter = createAsyncThunk('appWaiters/deleteWaiter', async (id, { dispatch, getState }) => {
  await axios.delete(`/users/waiter/${id}/`)
  await dispatch(getWaiters(getState().waiters.params))
  return id
})

export const editWaiter = createAsyncThunk('appWaiters/editWaiter', async ({ id, formData }, { dispatch, getState }) => {
  await axios.patch(`/users/waiter/${id}/`, formData)
  await dispatch(getWaiters(getState().waiters.params))
  return { id, formData }
})

export const appWaitersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    allWaiters: [],
    total: 1,
    params: {},
    selectedWaiter: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWaiters.fulfilled, (state, { payload: { data, params, total } }) => {
        state.data = data
        state.params = params
        state.total = total
      })
      .addCase(getWaiter.fulfilled, (state, action) => {
        state.selectedWaiter = action.payload
      })
      .addCase(getAllWaiters.fulfilled, (state, action) => {
        state.selectedWaiter = action.payload
      })
  }
})

export default appWaitersSlice.reducer
