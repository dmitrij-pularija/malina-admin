// import { useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  // const stores = useSelector(state => state.stores.allStores)

  // useEffect(() => {
  //   if (!stores.length) dispatch(getAllStores())
  // }, [])

  const handleAdd = () => navigate('/apps/food/products/products/add/') 

  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Products')}  data={[{ title: t('Menu') }, { title: t('Products') }]} onClick={handleAdd} />
      <Table t={t} />
      <Loading />  
    </div>
  )
}

export default ProductsList