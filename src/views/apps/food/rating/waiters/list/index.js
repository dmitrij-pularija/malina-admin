import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Table from "./Table"
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import { getAllWaiters } from "../../../../user/waiters/store"
import { getAllUsers } from "../../../../user/store"
import { getAllStores } from '../../../stores/store'
import { useTranslation } from 'react-i18next'
import "@styles/react/apps/app-users.scss"

const RatingWaitersList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const stores = useSelector(state => state.stores.allStores)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const users = useSelector(state => state.users.allUsers)
  const { userData } = useSelector(state => state.auth)

useEffect(() => {
  if (!waiters.length) dispatch(getAllWaiters())
  if (!stores.length) dispatch(getAllStores())
  if (!users.length) dispatch(getAllUsers())  
}, [])

  return (
  <>
    <div className="app-user-list">
    <Breadcrumbs title={t('staffRatingData.title')} data={[{ title: t('staffRatingData.title1') }, { title: t('staffRatingData.title2') }]} /> 
      <Table userData={userData} users={users} waiters={waiters} stores={stores} t={t} />
    </div>
    <Loading />
  </>
  )
}

export default RatingWaitersList