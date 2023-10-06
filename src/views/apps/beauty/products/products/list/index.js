// import { useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import Table from './Table'
// import { getAllStores } from '../../../stores/store'
import Loading from '../../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
// import { Row, Col } from 'reactstrap'
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
// import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
// import { formatNumberInt } from '@utils'
import '@styles/react/apps/app-users.scss'

const ProductsList = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const stores = useSelector(state => state.stores.allStores)

  // useEffect(() => {
  //   if (!stores.length) dispatch(getAllStores())
  // }, [])

  const handleAdd = () => navigate('/apps/beauty/products/products/add/') 

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Товары' data={[{ title: 'Товары' }]} onClick={handleAdd} />
      <Table />
      <Loading />  
    </div>
  )
}

export default ProductsList