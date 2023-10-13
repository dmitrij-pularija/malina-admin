import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllCategories = createAsyncThunk('appProductsCategories/getAllCategories', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/products/product-category')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/products/product-category', { params: { perPage: 100, page } })
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

export const getCategories = createAsyncThunk('appProductsCategories/getCategories', async params => {
  try {
  const response = await axios.get('/products/product-category', { params })
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

export const editCategory = createAsyncThunk('appProductsCategories/editCategory', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/products/product-category/${id}/`, formData)
  await dispatch(getCategories(getState().productsCategories.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addCategory = createAsyncThunk('appProductsCategories/addCategory', async (category, { dispatch, getState }) => {
  try {
  await axios.post('/products/product-category/', category)
  await dispatch(getCategories(getState().productsCategories.params))
  return category
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteCategory = createAsyncThunk('appProductsCategories/deleteCategory', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/products/product-category/${id}/`)
  await dispatch(getCategories(getState().productsCategories.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appProductsCategoriesSlice = createSlice({
  name: 'appProductsCategories',
  initialState: {
    data: [],
    allCategories: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getCategories.pending, handlePending)
      .addCase(getAllCategories.pending, handlePending)
      .addCase(editCategory.pending, handlePending)
      .addCase(addCategory.pending, handlePending)
      .addCase(deleteCategory.pending, handlePending)
      .addCase(getCategories.rejected, handleRejected)
      .addCase(getAllCategories.rejected, handleRejected)
      .addCase(editCategory.rejected, handleRejected)
      .addCase(addCategory.rejected, handleRejected)
      .addCase(deleteCategory.rejected, handleRejected)
      .addCase(editCategory.fulfilled, handleFulfilled)
      .addCase(addCategory.fulfilled, handleFulfilled)
      .addCase(deleteCategory.fulfilled, handleFulfilled)
  }
})

export default appProductsCategoriesSlice.reducer