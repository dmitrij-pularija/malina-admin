import { useEffect, Fragment } from "react"
import StoreDetails from "../detail/StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories, getSubCategories } from "../../categories/store"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const Details = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.allCategories)
  const subcategories = useSelector((state) => state.categories.subcategories)

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!subcategories.length) dispatch(getSubCategories())
  }, [])

  return (
    <Fragment>
      <BreadCrumbs
        title="Создание заведения"
        data={[
          { title: "Структура" },
          { title: "Заведения" },
          { title: "Создание" }
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {categories.length && subcategories.length && (
              <StoreDetails
                categories={categories}
                subcategories={subcategories}
                selectedStore={null}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Details