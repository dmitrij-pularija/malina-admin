import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import StoreDetails from './StoreDetails'
import BreadCrumbs from '@components/breadcrumbs'
import { Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getStore } from '../store'
import { getAllCategories, getSubCategories } from '../../categories/store'
import '@styles/react/apps/app-users.scss'
import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const store = useSelector(state => state.stores.selectedStore)
  const categories = useSelector(state => state.categories.allCategories)
  const subcategories = useSelector(state => state.categories.subcategories)

  // ** ComponentDidMount : Get product
  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!categories.length) dispatch(getSubCategories())
    dispatch(getStore(parseInt(id)))
  }, [])
  
  return (
    <Fragment>
      <BreadCrumbs title='Информация о заведении' data={[{ title: 'Структура' }, { title: 'Заведения' }, { title: 'Информация' }]} />
      <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
            {store ? <StoreDetails
                categories={categories}
                subcategories={subcategories}
                selectedStore={store}
              /> : <h4 className='alert-heading'>Информация о заведении c id:{id} не найдена</h4>}
            </CardBody>
          </Card>
      </div>
    </Fragment>
  )
}

export default Details
