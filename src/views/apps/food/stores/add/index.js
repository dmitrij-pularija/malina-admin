import { useEffect, Fragment } from "react"
import { useTranslation } from 'react-i18next'
import StoreDetails from "../detail/StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories, getSubCategories } from "../../categories/store"
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const Details = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const categories = useSelector((state) => state.categories.allCategories)
  const subcategories = useSelector((state) => state.categories.subcategories)

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!subcategories.length) dispatch(getSubCategories())
  }, [])

  return (
    <>
    <Fragment>
      <BreadCrumbs
        title={t('StoreData.titleAdd')}
        data={[
          { title: t('Store') },
          { title: t('StoreData.titleAdd1') }
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {categories.length && subcategories.length && (
              <StoreDetails
                t={t}
                categories={categories}
                subcategories={subcategories}
                selectedStore={null}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </Fragment>
    <Loading />
    </>
  )
}

export default Details