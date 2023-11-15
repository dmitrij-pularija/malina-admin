// ** React Imports
import { useEffect, useRef, useState, Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../@core/components/spinner/Loading'
import ModalMap from '../../../../../@core/components/map/ModalMap'
import { formatStringTime } from '@utils'
// import axios from 'axios'

import { getOrder } from '../store'
import { Alert, Card, CardBody } from 'reactstrap'
import { getAllStores } from "../../stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllUsers } from "../../../user/store"
import { getAllTables } from "../../../food/tables/store"
import { getAllWaiters } from "../../../user/waiters/store"
import { FileText, User, MapPin, Copy } from 'react-feather'
import Wizard from '@components/wizard'
import Address from './steps/Address'
import Payment from './steps/Payment'
import Details from './steps/Details'
import Cart from './steps/Cart'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"
// ** Invoice Edit Components
// import EditCard from './EditCard'
// import EditActions from './EditActions'
// import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
// import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'

const EditOrder = () => {
  // ** Hooks
  const { id } = useParams()
  const ref = useRef(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const { selectedOrder, loading } = useSelector(state => state.orders)
  const stores = useSelector((state) => state.stores.allStores)
  const users = useSelector((state) => state.users.allUsers)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const tables = useSelector(state => state.tables.allTables)
  const products = useSelector(state => state.products.allProducts)
  const { userData } = useSelector(state => state.auth)

  // ** Get invoice on mount based on id
  useEffect(() => {
    dispatch(getOrder(id))
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!waiters.length) dispatch(getAllWaiters())
    if (!tables.length) dispatch(getAllTables())
    if (!products.length) dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    if (selectedOrder) {
    const cart = selectedOrder.order_cart.map(cart => parseInt(cart.id))
    setData({...selectedOrder, user_id: selectedOrder.user_id.id, business_id: selectedOrder.business_id.id, order_cart: cart, requested_delivery_time: formatStringTime(selectedOrder.requested_delivery_time)})
    }
  }, [selectedOrder])

  // console.log(data)
  // console.log(selectedOrder)
  const updateData = newData => setData(prevState => ({...prevState, ...newData}))
  const toggleMap = () => setMapOpen(!mapOpen)
  const handleCoordinateSelected = coords => {
    setSelectedCoordinates(coords)
    // console.log(coords)
  }
  const steps = [
    {
      id: 'step-details',
      title: t('ordersData.step1'),
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} userData={userData} waiters={waiters} tables={tables} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} t={t} />
    },
    {
      id: 'step-address',
      title: t('ordersData.step2'),
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} toggleMap={toggleMap} selectedCoordinates={selectedCoordinates} t={t} />
    },
    {
      id: 'order-details',
      title: t('ordersData.step3'),
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} userData={userData} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} t={t} />
    },
    {
      id: 'step-payment',
      title: t('ordersData.step4'),
      icon: <Copy size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} t={t} />
    }
  ]

  return selectedOrder !== null && selectedOrder !== undefined ? (
    <>
    <Fragment>
      <BreadCrumbs
        title={t('ordersData.titleEdit')}
        data={[
          { title: t('Orders') },
          { title: t('Editing') }
        ]}
      />
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
          <div className='modern-vertical-wizard'>
      <Wizard
        type='modern-vertical'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
          </CardBody>
        </Card>
      </div>
    </Fragment>
    <ModalMap isOpen={mapOpen} toggle={toggleMap} onCoordinateSelected={handleCoordinateSelected} selectedOrder={selectedOrder} t={t} />
    <Loading />
    </>
  ) : (
    loading ? <Loading /> : <Alert color='danger'>
      <h4 className='alert-heading'>{t('ordersData.alert')}</h4>
      <div className='alert-body'>
      {t('ordersData.alertText1')} {id} {t('ordersData.alertText2')}{' '}
        <Link to='/apps/food/orders/list'>{t('ordersData.alertText3')}</Link>
      </div>
    </Alert>
  )
}

export default EditOrder
