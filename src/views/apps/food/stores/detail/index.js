import { useEffect, Fragment } from "react"
import { useParams, Link } from "react-router-dom"
import StoreDetails from "./StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
import { Alert, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getStore } from "../store"
import { getAllCategories, getSubCategories } from "../../categories/store"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedStore, loading} = useSelector((state) => state.stores)
  // const store = useSelector((state) => state.stores.selectedStore)
  const categories = useSelector((state) => state.categories.allCategories)
  const subcategories = useSelector((state) => state.categories.subcategories)

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!subcategories.length) dispatch(getSubCategories())
    dispatch(getStore(parseInt(id)))
  }, [])

  return (
    <Fragment>
      <BreadCrumbs
        title="Информация о заведении"
        data={[
          { title: "Структура" },
          { title: "Заведения" },
          { title: "Информация" }
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {selectedStore ? (
              <>
              <StoreDetails
                categories={categories}
                subcategories={subcategories}
                selectedStore={selectedStore}
              />
              <Loading />
              </>
            ) : (
              loading ? <Loading /> : <Alert color="danger">
                <h4 className="alert-heading">Заведение не найдено</h4>
                <div className="alert-body">
                  Информация о заведении с id: {id} не доступка. Проверьте
                  список заведений:{" "}
                  <Link to="/apps/food/stores/list">Список заведений</Link>
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