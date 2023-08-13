import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk('appCategories/getCategories', async params => {
  const response = await axios.get('/user/category', { params })
  return {
    params,
    data: response.data
  }
})

export const getSubCategories = createAsyncThunk('appCategories/getSubCategories', async params => {
  const response = await axios.get('/user/subcategory')
  return {
    subcategories: response.data
  }
})

export const editCategory = createAsyncThunk('appCategories/editCategory', async ({ id, formData }, { dispatch, getState }) => {
  await axios.put(`/user/category/${id}/`, formData)
  await dispatch(getCategories(getState().categories.params))
  return { id, formData }
})

export const editSubCategory = createAsyncThunk('appCategories/editSubCategory', async ({ id, formData }, { dispatch }) => {
  await axios.put(`/user/subcategory/${id}/`, formData)
  await dispatch(getSubCategories())
  return { id, formData }
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (category, { dispatch, getState }) => {
  await axios.post('/user/category/', category)
  await dispatch(getCategories(getState().categories.params))
  return category
})

export const addSubCategory = createAsyncThunk('appCategories/addSubCategory', async (subCategory, { dispatch }) => {
  await axios.post('/user/subcategory/', subCategory)
  await dispatch(getSubCategories())
  return subCategory
})

export const deleteCategory = createAsyncThunk('appCategories/deleteCategory', async (id, { dispatch, getState }) => {
  await axios.delete(`/user/category/${id}/`)
  await dispatch(getCategories(getState().categories.params))
  return id
})

export const deleteSubCategory = createAsyncThunk('appCategories/deleteSubCategory', async (id, { dispatch }) => {
  await axios.delete(`/user/subcategory/${id}/`)
  await dispatch(getSubCategories())
  return id
})

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    data: [],
    subcategories: [],
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subcategories = action.payload.subcategories
      })
  }
})

export default appCategoriesSlice.reducer