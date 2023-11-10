import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { getAllStores } from '../../stores/store'
import { getAllWaiters } from "../../../user/waiters/store"
import { useTranslation } from 'react-i18next'
import "@styles/react/apps/app-users.scss"

const TablesList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!waiters.length) dispatch(getAllWaiters())
}, [])

const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="app-user-list">
      <Breadcrumbs title={t('Tables')} data={[{ title: t('Tables') }]}  onClick={toggleSidebar} /> 
      <Table waiters={waiters} store={store} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} t={t} />
      <Loading />
    </div>
  )
}

export default TablesList
