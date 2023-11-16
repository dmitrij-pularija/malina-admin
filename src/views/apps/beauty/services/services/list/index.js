import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import Table from './Table'
import { getAllStores } from '../../../../food/stores/store'
import { getAllMasters } from '../../../../user/masters/store'
import { getAllCategories } from '../../../services/categories/store'
import Loading from '../../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const ServicesList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector(state => state.stores.allStores)
  const masters = useSelector(state => state.masters.allMasters)
  const categories = useSelector(state => state.serviceCategories.allCategories)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!masters.length) dispatch(getAllMasters())
    if (!categories.length) dispatch(getAllCategories())
  }, [])

  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Services')} data={[{ title: t('Services') }]} onClick={toggleModal} />
      <Table store={store} stores={stores} masters={masters} categories={categories} modalOpen={modalOpen} toggleModal={toggleModal} t={t} />
      <Loading />  
    </div>
  )
}

export default ServicesList