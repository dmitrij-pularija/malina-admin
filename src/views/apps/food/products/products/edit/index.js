import { useEffect, useState, Fragment } from "react"
import { useParams, Link } from "react-router-dom"
import ProductTabs from "../view/Tabs"
import BreadCrumbs from "@components/breadcrumbs"
import { Alert, Row, Col, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../categories/store"
import { getAllStores } from "../../../stores/store"
import { getProduct } from "../store"
import Loading from "../../../../../../@core/components/spinner/Loading"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [active, setActive] = useState("1")
  const { selectedProduct, loading } = useSelector((state) => state.products)
  const categories = useSelector(state => state.productsCategories.allCategories)
  const stores = useSelector((state) => state.stores.allStores)
  const store = useSelector(state => state.auth.userData.id)

  useEffect(() => {
    dispatch(getProduct(parseInt(id)))
    if (!categories.length) dispatch(getAllCategories())
    if (!stores.length) dispatch(getAllStores())
  }, [])

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <BreadCrumbs
        title="Редактирование блюда"
        data={[
          { title: "Меню" },
          { title: "Блюда" },
          { title: "Редактирование" },
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {selectedProduct ? (
              <Row>
                <Col className="d-flex flex-column align-items-center justify-content-center width">
                  <ProductTabs
                    categories={categories}
                    store={store}
                    selectedProduct={selectedProduct}
                    active={active}
                    toggleTab={toggleTab}
                  />
                </Col>
              </Row>
            ) : (
              <Alert color="danger">
                <h4 className="alert-heading">Блюдо не найдено</h4>
                <div className="alert-body">
                  Информация о блюде с id: {id} не доступка. Проверьте список
                  блюд:{" "}
                  <Link to="/apps/food/products/products/list">
                    Список блюд
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