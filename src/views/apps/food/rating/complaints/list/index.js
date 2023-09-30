// import { useDispatch, useSelector } from "react-redux"
// import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
// import { getAllUsers } from "../../../../user/store"
// import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingStoresList = () => {
  // const dispatch = useDispatch()
  // const stores = useSelector(state => state.stores.allStores)
  // const users = useSelector(state => state.users.allUsers)


// useEffect(() => {
//   if (!stores.length) dispatch(getAllStores())
//   if (!users.length) dispatch(getAllUsers())  
// }, [])

  return (
  <> 
    <div className="app-user-list">
      <Breadcrumbs title='О блюдах' data={[{ title: 'Отзывы' }, { title: 'о блюдах' }]} /> 
      <Table />
    </div>
    <Loading />
  </>
  )
}

export default RatingStoresList