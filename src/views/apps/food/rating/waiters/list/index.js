import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import { getAllWaiters } from "../../../../user/waiters/store"
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingWaitersList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const users = useSelector(state => state.users.allUsers)

useEffect(() => {
  if (!waiters.length) dispatch(getAllWaiters())
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
  <>
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о персонале' data={[{ title: 'Отзывы' }, { title: 'о персонале' }]} /> 
      <Table users={users} waiters={waiters} stores={stores} />
    </div>
    <Loading />
  </>
  )
}

export default RatingWaitersList