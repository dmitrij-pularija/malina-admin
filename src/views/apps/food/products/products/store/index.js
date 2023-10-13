import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const delImages = async id => {
  try {
  await axios.delete(`/products/product-images/${id}/`)
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
}

// export const delAddon = async id => {
//   try {
//   await axios.delete(`/products/product-addon/${id}/`)
// } catch (error) {
//   errorMessage(error.response.data.detail)
//   return thunkAPI.rejectWithValue(error)
// }
// }
// export const addAddon = async addon => {
//   try {
//   await axios.post(`/products/product-addon/`, addon)
// } catch (error) {
//   errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
//   return thunkAPI.rejectWithValue(error)
// }
// }

export const getAllProducts = createAsyncThunk('appProducts/getAllProducts', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/products/product')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/products/product', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appProducts/getData', async params => {
  try {
  const response = await axios.get('/products/product', { params })
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

export const getProduct = createAsyncThunk('appProducts/getProduct', async id => {
  try {
  const response = await axios.get(`/products/product/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addProduct = createAsyncThunk('appProducts/addProduct', async ({ formData, galery }, { dispatch, getState }) => {
  const count = galery ? galery.length : 0
  try {
  const { data: { id } } = await axios.post('/products/product/', formData)
  for (let i = 0; i < count; i += 1) {
  if (galery && galery.length && galery[i].image.startsWith('data:image')) {
    const formDataImage = new FormData()
    const formDataProductImage = new FormData()
    const imageBlob = dataURLtoBlob(galery[i].image)
    formDataImage.append('image', imageBlob, 'product.jpg')
    try {
    const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
    formDataProductImage.append('product', id)
    formDataProductImage.append('image', image)
      await axios.post(`/products/product-images/`, formDataProductImage)
    } catch (error) {
      errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  }

  await dispatch(getData(getState().products.params))
  // await dispatch(getAllData())
  // return formData
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteProduct = createAsyncThunk('appProducts/deleteProduct', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/products/product/${id}/`)
  await dispatch(getData(getState().products.params))
  // await dispatch(getAllData())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editProduct = createAsyncThunk('appProducts/editProduct', async ({ id, formData, galery }, { dispatch, getState }) => {
  const count = galery ? galery.length : 0
  for (let i = 0; i < count; i += 1) {
    const formDataImage = new FormData()
    const formDataProductImage = new FormData()
    if (galery && galery.length && galery[i].image.startsWith('data:image')) {
      const imageBlob = dataURLtoBlob(galery[i].image)
      formDataImage.append('image', imageBlob, 'product.jpg')
      }
      try {
        const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
        formDataProductImage.append('product', id)
        formDataProductImage.append('image', image)
          await axios.post(`/products/product-images/`, formDataProductImage)
        } catch (error) {
          errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
        }  
    }
  try {
  await axios.patch(`/products/product/${id}/`, formData)
  await dispatch(getData(getState().products.params))
  // await dispatch(getAllData())
  // return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const updateProduct = createAsyncThunk('appProducts/updateProduct', async ({ id, product }, { dispatch, getState }) => {
  
  try {
  await axios.patch(`/products/product/${id}/`, { ...product })
  await dispatch(getProduct(id))
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    data: [],
    allProducts: [],
    total: 0,
    params: {},
    loading: false,
    error: null,
    selectedProduct: null
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
      .addCase(getProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getProduct.pending, handlePending)
      .addCase(addProduct.pending, handlePending)
      .addCase(deleteProduct.pending, handlePending)
      .addCase(editProduct.pending, handlePending)
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.rejected, handleRejected)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllProducts.rejected, handleRejected)
      .addCase(getProduct.rejected, handleRejected)
      .addCase(addProduct.rejected, handleRejected)
      .addCase(deleteProduct.rejected, handleRejected)
      .addCase(editProduct.rejected, handleRejected)  
      .addCase(addProduct.fulfilled, handleFulfilled)
      .addCase(deleteProduct.fulfilled, handleFulfilled)
      .addCase(editProduct.fulfilled, handleFulfilled)
      .addCase(updateProduct.fulfilled, handleFulfilled)
  }
})

export default appProductsSlice.reducer