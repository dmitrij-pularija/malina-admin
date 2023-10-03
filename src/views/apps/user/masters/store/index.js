import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../../@core/components/errorMessage"
import axios from 'axios'
 
// export const getShifts = async () => {
//   try {
//   const { data: { results }} = await axios.get('/users/waiter-shifts/')
//   return results
// } catch (error) {
//   errorMessage(error.response.data.detail)
//   return thunkAPI.rejectWithValue(error)
// }
// }

export const getAllMasters = createAsyncThunk('appMasters/getAllMasters', async () => {
  try {
    let isFinished = false
    let page = 1
    const acc = []
    const { data: { count } } = await axios.get('/beauty/masters/')
    while (!isFinished) {
    const { data: { results } } = await axios.get('/beauty/masters/', { params: { perPage: 100, page }})
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

export const getMasters = createAsyncThunk('appMasters/getMasters', async params => {
try {
  const response = await axios.get('/beauty/masters/', { params })
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

export const getMaster = createAsyncThunk('appMasters/getMaster', async id => {
try {
  const { data } = await axios.get(`/beauty/masters/${id}`)
  return data
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const addMaster = createAsyncThunk('appMasters/addMaster', async ({ formData, avatar }, { dispatch, getState }) => {
  if (avatar && avatar.startsWith('data:image')) {
    const formDataImage = new FormData()
    try {  
      const avatarBlob = dataURLtoBlob(avatar)
      formDataImage.append('image', avatarBlob, 'avatar.jpg')
      const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
      formData.append('master_profile_picture', image)
    } catch (error) {
      errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }
try {
  await axios.post('/beauty/masters/', formData)
  await dispatch(getMasters(getState().masters.params))
  return { formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteMaster = createAsyncThunk('appMasters/deleteMaster', async (id, { dispatch, getState }) => {
try {
  await axios.delete(`/beauty/masters/${id}/`)
  await dispatch(getMasters(getState().masters.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})

export const editMaster = createAsyncThunk('appMasters/editMaster', async ({ id, formData, avatar }, { dispatch, getState }) => {
  if (avatar && avatar.startsWith('data:image')) {
    const formDataImage = new FormData()
    try {  
      const avatarBlob = dataURLtoBlob(avatar)
      formDataImage.append('image', avatarBlob, 'avatar.jpg')
      const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
      formData.append('master_profile_picture', image)
    } catch (error) {
      errorMessage(error.response.data ? Object.values(error.response.data).flatMap(errors => errors).join(', ') : error.message)
    }
    }  
 try {
  await axios.patch(`/beauty/masters/${id}/`, formData)
  await dispatch(getMasters(getState().masters.params))
  return { id, formData }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const appMastersSlice = createSlice({
  name: 'appMasters',
  initialState: {
    data: [],
    allMasters: [],
    total: 1,
    params: {},
    loading: false,
    error: null,
    selectedMaster: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMasters.fulfilled, (state, { payload: { data, params, total } }) => {
        state.data = data
        state.params = params
        state.total = total
        state.loading = false
        state.error = null
      })
      .addCase(getMaster.fulfilled, (state, action) => {
        state.selectedMaster = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAllMasters.fulfilled, (state, action) => {
        state.allMasters = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getMasters.pending, handlePending)
      .addCase(getMaster.pending, handlePending)
      .addCase(getAllMasters.pending, handlePending)
      .addCase(addMaster.pending, handlePending)
      .addCase(deleteMaster.pending, handlePending)
      .addCase(editMaster.pending, handlePending)
      .addCase(getMasters.rejected, handleRejected)
      .addCase(getMaster.rejected, handleRejected)
      .addCase(getAllMasters.rejected, handleRejected)
      .addCase(addMaster.rejected, handleRejected)
      .addCase(deleteMaster.rejected, handleRejected)
      .addCase(editMaster.rejected, handleRejected)
      .addCase(addMaster.fulfilled, handleFulfilled)
      .addCase(deleteMaster.fulfilled, handleFulfilled)
      .addCase(editMaster.fulfilled, handleFulfilled)
  }
})

export default appMastersSlice.reducer
