import { useDispatch, useSelector } from "react-redux"
import { useEffect} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import { getData } from '../../../stores/store'

// ** Styles
import "@styles/react/apps/app-users.scss"

const RatingOrdersList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.data)


useEffect(() => {
  if (!stores.length) dispatch(getData())  
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title='Отзывы о заказах' data={[{ title: 'Отзывы' }, { title: 'о заказах' }]} /> 
      <Table stores={stores} />
    </div>
  )
}

export default RatingOrdersList
