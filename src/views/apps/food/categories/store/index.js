import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllCategories = createAsyncThunk('appCategories/getAllCategories', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/users/category')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/users/category', { params: { perPage: 100, page } })
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

export const getCategories = createAsyncThunk('appCategories/getCategories', async params => {
  try {
  const response = await axios.get('/users/category', { params })
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

export const getSubCategories = createAsyncThunk('appCategories/getSubCategories', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/users/subcategory')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/users/subcategory', { params: { perPage: 100, page } })
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

export const editCategory = createAsyncThunk('appCategories/editCategory', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/users/category/${id}/`, formData)
  await dispatch(getCategories(getState().categories.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const editSubCategory = createAsyncThunk('appCategories/editSubCategory', async ({ id, formData }, { dispatch }) => {
  try {
  await axios.put(`/users/subcategory/${id}/`, formData)
  await dispatch(getSubCategories())
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (category, { dispatch, getState }) => {
  try {
  await axios.post('/users/category/', category)
  await dispatch(getCategories(getState().categories.params))
  return category
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addSubCategory = createAsyncThunk('appCategories/addSubCategory', async (subCategory, { dispatch }) => {
  try {
  await axios.post('/users/subcategory/', subCategory)
  await dispatch(getSubCategories())
  return subCategory
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteCategory = createAsyncThunk('appCategories/deleteCategory', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/users/category/${id}/`)
  await dispatch(getCategories(getState().categories.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteSubCategory = createAsyncThunk('appCategories/deleteSubCategory', async (id, { dispatch }) => {
  try {
  await axios.delete(`/users/subcategory/${id}/`)
  await dispatch(getSubCategories())
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    data: [],
    allCategories: [],
    subcategories: [],
    loading: false,
    error: null,
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
      .addCase(getSubCategories.pending, (state, action) => {
        state.subcategories = []
        state.loading = true
        state.error = null
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subcategories = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getCategories.pending, handlePending)
      .addCase(getAllCategories.pending, handlePending)
      .addCase(editCategory.pending, handlePending)
      .addCase(editSubCategory.pending, handlePending)
      .addCase(addCategory.pending, handlePending)
      .addCase(addSubCategory.pending, handlePending)
      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteSubCategory.pending, handlePending)
      .addCase(getCategories.rejected, handleRejected)
      .addCase(getAllCategories.rejected, handleRejected)
      .addCase(getSubCategories.rejected, handleRejected)
      .addCase(editCategory.rejected, handleRejected)
      .addCase(editSubCategory.rejected, handleRejected)
      .addCase(addCategory.rejected, handleRejected)
      .addCase(addSubCategory.rejected, handleRejected)
      .addCase(deleteCategory.rejected, handleRejected)
      .addCase(deleteSubCategory.rejected, handleRejected)
      .addCase(editCategory.fulfilled, handleFulfilled)
      .addCase(editSubCategory.fulfilled, handleFulfilled)
      .addCase(addCategory.fulfilled, handleFulfilled)
      .addCase(addSubCategory.fulfilled, handleFulfilled)
      .addCase(deleteCategory.fulfilled, handleFulfilled)
      .addCase(deleteSubCategory.fulfilled, handleFulfilled)
  }
})

export default appCategoriesSlice.reducer