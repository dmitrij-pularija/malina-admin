import { useEffect, useState, Fragment } from "react"
import { useTranslation } from 'react-i18next'
import ProductDetails from "../edit/ProductDetails"
import BreadCrumbs from "@components/breadcrumbs"
import Loading from "../../../../../../@core/components/spinner/Loading"
import { Row, Col, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../categories/store"
import { getAllStores } from "../../../stores/store"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const addProduct = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [active, setActive] = useState("1")
  const categories = useSelector(state => state.productsCategories.allCategories)
  const stores = useSelector((state) => state.stores.allStores)
  const store = useSelector(state => state.auth.userData.id)

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!stores.length) dispatch(getAllStores())
  }, [])

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <>
      <Fragment>
        <BreadCrumbs
          title={t('productsData.titleAdd')}
          data={[{ title: t('Menu') }, { title: t('Products') }, { title: t('Creation') }]}
        />
        <div className="app-ecommerce-details">
          <Card>
            <CardBody>
              <Row>
              <ProductDetails 
               categories={categories} 
               store={store} 
               selectedProduct={null}
               t={t} 
               />  
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