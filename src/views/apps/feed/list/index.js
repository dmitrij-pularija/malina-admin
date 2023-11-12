import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import { getAllStores } from '../../food/stores/store'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const ProductsCategoriesList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const stores = useSelector(state => state.stores.allStores)
  const { userData } = useSelector(state => state.auth)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
  }, [])

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title={t('Feeds')} data={[{ title: t('Feeds') }]} onClick={toggleModal} /> 
      <Table stores={stores} userData={userData} modalOpen={modalOpen} toggleModal={toggleModal} t={t} />
    </div>
    <Loading />
    </>
  )
}

export default ProductsCategoriesList