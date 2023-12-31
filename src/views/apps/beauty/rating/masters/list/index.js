import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { useTranslation } from 'react-i18next'
import Table from "./Table"
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import { getAllMasters } from "../../../../user/masters/store"
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../../food/stores/store'
import "@styles/react/apps/app-users.scss"

const RatingMastersList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const stores = useSelector(state => state.stores.allStores)
  const masters = useSelector(state => state.masters.allMasters)
  const users = useSelector(state => state.users.allUsers)
  const { userData } = useSelector(state => state.auth)

useEffect(() => {
  if (!masters.length) dispatch(getAllMasters())
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
  <>
    <div className="app-user-list">
      <Breadcrumbs title={t('ReviewsMastersTiile')} data={[{ title: t('rewards') }, { title: t('Reviews about Specialties') }]} /> 
      <Table userData={userData} users={users} masters={masters} stores={stores} t={t} />
    </div>
    <Loading />
  </>
  )
}

export default RatingMastersList