import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

// export const delImages = async id => {
//   try {
//   await axios.delete(`/beauty/beauty-product-images/${id}/`)
// } catch (error) {
//   errorMessage(error.response.data.detail)
//   return thunkAPI.rejectWithValue(error)
// }
// }

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

export const getAllAppointments = createAsyncThunk('appBeautyAppointments/getAllAppointments', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/beauty/beauty_appointments/')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/beauty/beauty_appointments/', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appBeautyAppointments/getData', async params => {
  try {
  const response = await axios.get('/beauty/beauty_appointments/', { params })
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

export const getAppointment = createAsyncThunk('appBeautyAppointments/getAppointment', async id => {
  try {
  const response = await axios.get(`/beauty/beauty_appointments/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addAppointment = createAsyncThunk('appBeautyAppointments/addAppointment', async ({ product, galery }, { dispatch, getState }) => {
  const count = galery ? galery.length : 0
  try {
  const { data: { id } } = await axios.post('/beauty/beauty_appointments/', product)
  for (let i = 0; i < count; i += 1) {
  if (galery && galery.length && galery[i].image.startsWith('data:image')) {
    const formDataImage = new FormData()
    const formDataProductImage = new FormData()
    const imageBlob = dataURLtoBlob(galery[i].image)
    formDataImage.append('image', imageBlob, 'product.jpg')
    try {
    const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
    formDataProductImage.append('beauty_product', id)
    formDataProductImage.append('image', image)
      await axios.post(`/beauty/beauty-product-images/`, formDataProductImage)
    } catch (error) {
      errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  }

  await dispatch(getData(getState().appointments.params))
  return product
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteAppointment = createAsyncThunk('appBeautyAppointments/deleteAppointment', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/beauty/beauty_appointments/${id}/`)
  await dispatch(getData(getState().appointments.params))
  // await dispatch(getAllData())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editAppointment = createAsyncThunk('appBeautyAppointments/editAppointment', async ({ id, product, galery }, { dispatch, getState }) => {
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
        formDataProductImage.append('beauty_product', id)
        formDataProductImage.append('image', image)
          await axios.post(`/beauty/beauty-product-images/`, formDataProductImage)
        } catch (error) {
          errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
        }  
    }
  try {
  await axios.patch(`/beauty/beauty_appointments/${id}/`, product)
  await dispatch(getData(getState().appointments.params))
  return product
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const updateAppointment = createAsyncThunk('appBeautyAppointments/Appointment', async ({ id, product }, { dispatch, getState }) => {
  
  try {
  await axios.patch(`/beauty/beauty_appointments/${id}/`, { ...product })
  await dispatch(getAppointment(id))
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appBeautyAppointmentsSlice = createSlice({
  name: 'appBeautyAppointments',
  initialState: {
    data: [],
    allAppointments: [],
    total: 0,
    params: {},
    loading: false,
    error: null,
    selectedAppointment: null
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
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.selectedAppointment = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.allAppointments = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllAppointments.pending, handlePending)
      .addCase(getAppointment.pending, handlePending)
      .addCase(addAppointment.pending, handlePending)
      .addCase(deleteAppointment.pending, handlePending)
      .addCase(editAppointment.pending, handlePending)
      .addCase(updateAppointment.pending, handlePending)
      .addCase(updateAppointment.rejected, handleRejected)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllAppointments.rejected, handleRejected)
      .addCase(getAppointment.rejected, handleRejected)
      .addCase(addAppointment.rejected, handleRejected)
      .addCase(deleteAppointment.rejected, handleRejected)
      .addCase(editAppointment.rejected, handleRejected)  
      .addCase(addAppointment.fulfilled, handleFulfilled)
      .addCase(deleteAppointment.fulfilled, handleFulfilled)
      .addCase(editAppointment.fulfilled, handleFulfilled)
      .addCase(updateAppointment.fulfilled, handleFulfilled)
  }
})

export default appBeautyAppointmentsSlice.reducer