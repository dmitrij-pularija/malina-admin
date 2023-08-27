import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import { getAllStores } from '../../stores/store'
import { getAllWaiters } from "../../../user/waiters/store"
import "@styles/react/apps/app-users.scss"

const TablesList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!waiters.length) dispatch(getAllWaiters())
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Столы' data={[{ title: 'Структура' }, { title: 'Столы' }]} />
      <Table waiters={waiters} stores={stores} />
    </div>
  )
}

export default TablesList
