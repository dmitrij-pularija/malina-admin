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

export const getAllServices = createAsyncThunk('appServices/getAllServices', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/beauty/beauty_services/')
    while (!isFinished) {
      const { data: { results } } = await axios.get('/beauty/beauty_services/', { params: { perPage: 100, page }})
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

export const getData = createAsyncThunk('appServices/getData', async params => {
  try {
  const response = await axios.get('/beauty/beauty_services/', { params })
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

export const getService = createAsyncThunk('appServices/getService', async id => {
  try {
  const response = await axios.get(`/beauty/beauty_services/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addService = createAsyncThunk('appServices/addService', async ({ formData, galery }, { dispatch, getState }) => {
  const count = galery ? galery.length : 0
  try {
  const { data: { id } } = await axios.post('/beauty/beauty_services/', formData)
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
      await axios.post(`/beauty/beauty_services/`, formDataProductImage)
    } catch (error) {
      errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  }

  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  // return user
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteService = createAsyncThunk('appServices/deleteService', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/beauty/beauty_services/${id}/`)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editService = createAsyncThunk('appServices/editService', async ({ id, formData, galery }, { dispatch, getState }) => {
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
  await axios.patch(`/beauty/beauty_services/${id}/`, formData)
  await dispatch(getData(getState().users.params))
  // await dispatch(getAllData())
  // return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const updateService = createAsyncThunk('appProducts/updateService', async ({ id, product }, { dispatch, getState }) => {
  
  try {
  await axios.patch(`/beauty/beauty_services/${id}/`, { ...product })
  await dispatch(getProduct(id))
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appServicesSlice = createSlice({
  name: 'appServices',
  initialState: {
    data: [],
    allServices: [],
    total: 0,
    params: {},
    loading: false,
    error: null,
    selectedService: null
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
      .addCase(getService.fulfilled, (state, action) => {
        state.selectedService = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.allServices = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllServices.pending, handlePending)
      .addCase(getService.pending, handlePending)
      .addCase(addService.pending, handlePending)
      .addCase(deleteService.pending, handlePending)
      .addCase(editService.pending, handlePending)
      .addCase(updateService.pending, handlePending)
      .addCase(updateService.rejected, handleRejected)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllServices.rejected, handleRejected)
      .addCase(getService.rejected, handleRejected)
      .addCase(addService.rejected, handleRejected)
      .addCase(deleteService.rejected, handleRejected)
      .addCase(editService.rejected, handleRejected)  
      .addCase(addService.fulfilled, handleFulfilled)
      .addCase(deleteService.fulfilled, handleFulfilled)
      .addCase(editService.fulfilled, handleFulfilled)
      .addCase(updateService.fulfilled, handleFulfilled)
  }
})

export default appServicesSlice.reducer