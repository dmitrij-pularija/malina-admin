import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../../food/stores/store'
import "@styles/react/apps/app-users.scss"

const RatingMastersList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
  <>
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о заказах' data={[{ title: 'Отзывы' }, { title: 'о заказах' }]} /> 
      <Table users={users} stores={stores} />
    </div>
    <Loading />
  </>
  )
}

export default RatingMastersList