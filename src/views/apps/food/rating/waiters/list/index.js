import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
// ** User List Component
import Table from "./Table"

import { getAllWaiters } from "../../../../user/waiters/store"
import { getAllUsers } from "../../../../user/store"
import { getData } from '../../../stores/store'

// ** Styles
import "@styles/react/apps/app-users.scss"

const getFullData = async (type) => {
  let isFinished = false
  let page = 1
  let count = 0
  const acc = []
while (!isFinished) {
if (type  === "users") {
const { data, total } = await getAllUsers({page})
acc.push(...data)
count = total
}
if (type  === "waiters") {
const { data, total } = await getAllWaiters({page})
acc.push(...data)
count = total
}
if (acc.length === count) isFinished = true
page += 1
}

return acc
}


const RatingWaitersList = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [waiters, setWaiters] = useState([])
  const stores = useSelector(state => state.stores.data)


useEffect(() => {
  if (!stores.length) dispatch(getData())  
      const fetchData = async () => {
        const usersData = await getFullData("users")
        setUsers(usersData)
  
        const waitersData = await getFullData("waiters")
        setWaiters(waitersData)
      }  
fetchData()
}, [])

  return (
    <div className="app-user-list">
      <Table users={users} waiters={waiters} stores={stores} />
    </div>
  )
}

export default RatingWaitersList
