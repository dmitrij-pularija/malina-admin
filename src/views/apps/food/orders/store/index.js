import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'


export const getOrderStatus = createAsyncThunk('appOrders/getOrderStatus', async () => {
  const response = await axios.get('/products/user-order/get_status/')
  // console.log(response.data)
  return response.data
})

// export const getAllData = createAsyncThunk('appOrders/getAllData', async () => {
//   const response = await axios.get('/products/user-order')
// // console.log(response.data.results)
//   // const response = await axios.get('/api/users/list/all-data')
//   return response.data.results
// })

export const getAllOrders = createAsyncThunk('appUsers/getAllOrders', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/products/user-order')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/products/user-order', { params: { perPage: 100, page }})
      acc.push(...results)
      if (acc.length === count) isFinished = true
      page += 1
      }
   const totalPrice = acc.reduce((accumulator, item) => { return accumulator + item.total_order_price }, 0)
   const totalRait = acc.reduce((accumulator, item) => { return accumulator + parseInt(item.rait) }, 0)
   const filtredRate = acc.filter((item) => parseInt(item.rate) > 0)
   const countRate = filtredRate.length

    return {data: acc, count: { totalOrder: count, totalPrice,  avgPrice: count ? totalPrice / count : 0,  avgRait: countRate ? totalRait / countRate : 0 } }
  } catch (error) {
    errorMessage(error.response.data.detail)
    return thunkAPI.rejectWithValue(error)
  }
})

export const getData = createAsyncThunk('appOrders/getData', async params => {
  try {
  const response = await axios.get('/products/user-order', { params })
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
} catch (error) {
  errorMessage(error.response.statusText)
  return thunkAPI.rejectWithValue(error)
}
})

export const getOrder = createAsyncThunk('appOrders/getOrder', async id => {
  try {
  const response = await axios.get(`/products/user-order/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.statusText)
  return thunkAPI.rejectWithValue(error)
}
})

// export const getUser = createAsyncThunk('appUsers/getUser', async id => {
//   const response = await axios.get('/api/users/user', { id })
//   return response.data.user
// })

// export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
//   await axios.post('/apps/users/add-user', user)
//   await dispatch(getData(getState().users.params))
//   await dispatch(getAllData())
//   return user
// })

// export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
//   await axios.delete('/apps/users/delete', { id })
//   await dispatch(getData(getState().users.params))
//   await dispatch(getAllData())
//   return id
// })

export const appOrdersSlice = createSlice({
  name: 'appOrders',
  initialState: {
    data: [],
    allOrders: [],
    count: { totalOrder: 0, totalPrice: 0,  avgPrice: 0,  avgRait: 0 },
    total: 1,
    params: {},
    status: [],
    loading: false,
    error: null,
    selectedOrder: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload.data
        state.count = action.payload.count
        state.loading = false
        state.error = null
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
        state.loading = false
        state.error = null
      })
      .addCase(getOrderStatus.fulfilled, (state, action) => {
        state.status = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllOrders.pending, handlePending)
      .addCase(getOrder.pending, handlePending)
      .addCase(getOrderStatus.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllOrders.rejected, handleRejected)
      .addCase(getOrder.rejected, handleRejected)
      .addCase(getOrderStatus.rejected, handleRejected)
  }
})

export default appOrdersSlice.reducer
