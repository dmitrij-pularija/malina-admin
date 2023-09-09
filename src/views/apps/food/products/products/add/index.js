import { useEffect, useState, Fragment } from "react"
import ProductTabs from "../view/Tabs"
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
  const [active, setActive] = useState("1")
  const categories = useSelector(
    (state) => state.productsCategories.allCategories
  )
  const stores = useSelector((state) => state.stores.allStores)

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
          title="Создание блюда"
          data={[{ title: "Меню" }, { title: "Блюда" }, { title: "Создание" }]}
        />
        <div className="app-ecommerce-details">
          <Card>
            <CardBody>
              <Row>
                <Col className="d-flex flex-column align-items-center justify-content-center width">
                  <ProductTabs
                    categories={categories}
                    stores={stores}
                    selectedProduct={null}
                    active={active}
                    toggleTab={toggleTab}
                  />
                </Col>
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