import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import Table from "./Table"
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@components/breadcrumbs'
import { getAllStores } from '../../../../food/stores/store'
import { getAllCategories } from '../../../../food/categories/store'
import Loading from '../../../../../../@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const ProductsCategoriesList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const stores = useSelector(state => state.stores.allStores)
  const store = useSelector(state => state.auth.userData.id)
  const categories = useSelector(state => state.categories.allCategories)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!categories.length) dispatch(getAllCategories())
  }, [])

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title={t('Categories')} data={[{ title: t('Services') }, { title: t('Categories') }]} onClick={toggleSidebar} /> 
      <Table store={store} categories={categories} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} t={t} />
    </div>
    <Loading />
    </>
  )
}

export default ProductsCategoriesList