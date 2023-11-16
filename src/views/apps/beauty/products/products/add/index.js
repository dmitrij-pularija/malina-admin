import { useEffect, Fragment } from "react"
import ProductDetails from "../edit/ProductDetails"
import BreadCrumbs from "@components/breadcrumbs"
import { useTranslation } from 'react-i18next'
import Loading from "../../../../../../@core/components/spinner/Loading"
import { Row, Col, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from '../../../../food/stores/store'
import { getAllCategories } from '../../categories/store'
import { getAllProducts } from '../store'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const addProduct = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const categories = useSelector(state => state.beautyProductsCategories.allCategories)
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector((state) => state.stores.allStores)
  const products = useSelector((state) => state.productsBeauty.allProducts)

  
  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!stores.length) dispatch(getAllStores())
    if (!products.length) dispatch(getAllProducts())
  }, [])

  return (
    <>
      <Fragment>
        <BreadCrumbs
          title={t('BeautyProductData.titleAdd')}
          data={[{ title: t('Goods') }, { title: t('Creation') }]}
        />
        <div className="app-ecommerce-details">
          <Card>
            <CardBody>
              <Row>
              <ProductDetails categories={categories} store={store} stores={stores} products={products} selectedProduct={null} t={t} />  
              </Row>
            </CardBody>
          </Card>
        </div>
      </Fragment>
      <Loading />
    </>
  )
}

export default addProduct