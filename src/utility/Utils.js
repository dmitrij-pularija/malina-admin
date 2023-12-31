import { array } from 'yup'
import { foodRoute, beautyRoute, masterRoute, adminRoute, userRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}


// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole, type) => {
  if (userRole === 'business' && type === 1) return foodRoute
  if (userRole === 'business' && type === 2) return beautyRoute
  if (userRole === 'admin') return adminRoute
  if (userRole === 'master') return masterRoute
  if (userRole === 'user') return userRoute
  // if (userRole === 'user') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const formatData = (value) => {
  return value ? new Date(value).toLocaleDateString('ru-Ru') : ""
}

export const formatDataTime = (value) => {
  return value ? new Date(value).toLocaleString('ru-Ru') : ""
}

export const formatTimeSave = (value) => {
  const date = new Date(value)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
export const formatStringTime = (value) => {
  if (value) {
  const time = value.toString()
  return time.slice(0, -3)
  } else return ''
}

export const formatTime = (value) => {
  if (value) {
  const data = value.toString()
  const time = data.split("T")[1]
  const response = time.slice(0, 5)
  
  return response
  } else return ''
}

export const formatDataTimetoDataSave = value => {
  let valueData = '' 
  if (Array.isArray(value)) {
    valueData = value[0]
  } else { 
    const parts = value.split(', ')
    const datePart = parts[0]
    const dateParts = datePart.split('.')
    const day = dateParts[0]
    const month = dateParts[1]
    const year = dateParts[2]
    valueData = new Date(year, month - 1, day)
}
    const formattedDate = `${valueData.getFullYear()}-${String(valueData.getMonth() + 1).padStart(2, '0')}-${String(valueData.getDate()).padStart(2, '0')}`
    return formattedDate    
}

export const formatDataSave = (value) => {
let valueData = '' 
if (value instanceof Date) {
  valueData = value
} else valueData = new Date(value)
const year = valueData.getFullYear()
const month = String(valueData.getMonth() + 1).padStart(2, '0')
const day = String(valueData.getDate()).padStart(2, '0')
return `${year}-${month}-${day}`
}

export const formatDataTimeSave = (value) => {
  let valueData
  if (typeof value === 'string') {
    const [datePart, timePart] = value.split(', ')
    const [day, month, year] = datePart.split('.').map(Number)
    const [hours, minutes, seconds] = timePart.split(':').map(Number)
    valueData = new Date(year, month - 1, day, hours, minutes, seconds)
  } else {
    valueData = new Date(value)
  }
 
  const year = valueData.getFullYear()
  const month = String(valueData.getMonth() + 1).padStart(2, '0')
  const day = String(valueData.getDate()).padStart(2, '0')
  const hours = String(valueData.getHours()).padStart(2, '0')
  const minutes = String(valueData.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
  }

export const formatNumber = (value) => {
  const formattedNumber = Number(value).toLocaleString('ru', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formattedNumber
}

export const formatNumberInt = (value) => {
  const integerValue = parseInt(value)
  const formattedNumber = integerValue.toLocaleString('ru')
  return formattedNumber
}

export const getRate = (ratingArray) => {
  if (!ratingArray || ratingArray.length === 0) return 0

  const sum = ratingArray.reduce((accumulator, item) => accumulator + item.star__value, 0)
  const average = sum / ratingArray.length

  return Math.round(average)
}

export const handlePending = (state) => {
  state.error = null
  state.loading = true
}

export const handleFulfilled = (state) => {
  state.loading = false
}

export const handleRejected = (state, { payload }) => {
  state.loading = false
  state.error = payload
}

export const checkIsValid = (data, requiredFields) => {
  return Object.keys(data).every((key) => {
    const field = data[key]
    if (requiredFields.includes(key)) {
      if (typeof field === "object") {
        return field.value !== "" || field.value > 0
      } else {
        return field.length > 0 || field > 0
      }
    } else {
      return true
    }
  })
}

export const dataURLtoBlob = dataURL => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], { type: mime })
}

export const initSelect = (option, value) => {
  if (!option && !value) return ''
  if (!option && value) return value
  return option[option.findIndex(i => parseInt(i.value) === parseInt(value))] || ''
}

export const initSelectString = (option, value) => {
  if (!option && !value) return ''
  if (!option && value) return value
  return option[option.findIndex(i => i.value === value)] || ''
}

export const arraysAreEqual = (arr1, arr2) => {
  // console.log(arr1, arr2)
  if (arr1.length !== arr2.length) return false
  return arr1.reduce((isEqual, currentValue, index) => {
    return isEqual && currentValue === arr2[index]
  }, true)
}