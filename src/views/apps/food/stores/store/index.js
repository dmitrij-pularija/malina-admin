import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'

export const addStoreImage = async ({ formData }) => {
  // const formDataImage = new FormData()
  // const imageBlob = dataURLtoBlob(galery.image)
  // formDataImage.append('image', imageBlob, 'work.jpg')
  // try {
  //   const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
  //   store.image = image
  //   } catch (error) {
  //     errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  //   }
  try {
  const { data } = await axios.post('/users/business-images/', formData)
  return data
} catch (error) {
  errorMessage(error.response.data.detail)
}
}

export const delStoreImage = async id => {
  try {
  await axios.delete(`/users/business-images/${id}/`)
} catch (error) {
  errorMessage(error.response.data.detail)
}
}

export const getStoreImage = async id => {
  try {
  const { data: { results } } = await axios.get(`/users/business-images/${id}/`)
  return results
} catch (error) {
  errorMessage(error.response ? error.response.data.detail : error.message)
}
}




export const getDelivery = async id => {
  try {
  const { data: { results }} = await axios.get(`/users/deliverytariffs?business__id=${id}`)
  return results
} catch (error) {
  errorMessage(error.response.data.detail)
  // return thunkAPI.rejectWithValue(error)
}
}

export const addDelivery = async (deliverytariffs) => {
  try {
  await axios.post('/users/deliverytariffs/', deliverytariffs)
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  // return thunkAPI.rejectWithValue(error)
}
}

export const editDelivery = async (id, formData) => {
  try {
  await axios.put(`/users/deliverytariffs/${id}/`, formData)
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  // return thunkAPI.rejectWithValue(error)
}
}

export const delDelivery = async (id) => {
  try {
  await axios.delete(`/users/deliverytariffs/${id}/`)
} catch (error) {
  errorMessage(error.response.data.detail)
  // return thunkAPI.rejectWithValue(error)
}
}

export const getShifts = async () => {
  try {
  const { data: { results }} = await axios.get(`/users/waiter-shifts/`)
  return results
} catch (error) {
  errorMessage(error.response.data.detail)
  // return thunkAPI.rejectWithValue(error)
}
}

export const addShifts = async (shifts) => {
  try {
  await axios.post('/users/waiter-shifts/', shifts)
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  // return thunkAPI.rejectWithValue(error)
}
}

export const editShifts = async (id, formData) => {
  try {
  await axios.put(`/users/waiter-shifts/${id}/`, formData)
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  // return thunkAPI.rejectWithValue(error)
}
}

export const delShifts = async (id) => {
  try {
  await axios.delete(`/users/waiter-shifts/${id}/`)
} catch (error) {
  errorMessage(error.response.data.detail)
  // return thunkAPI.rejectWithValue(error)
}
}


export const getBusiness = async login => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/users/businesses/')
  
    while (!isFinished) {
    const { data: { results } } = await axios.get('/users/businesses', { params: { perPage: 100, page } })
    acc.push(...results)
    if (acc.length === count) isFinished = true
    page += 1
    }
    const findedStore = acc.find(store => store.login === login)
    return findedStore ? findedStore.business_type : 0
} catch (error) {
  errorMessage(error.response.data.detail)
}
}


export const getAllStores = createAsyncThunk('appStores/getAllStores', async () => {
  try {
  let isFinished = false
  let page = 1
  const acc = []
  const { data: { count } } = await axios.get('/users/businesses/')

  while (!isFinished) {
  const { data: { results } } = await axios.get('/users/businesses', { params: { perPage: 100, page } })
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

export const getData = createAsyncThunk('appStores/getData', async params => {
  try {
  const response = await axios.get('/users/businesses', { params })
  return {
    params,
    loading: false,
    error: null,
    data: response.data.results,
    total: response.data.count
  }
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const getStore = createAsyncThunk('appStores/getStore', async id => {
  try {
  const response = await axios.get(`/users/businesses/${id}/`)
  return response.data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addStore = createAsyncThunk('appStores/addStore', async ({ store, avatar }, { dispatch, getState }) => {
  if (avatar && avatar.startsWith('data:image')) {
    const formDataImage = new FormData()
    try {  
      const avatarBlob = dataURLtoBlob(avatar)
      formDataImage.append('image', avatarBlob, 'avatar.jpg')
      const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
      store.avatar = image
    } catch (error) {
      errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  try {
  await axios.post('/users/businesses/', store)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const editStore = createAsyncThunk('appStores/editStore', async ({ id, store, avatar }, { dispatch, getState }) => {
  if (avatar && avatar.startsWith('data:image')) {
    const formDataImage = new FormData()
    try {  
      const avatarBlob = dataURLtoBlob(avatar)
      formDataImage.append('image', avatarBlob, 'avatar.jpg')
      const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
      store.avatar = image
    } catch (error) {
      errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
  try {
  await axios.patch(`/users/businesses/${ id }/`, store)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
  return id
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteStore = createAsyncThunk('appStores/deleteStore', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/users/businesses/${ id }/`)
  await dispatch(getData(getState().stores.params))
  await dispatch(getAllStores())
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const appStoresSlice = createSlice({
  name: 'appStores',
  initialState: {
    data: [],
    allStores: [],
    total: 1,
    params: {},
    selectedStore: null
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
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.allStores = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getStore.pending, (state, action) => {
        state.selectedStore = null
        state.loading = true
        state.error = null
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.selectedStore = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getData.pending, handlePending)
      .addCase(getAllStores.pending, handlePending)
      .addCase(editStore.pending, handlePending)
      .addCase(deleteStore.pending, handlePending)
      .addCase(getData.rejected, handleRejected)
      .addCase(getAllStores.rejected, handleRejected)
      .addCase(editStore.rejected, handleRejected)
      .addCase(getStore.rejected, handleRejected)
      .addCase(deleteStore.rejected, handleRejected)
      .addCase(editStore.fulfilled, handleFulfilled)
      .addCase(deleteStore.fulfilled, handleFulfilled)

  }
})

export default appStoresSlice.reducer