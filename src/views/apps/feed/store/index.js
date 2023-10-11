import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handlePending, handleFulfilled, handleRejected, dataURLtoBlob } from "@utils"
import errorMessage from "../../../../@core/components/errorMessage"
import axios from 'axios'

export const delImages = async id => {
  try {
  await axios.delete(`/image/upload/${id}/`)
} catch (error) {
  errorMessage(error.response.data.detail)
}
}


export const getFeeds = createAsyncThunk('appFeeds/getFeeds', async params => {
  try {
  const response = await axios.get('/feed/article/', { params })
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

export const editFeed = createAsyncThunk('appFeeds/editFeed', async ({ id, feed, galery }, { dispatch, getState }) => {
const acc = []
const newGalery = galery && galery.length ? galery.filter(img => !img.name) : []
const oldGalery = galery && galery.length ? galery.filter(img => img.name) : []
let nid = oldGalery.length ? oldGalery.reduce((max, obj) => (obj.id > max ? obj.id : max), oldGalery[0].id) : 0
if (oldGalery && oldGalery.length) acc.push(...oldGalery)
  const count = newGalery ? newGalery.length : 0
  try {
  for (let i = 0; i < count; i += 1) {
  if (newGalery && newGalery.length && newGalery[i].link.startsWith('data:image')) {
    const formDataImage = new FormData()
    const imageBlob = dataURLtoBlob(newGalery[i].link)
    formDataImage.append('image', imageBlob, 'feed.jpg')
    try {
    const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
    const name = image.substring(image.lastIndexOf("/") + 1)
    nid++
    // acc.push({id: parseInt(nid), link: image, name})
    acc.push({link: image, name})
    } catch (error) {
      errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
      return thunkAPI.rejectWithValue(error)
    }
    }
  }
  feed.images = acc
  
  await axios.patch(`/feed/article/${id}/`, feed)
  await dispatch(getFeeds(getState().feeds.params))
  return { id, feed }
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const addFeed = createAsyncThunk('appFeeds/addFeed', async ({ feed, galery }, { dispatch, getState }) => {
  const acc = []
  const count = galery ? galery.length : 0
  try {
  for (let i = 0; i < count; i += 1) {
  if (galery && galery.length && galery[i].link.startsWith('data:image')) {
    const formDataImage = new FormData()
    const imageBlob = dataURLtoBlob(galery[i].link)
    formDataImage.append('image', imageBlob, 'feed.jpg')
    try {
    const { data: { image } } = await axios.post(`/image/upload/`, formDataImage)
    const name = image.substring(image.lastIndexOf("/") + 1)
    acc.push({link: image, name})
    } catch (error) {
      errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
      return thunkAPI.rejectWithValue(error)
    }
    }
  }
  feed.images = acc
  await axios.post('/feed/article/', feed)
  await dispatch(getFeeds(getState().feeds.params))
  return feed
} catch (error) {
  errorMessage(error.response.data ? Object.entries(error.response.data).flatMap(errors => errors).join(', ') : error.message)
  return thunkAPI.rejectWithValue(error)
}
})

export const deleteFeed = createAsyncThunk('appFeeds/deleteFeed', async (id, { dispatch, getState }) => {
  try {
  await axios.delete(`/feed/article/${id}/`)
  await dispatch(getFeeds(getState().feeds.params))
  return id
} catch (error) {
  errorMessage(error.response.data.detail)
  return thunkAPI.rejectWithValue(error)
}
})


export const appFeedSlice = createSlice({
  name: 'appFeeds',
  initialState: {
    data: [],
    loading: false,
    error: null,
    total: 0,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
        state.error = null
      })
      .addCase(getFeeds.pending, handlePending)
      .addCase(editFeed.pending, handlePending)
      .addCase(addFeed.pending, handlePending)
      .addCase(deleteFeed.pending, handlePending)
      .addCase(getFeeds.rejected, handleRejected)
      .addCase(editFeed.rejected, handleRejected)
      .addCase(addFeed.rejected, handleRejected)
      .addCase(deleteFeed.rejected, handleRejected)
      .addCase(editFeed.fulfilled, handleFulfilled)
      .addCase(addFeed.fulfilled, handleFulfilled)
      .addCase(deleteFeed.fulfilled, handleFulfilled)
  }
})

export default appFeedSlice.reducer