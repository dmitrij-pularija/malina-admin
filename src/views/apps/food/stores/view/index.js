import { useEffect, useState, Fragment } from "react"
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getStore } from "../store"
import { getAllCategories, getSubCategories } from "../../categories/store"
import { Card, CardBody, Alert } from 'reactstrap'
import StoreDetails from "./StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
// import ModalPassword from "../detail/ModalPassword"
import ModalІShifts from "../detail/ModalІShifts"
import ModalGalery from "../detail/ModalGalery"
import ModalІDelivery from "../detail/ModalІDelivery"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import '@styles/react/apps/app-users.scss'

const StoreView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { t } = useTranslation()
  // const [modalPasswordsShow, setModalPasswordsShow] = useState(false)
  const [modalGaleryShow, setModalGaleryShow] = useState(false)
  const [modalShiftsShow, setModalShiftsShow] = useState(false)
  const [modalDeliveryShow, setModalDeliveryShow] = useState(false)

  const { selectedStore, loading} = useSelector((state) => state.stores)
  const categories = useSelector((state) => state.categories.allCategories)
  const subcategories = useSelector((state) => state.categories.subcategories)
   
  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories())
    if (!subcategories.length) dispatch(getSubCategories())
    dispatch(getStore(parseInt(id)))
  }, [])
  
  const toggleModalGalery = () => setModalGaleryShow(!modalGaleryShow)
  const toggleModalShifts = () => setModalShiftsShow(!modalShiftsShow)
  const toggleModalDelivery = () => setModalDeliveryShow(!modalDeliveryShow)
  return (
    <Fragment>
      <BreadCrumbs
        title={t('StoreData.storeInfo')}
        data={[
          { title: t('Store') },
          { title: t('StoreData.Info') }
        ]}

      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {selectedStore ? (
              <>
              <StoreDetails
                t={t}
                categories={categories}
                subcategories={subcategories}
                selectedStore={selectedStore}
                toggleModalGalery={toggleModalGalery}
                toggleModalShifts={toggleModalShifts}
                toggleModalDelivery={toggleModalDelivery}
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
      <ModalІShifts isOpen={modalShiftsShow} toggle={toggleModalShifts} business={selectedStore ? selectedStore.id : ''} t={t} />
      <ModalGalery id={id} isOpen={modalGaleryShow} toggle={toggleModalGalery} data={selectedStore ? selectedStore.images : ''} t={t} />
      <ModalІDelivery isOpen={modalDeliveryShow} toggle={toggleModalDelivery} business={selectedStore ? selectedStore.id : ''} t={t} />  
    </Fragment>
  )
  }
  
  export default StoreView