// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
//   const response = await axios.get('/user/client')
//   return response.data.results
// })

// export const getWaiter = createAsyncThunk('appOrders/getWaiters', async () => {
//   const { data } = await axios.get('user/waiter/')
//   return data
// })

export const getAllWaiters = async (params) => {
  try {
    const response = await axios.get('/user/waiter', { params })
    return await {
      data: response.data.results,
      total: response.data.count
    }
  } catch (error) {
    return []
  }

}

export const getWaiters = createAsyncThunk('appWaiters/getWaiters', async params => {
  const response = await axios.get('/user/waiter', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

export const getWaiter = createAsyncThunk('appWaiters/getWaiter', async id => {
  const { data } = await axios.get(`/user/waiter/${id}`)
  return data
})

export const addWaiter = createAsyncThunk('appWaiters/addWaiter', async (waiter, { dispatch, getState }) => {
  // await axios.post('/user/waiter', waiter)
  // await dispatch(getData(getState().waiter.params))
  // await dispatch(getAllData())
  return waiter
})

export const deleteWaiter = createAsyncThunk('appWaiters/deleteWaiter', async (id, { dispatch, getState }) => {
  await axios.delete('/user/waiter/', { id })
  // await dispatch(getData(getState().waiter.params))
  // await dispatch(getAllData())
  return id
})

export const appWaitersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
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
  }
})

export default appWaitersSlice.reducer
