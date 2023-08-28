import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingStoresList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)


useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о заведениях' data={[{ title: 'Отзывы' }, { title: 'о заведениях' }]} /> 
      <Table users={users} stores={stores} />
    </div>
  )
}

export default RatingStoresList
