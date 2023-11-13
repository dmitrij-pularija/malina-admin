// import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
// import { getAllStores } from '../../../food/stores/store'
import Loading from '../../../../../@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const ProductsCategoriesList = () => {
  // const dispatch = useDispatch()
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // const { userData } = useSelector(state => state.auth)
  // const stores = useSelector(state => state.stores.allStores)

  // useEffect(() => {
  //   if (!stores.length) dispatch(getAllStores())
  // }, [])

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title={t('Chefs')} data={[{ title: t('Users') }, { title: t('Chefs') }]} onClick={toggleSidebar} /> 
      <Table sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} t={t} />
    </div>
    <Loading />
    </>
  )
}

export default ProductsCategoriesList