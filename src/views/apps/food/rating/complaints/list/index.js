// import { useDispatch, useSelector } from "react-redux"
// import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { useTranslation } from 'react-i18next'
// import { getAllUsers } from "../../../../user/store"
// import { getAllStores } from '../../../stores/store'
import "@styles/react/apps/app-users.scss"

const RatingStoresList = () => {
const { t } = useTranslation()
  // const dispatch = useDispatch()
  // const stores = useSelector(state => state.stores.allStores)
  // const users = useSelector(state => state.users.allUsers)


// useEffect(() => {
//   if (!stores.length) dispatch(getAllStores())
//   if (!users.length) dispatch(getAllUsers())  
// }, [])

  return (
  <> 
    <div className="app-user-list">
    <Breadcrumbs title={t('complaintsData.title')} data={[{ title: t('complaintsData.title1') }, { title: t('complaintsData.title2') }]} /> 
      <Table t={t} />
    </div>
    <Loading />
  </>
  )
}

export default RatingStoresList
