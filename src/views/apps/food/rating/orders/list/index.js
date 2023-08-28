import { useDispatch, useSelector } from "react-redux"
import { useEffect} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingOrdersList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.allStores)


useEffect(() => {
  if (!stores.length) dispatch(getAllStores())  
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о заказах' data={[{ title: 'Отзывы' }, { title: 'о заказах' }]} /> 
      <Table stores={stores} />
      <Loading />  
    </div>
  )
}

export default RatingOrdersList
