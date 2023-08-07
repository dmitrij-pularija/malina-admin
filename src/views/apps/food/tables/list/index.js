import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
// ** User List Component
import Table from "./Table"

import { getData } from '../../stores/store'
import { getBranches } from '../../branches/store'

import { getAllWaiters } from "../../../user/waiters/store"
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

const TablesList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.data)
  const branches = useSelector(state => state.branches.data)
  const [waiters, setWaiters] = useState([])

useEffect(() => {
  if (!stores.length) dispatch(getData())
  if (!branches.length) dispatch(getBranches())
  const fetchData = async () => {
    const waitersData = await getFullData("waiters")
    setWaiters(waitersData)
  }  
fetchData()  
}, [])

  return (
    <div className="app-user-list">
      <Table waiters={waiters} stores={stores} branches={branches} />
    </div>
  )
}

export default TablesList
