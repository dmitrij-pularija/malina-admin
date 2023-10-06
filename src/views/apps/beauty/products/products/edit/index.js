import { useEffect, useState, Fragment } from "react"
import { useParams, Link } from "react-router-dom"
// import ProductTabs from "../view/Tabs"
import ProductDetails from "./ProductDetails"
import BreadCrumbs from "@components/breadcrumbs"
import { Alert, Row, Col, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from '../../../../food/stores/store'
import { getAllCategories } from '../../categories/store'
import { getProduct, getAllProducts } from "../store"
import Loading from "../../../../../../@core/components/spinner/Loading"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // const [active, setActive] = useState("1")
  const { selectedProduct, allProducts, loading } = useSelector((state) => state.productsBeauty)
  const categories = useSelector(state => state.beautyProductsCategories.allCategories)
  const stores = useSelector((state) => state.stores.allStores)

  useEffect(() => {
    dispatch(getProduct(parseInt(id)))
    if (!categories.length) dispatch(getAllCategories())
    if (!stores.length) dispatch(getAllStores())
    if (!allProducts.length) dispatch(getAllProducts())
  }, [])

  // const toggleTab = (tab) => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <BreadCrumbs
        title="Редактирование товара"
        data={[
          { title: "Товары" },
          { title: "Редактирование" }
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {selectedProduct ? (
              <Row>
                <Col className="d-flex flex-column align-items-center justify-content-center width">
                  <ProductDetails
                    categories={categories} 
                    stores={stores} 
                    products={allProducts} 
                    selectedProduct={selectedProduct}
                  />
                </Col>
              </Row>
            ) : (
              <Alert color="danger">
                <h4 className="alert-heading">Товар не найден</h4>
                <div className="alert-body">
                  Информация о товаре с id: {id} не доступна. Проверьте список
                  товаров:{" "}
                  <Link to="/apps/beauty/products/products/list">
                    Список товаров
                  </Link>
                </div>
              </Alert>
            )}
          </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Details