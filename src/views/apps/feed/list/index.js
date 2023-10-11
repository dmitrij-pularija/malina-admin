import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import { getAllStores } from '../../food/stores/store'
import Loading from '../../../../@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const ProductsCategoriesList = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const stores = useSelector(state => state.stores.allStores)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
  }, [])

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title='Публикации' data={[{ title: 'Публикации' }]} onClick={toggleModal} /> 
      <Table stores={stores} modalOpen={modalOpen} toggleModal={toggleModal} />
    </div>
    <Loading />
    </>
  )
}

export default ProductsCategoriesList