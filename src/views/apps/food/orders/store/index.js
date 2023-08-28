import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
// ** Axios Imports
import axios from 'axios'
export const getOrderStatus = createAsyncThunk('appOrders/getOrderStatus', async () => {
  const response = await axios.get('/products/user-order/get_status/')
  // console.log(response.data)
  return response.data
})

// http://167.99.246.103/myapps/venv/api/item/clientorder/
export const getAllData = createAsyncThunk('appOrders/getAllData', async () => {
  const response = await axios.get('/products/user-order')
// console.log(response.data.results)
  // const response = await axios.get('/api/users/list/all-data')
  return response.data.results
})

export const getData = createAsyncThunk('appOrders/getData', async params => {
  const response = await axios.get('/products/user-order', { params })
  // console.log(response)
  // const response = await axios.get('/api/users/list/data', params)
  return {
    params,
    data: response.data.results,
    total: response.data.count
  }
})

// export const getWaiter = createAsyncThunk('appOrders/getWaiters', async () => {
//   const { data: { results } } = await axios.get('user/waiter/')
//   return results
// })

export const getOrder = createAsyncThunk('appOrders/getOrder', async id => {
  const response = await axios.get(`/products/user-order/${id}/`)
  return response.data
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
    total: 1,
    params: {},
    status: [],
    allData: [],
    loading: false,
    error: null,
    selectedOrder: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
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
      .addCase(getAllData.pending, handlePending)
      .addCase(getOrder.pending, handlePending)
      .addCase(getOrderStatus.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllData.rejected, handleRejected)
      .addCase(getOrder.rejected, handleRejected)
      .addCase(getOrderStatus.rejected, handleRejected)
  }
})

export default appOrdersSlice.reducer
