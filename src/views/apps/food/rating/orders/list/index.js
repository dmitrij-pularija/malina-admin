import { useDispatch, useSelector } from "react-redux"
import { useEffect} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../../src/@core/components/spinner/Loading'
import Table from "./Table"
import { getAllStores } from '../../../stores/store'
import { useTranslation } from 'react-i18next'
import "@styles/react/apps/app-users.scss"

const RatingOrdersList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const stores = useSelector(state => state.stores.allStores)
  const { userData } = useSelector(state => state.auth)

useEffect(() => {
  if (!stores.length) dispatch(getAllStores())  
}, [])

  return (
    <div className="app-user-list">
      <Breadcrumbs title={t('orderRatingData.title')} data={[{ title: t('orderRatingData.title1') }, { title: t('orderRatingData.title2') }]} />
      <Table userData={userData} stores={stores} t={t} />
      <Loading />  
    </div>
  )
}

export default RatingOrdersList
