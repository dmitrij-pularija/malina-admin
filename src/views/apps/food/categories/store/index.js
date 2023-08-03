// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
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

export const editCategory = createAsyncThunk('appCategories/editCategory', async id => {
  const response = await axios.put(`/user/category/${id}`)
  return response
})

export const editSubCategory = createAsyncThunk('appCategories/editSubCategory', async id => {
  const response = await axios.put(`/user/subcategory/${id}`)
  return response
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (category, { dispatch, getState }) => {
  // await axios.post('/user/subcategory', category)
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return category
})

export const deleteCategory = createAsyncThunk('appCategories/deleteCategory', async (id, { dispatch, getState }) => {
  // await axios.delete('/user/category/', { id })
  // await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
})

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    data: [],
    subcategories: [],
    params: {},
    selectedCcategory: null,
    selectedSubCcategory: null
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