// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import admin from './admin'
import businessBeauty from './businessBeauty'
import businessFood from './businessFood'
import user from './user'
import master from './master'
// import { getUserData } from "@utils"

// import foood from './foood'
// import beauty from './beauty'
// import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

// ** Merge & Export
// const [userData, setUserData] = useState(null)
// const { type } = JSON.parse(localStorage.getItem('userData'))

let menu = []
// const user = getUserData()
const localSettings = { type: 1, business: 0}
// const { type }  = useSelector(state => state.auth.userData)  
// useEffect(() => {
// const userData = localStorage.getItem('userData') || ''    
// const { type } = JSON.parse(userData)
const item = window.localStorage.getItem('userData')
if (item) {
    const {type, business} = JSON.parse(item)
    if (type) localSettings.type = type
    if (business) localSettings.business = business
}
// if (user) {
//     const {type, business} = user
//     if (type) localSettings.type = type
//     if (business) localSettings.business = business
// }
    if (localSettings.type === 1) menu = user
    if (localSettings.type === 2 && localSettings.business === 2) menu = businessBeauty
    if (localSettings.type === 2 && localSettings.business === 1) menu = businessFood
    if (localSettings.type === 3) menu = admin
    if (localSettings.type === 4) menu = master
// }, [])
// export default [...dashboards, ...foood, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others]
// export default [...beauty, ...foood]
export default [...menu]