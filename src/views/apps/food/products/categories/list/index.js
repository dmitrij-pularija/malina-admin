import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import { getAllStores } from '../../../stores/store'
import Loading from '../../../../../../@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const ProductsCategoriesList = () => {
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const stores = useSelector(state => state.stores.allStores)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
  }, [])

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title='Категории' data={[{ title: 'Меню' }, { title: 'Категории' }]} onClick={toggleSidebar} /> 
      <Table stores={stores} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
    <Loading />
    </>
  )
}

export default ProductsCategoriesList