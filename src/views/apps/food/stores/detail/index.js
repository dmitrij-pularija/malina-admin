// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
// import ItemFeatures from './ItemFeatures'
import StoreDetails from './StoreDetails'
// import RelatedProducts from './RelatedProducts'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getStore } from '../store'
import { getCategories, getSubCategories } from '../../categories/store'



import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const { id } = useParams()
  // const params = useParams().product
  // const productId = params.substring(params.lastIndexOf('-') + 1)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.stores.selectedStore)
  const categories = useSelector(state => state.categories.data)
  const subcategories = useSelector(state => state.categories.subcategories)

  // ** ComponentDidMount : Get product
  useEffect(() => {
    if (!categories.length) dispatch(getCategories())
    if (!subcategories.length) dispatch(getSubCategories())
    dispatch(getStore(parseInt(id)))
  }, [])
  // console.log(data)
  return (
    <Fragment>
      <BreadCrumbs title='Информация о заведении' data={[{ title: 'Структура' }, { title: 'Заведения' }, { title: 'Информация' }]} />
      <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
            {store && <StoreDetails
                categories={categories}
                subcategories={subcategories}
                data={store}
              />}
            </CardBody>
          </Card>
      </div>
    </Fragment>
  )
}

export default Details
