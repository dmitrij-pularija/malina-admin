import { useEffect, Fragment } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const { selectedStore, loading} = useSelector(state => state.stores)
  const { userData } = useSelector(state => state.auth)
  // const store = useSelector((state) => state.stores.selectedStore)
  const categories = useSelector(state => state.categories.allCategories)
  const subcategories = useSelector(state => state.categories.subcategories)

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!subcategories.length) dispatch(getSubCategories())
    dispatch(getStore(parseInt(id)))
  }, [])

  return (
    <Fragment>
      <BreadCrumbs
         title={t('StoreData.titleEdit')}
         data={[
           { title: t('Store') },
           { title: t('StoreData.titleEdit1') }
         ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {selectedStore ? (
              <>
              <StoreDetails
                t={t}
                userData={userData}
                categories={categories}
                subcategories={subcategories}
                selectedStore={selectedStore}
              />
              <Loading />
              </>
            ) : (
              loading ? <Loading /> : <Alert color="danger">
                <h4 className="alert-heading">{t('StoreData.alert')}</h4>
                <div className="alert-body">
                {t('StoreData.alertText1')} {id} {t('StoreData.alertText2')} {" "}
                  <Link to="/apps/food/stores/list">{t('StoreData.alertText3')}</Link>
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