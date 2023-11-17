import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../../food/stores/store'
import "@styles/react/apps/app-users.scss"

const RatingMastersList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)
  const { userData } = useSelector(state => state.auth)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
  <>
    <div className="app-user-list">
      <Breadcrumbs title={t('BeautyComplaintsTitle')} data={[{ title:  t('Feedback') }, { title: t('Beauty Complaints') }]} /> 
      <Table users={users} stores={stores} userData={userData} t={t} />
    </div>
    <Loading />
  </>
  )
}

export default RatingMastersList