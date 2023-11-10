import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { useTranslation } from 'react-i18next'
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingStoresList = () => {
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
      <Breadcrumbs title={t('storesData.title')} data={[{ title: t('storesData.title1') }, { title: t('storesData.title2') }]} /> 
      <Table userData={userData} users={users} stores={stores} t={t} />
    </div>
    <Loading />
  </>
  )
}

export default RatingStoresList
