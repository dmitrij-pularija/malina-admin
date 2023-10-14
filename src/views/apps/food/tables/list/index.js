import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { getAllStores } from '../../stores/store'
import { getAllWaiters } from "../../../user/waiters/store"
import "@styles/react/apps/app-users.scss"

const TablesList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!waiters.length) dispatch(getAllWaiters())
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Столы' data={[{ title: 'Структура' }, { title: 'Столы' }]} />
      <Table waiters={waiters} store={store} />
      <Loading />
    </div>
  )
}

export default TablesList
