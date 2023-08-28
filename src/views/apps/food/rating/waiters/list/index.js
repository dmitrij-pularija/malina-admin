import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"

import { getAllWaiters } from "../../../../user/waiters/store"
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../stores/store'

// ** Styles
import "@styles/react/apps/app-users.scss"

// const getFullData = async (type) => {
//   let isFinished = false
//   let page = 1
//   let count = 0
//   const acc = []
// while (!isFinished) {
// if (type  === "users") {
// const { data, total } = await getAllUsers({page})
// acc.push(...data)
// count = total
// }
// if (type  === "waiters") {
// const { data, total } = await getAllWaiters({page})
// acc.push(...data)
// count = total
// }
// if (acc.length === count) isFinished = true
// page += 1
// }

// return acc
// }


const RatingWaitersList = () => {
  const dispatch = useDispatch()
  // const [users, setUsers] = useState([])
  // const [waiters, setWaiters] = useState([])
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const users = useSelector(state => state.users.allUsers)




useEffect(() => {
  if (!waiters.length) dispatch(getAllWaiters())
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о персонале' data={[{ title: 'Отзывы' }, { title: 'о персонале' }]} /> 
      <Table users={users} waiters={waiters} stores={stores} />
    </div>
  )
}

export default RatingWaitersList
