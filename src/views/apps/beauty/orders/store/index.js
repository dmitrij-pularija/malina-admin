import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import { BEAUTY_ORDERS_WS_URL } from '../../../../../configs/initial'
import axios from 'axios'

export const beautyOrderSocket = new WebSocket(BEAUTY_ORDERS_WS_URL)




// export const getSocketMessge = async () => {
//   let message = ''
//   try {
//     socket.onmessage = (event) => {
//       console.log(event)
//       message = JSON.parse(event.data)
//       // const data = JSON.parse(event.data)
//       console.log('Received data:', message)
//     }
//   return message
// } catch (error) {
//   console.log(error)
//   errorMessage(error)
//   return []
// }
// }

export const getAddressList = async () => {
  try {
  const { data: { results }} = await axios.get('/users/address/')
  return results
} catch (error) {
  errorMessage(error.response.data.detail)
  return []
}
}

export const addAddress = async (address) => {
  try {
  const { data: { results }} = await axios.post('/users/address/', address)
  return results
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

// export const getProductList = async () => {
//   try {
//   const { data: { results }} = await axios.get('/products/ordered-product/')
//   return results
// } catch (error) {
//   errorMessage(error.response.data.detail)
// }
// }

export const createProductCart = async (list, cart) => {
  const products_list = []
  try {
    for (const item of list) {
    const { data } = await axios.post('/beauty/beauty_ordered_products/', item)
    products_list.push(parseInt(data.id))
    }
    const { data: { id }, status } = await axios.post('/beauty/beauty_carts/', {...cart, products_list})  
  // const { data: { id }} = await axios.post('/products/cart/', {...cart, products_list: [parseInt(data.id)]})
  // // await axios.post('/products/confirm-cart/', { cart: id.toString() })
  // // const { data: { results }} = await axios.post('/products/add-product-to-cart/', list)
  // console.log(id)
  // return {id, status}
  return { carts: [id.toString()],  status }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

export const addProductList = async list => {
  try {
  const { data: { results }} = await axios.post('/products/ordered-product/', list)
  return results
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

export const editProductList = async ({ id, list }) => {
  try {
  const { data: { results }} = await axios.put(`/products/ordered-product/${id}/`, list)
  return results
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

export const addCartToOrder = async cart => {
  try {
  const { data: { results }} = await axios.post('/products/add-cart-to-order/', cart)
  return results
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

export const AddProductToCart = async list => {
  try {
  const { data: { results }} = await axios.post('/products/add-product-to-cart/', list)
  return results
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

// export const getOrderStatus = createAsyncThunk('appOrders/getOrderStatus', async () => {
//   try {
//   const response = await axios.get('/products/user-order/get_status/')
//   return response.data
// } catch (error) {
//   errorMessage(error.response.data.detail)
//   return thunkAPI.rejectWithValue(error)
// }
// })

export const changeStatatus = async ({ id, order }) => {
  try {
    const { status } = await axios.put(`/beauty/beauty_order_for_admin/update/${id}/`, order)
  return { status }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
}
}

export const getAllOrders = createAsyncThunk('appBeautyOrders/getAllOrders', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/beauty/beauty_orders/')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/beauty/beauty_orders/', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appBeautyOrders/getData', async params => {
  try {
  const response = await axios.get('/beauty/beauty_orders/', { params })
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

export const getOrder = createAsyncThunk('appBeautyOrders/getOrder', async id => {
  try {
  const response = await axios.get(`/beauty/beauty_orders/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.statusText)
  return thunkAPI.rejectWithValue(error)
}
})

export const addOrder = createAsyncThunk('appBeautyOrders/addOrder', async (order, { dispatch, getState }) => {
  try {
    const { data } = await axios.post('/beauty/beauty_orders/', order)
    // await dispatch(getData(getState().orderes.params))
    return { data }
  } catch (error) {
    errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    return thunkAPI.rejectWithValue(error)
  }
})

export const editOrder = createAsyncThunk('appBeautyOrders/editOrder', async ({ id, order }, { dispatch, getState }) => {
  try {
    await axios.put(`/beauty/beauty_orders/${id}/`, order)
    // await dispatch(getData(getState().orderes.params))
    return { id, ...order }
  } catch (error) {
    errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteOrder = createAsyncThunk('appBeautyOrders/deleteOrder', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/beauty/beauty_orders/${id}/`)
  await dispatch(getData(getState().beautyOrders.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const appBeautyOrdersSlice = createSlice({
  name: 'appBeautyOrders',
  initialState: {
    data: [],
    allOrders: [],
    count: { totalOrder: 0, totalPrice: 0,  avgPrice: 0,  avgRait: 0 },
    total: 0,
    params: {},
    messages: [],
    loading: false,
    error: null,
    selectedOrder: null
  },
  reducers: {
    addBeautyOrdersMessage: (state, action) => {
      state.messages.push(action.payload)
    }
  },
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
      .addCase(getData.pending, handlePending)
      .addCase(getAllOrders.pending, handlePending)
      .addCase(getOrder.pending, handlePending)
      .addCase(addOrder.pending, handlePending)
      .addCase(editOrder.pending, handlePending)
      .addCase(deleteOrder.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(addOrder.rejected, handleRejected)
      .addCase(editOrder.rejected, handleRejected)
      .addCase(deleteOrder.rejected, handleRejected)
      .addCase(getAllOrders.rejected, handleRejected)
      .addCase(getOrder.rejected, handleRejected)
      .addCase(addOrder.fulfilled, handleRejected)
      .addCase(editOrder.fulfilled, handleRejected)
      .addCase(deleteOrder.fulfilled, handleRejected)

  }
})

export default appBeautyOrdersSlice.reducer
export const { addBeautyOrdersMessage } = appBeautyOrdersSlice.actions