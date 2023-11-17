import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import { useNavigate } from 'react-router-dom'
import StoreList from './StoreList'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-ecommerce.scss'

const Stores = () => {
  const [activeView, setActiveView] = useState('grid')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleAdd = () => navigate('/apps/food/stores/add/') 

  return (
    <Fragment>
      <Breadcrumbs title={t('Store')} data={[{ title: t('Store') }]} onClick={handleAdd} />
      <StoreList
        t={t}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <Loading />
    </Fragment>
  )
}
export default Stores