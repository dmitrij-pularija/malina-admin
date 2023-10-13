import { useEffect, useState, Fragment } from "react"
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStore } from "../store"
import { getAllCategories, getSubCategories } from "../../categories/store"
import { Card, CardBody, Alert } from 'reactstrap'
import StoreDetails from "./StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
// import ModalPassword from "../detail/ModalPassword"
import ModalІShifts from "../detail/ModalІShifts"
import ModalІDelivery from "../detail/ModalІDelivery"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import '@styles/react/apps/app-users.scss'

const StoreView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  // const [modalPasswordsShow, setModalPasswordsShow] = useState(false)
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
  
  // const toggleModalPasswords = () => setModalPasswordsShow(!modalPasswordsShow)
  const toggleModalShifts = () => setModalShiftsShow(!modalShiftsShow)
  const toggleModalDelivery = () => setModalDeliveryShow(!modalDeliveryShow)
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
                toggleModalShifts={toggleModalShifts}
                toggleModalDelivery={toggleModalDelivery}
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
      {/* <ModalPassword isOpen={modalShow} toggle={toggleModal} onChange={handlePasswordChange} chengPassword={handleChengPassword} passwords={passwords} passwordsMatch={passwordsMatch} /> */}
      <ModalІShifts isOpen={modalShiftsShow} toggle={toggleModalShifts} />
      <ModalІDelivery isOpen={modalDeliveryShow} toggle={toggleModalDelivery} business={selectedStore ? selectedStore.id : null}/>  
    </Fragment>
  )
  }
  
  export default StoreView