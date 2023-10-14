import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from 'react-router-dom'
import Table from './Table'
import { getAllStores } from '../../../../food/stores/store'
import { getAllMasters } from '../../../../user/masters/store'
import { getAllCategories } from '../../../services/categories/store'
import Loading from '../../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
// import { Row, Col } from 'reactstrap'
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
// import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
// import { formatNumberInt } from '@utils'
import '@styles/react/apps/app-users.scss'

const ServicesList = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  // const navigate = useNavigate()
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector(state => state.stores.allStores)
  const masters = useSelector(state => state.masters.allMasters)
  const categories = useSelector(state => state.serviceCategories.allCategories)


  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!masters.length) dispatch(getAllMasters())
    if (!categories.length) dispatch(getAllCategories())
  }, [])

  // const handleAdd = () => navigate('/apps/beauty/products/products/add/') 

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Услуги' data={[{ title: 'Услуги' }]} onClick={toggleModal} />
      <Table store={store} stores={stores} masters={masters} categories={categories} modalOpen={modalOpen} toggleModal={toggleModal} />
      <Loading />  
    </div>
  )
}

export default ServicesList