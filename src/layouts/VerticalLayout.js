import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from "react-redux"
// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
// import navigation from '@src/navigation/vertical'
import admin from '@src/navigation/vertical/admin'
import businessBeauty from '@src/navigation/vertical/businessBeauty'
import businessFood from '@src/navigation/vertical/businessFood'
import user from '@src/navigation/vertical/user'
import master from '@src/navigation/vertical/master'


const VerticalLayout = props => {
  const menu = []
  const { userData } = useSelector(state => state.auth)
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
// <Layout menuData={navigation} {...props}> 
  useEffect(() => {
    // if (userData) {
      if (userData.type === 1) menu.push(...user)
      if (userData.type === 2 && userData.business === 2) menu.push(...businessBeauty)
      if (userData.type === 2 && userData.business === 1) menu.push(...businessFood)
      if (userData.type === 3) menu.push(...admin)
      if (userData.type === 4) menu.push(...master)
    // }
  }, [])

  return (
    <Layout menuData={menu} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
