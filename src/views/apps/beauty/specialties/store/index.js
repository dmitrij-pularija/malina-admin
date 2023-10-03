import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

export const getAllSpecialties = createAsyncThunk('appSpecialties/getAllSpecialties', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/beauty/master-specialty/')
  while (!isFinished) {
  const { data: { results } } = await axios.get('/beauty/master-specialty/', { params: { perPage: 100, page } })
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

export const getSpecialty = createAsyncThunk('appSpecialties/getSpecialty', async params => {
  try {
  const response = await axios.get('/beauty/master-specialty/', { params })
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

export const editSpecialty = createAsyncThunk('appSpecialties/editSpecialty', async ({ id, formData }, { dispatch, getState }) => {
  try {
  await axios.put(`/beauty/master-specialty/${id}/`, formData)
  await dispatch(getSpecialty(getState().specialties.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addSpecialty = createAsyncThunk('appSpecialties/addSpecialty', async (specialty, { dispatch, getState }) => {
  try {
  await axios.post('/beauty/master-specialty/', specialty)
  await dispatch(getSpecialty(getState().specialties.params))
  return specialty
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteSpecialty = createAsyncThunk('appSpecialties/deleteSpecialty', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/beauty/master-specialty/${id}/`)
  await dispatch(getSpecialty(getState().specialties.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appSpecialtiesSlice = createSlice({
  name: 'appSpecialties',
  initialState: {
    data: [],
    allSpecialties: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSpecialty.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getAllSpecialties.fulfilled, (state, action) => {
        state.allSpecialties = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getSpecialty.pending, handlePending)
      .addCase(getAllSpecialties.pending, handlePending)
      .addCase(editSpecialty.pending, handlePending)
      .addCase(addSpecialty.pending, handlePending)
      .addCase(deleteSpecialty.pending, handlePending)
      .addCase(getSpecialty.rejected, handleRejected)
      .addCase(getAllSpecialties.rejected, handleRejected)
      .addCase(editSpecialty.rejected, handleRejected)
      .addCase(addSpecialty.rejected, handleRejected)
      .addCase(deleteSpecialty.rejected, handleRejected)
      .addCase(editSpecialty.fulfilled, handleFulfilled)
      .addCase(addSpecialty.fulfilled, handleFulfilled)
      .addCase(deleteSpecialty.fulfilled, handleFulfilled)
  }
})

export default appSpecialtiesSlice.reducer