// ** React Imports
import { useEffect, useRef, useState, Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../@core/components/spinner/Loading'
// ** Third Party Components
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
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const { selectedOrder, loading } = useSelector(state => state.orders)
  const stores = useSelector((state) => state.stores.allStores)
  const users = useSelector((state) => state.users.allUsers)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const tables = useSelector(state => state.tables.allTables)
  const products = useSelector(state => state.products.allProducts)

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
    setData({...selectedOrder, user_id: selectedOrder.user_id.id, business_id: selectedOrder.business_id.id, order_cart: cart})
    }
  }, [selectedOrder])

  // console.log(data)
  // console.log(selectedOrder)
  const updateData = newData => setData(prevState => ({...prevState, ...newData}))

  const steps = [
    {
      id: 'step-details',
      title: 'Реквизиты',
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} waiters={waiters} tables={tables} handleUpdate={updateData} orderData={data} />
    },
    {
      id: 'step-address',
      title: 'Адрес',
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    },
    {
      id: 'order-details',
      title: 'Состав',
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    },
    {
      id: 'step-payment',
      title: 'Оплата',
      icon: <Copy size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    }
  ]

  return selectedOrder !== null && selectedOrder !== undefined ? (
    <>
    <Fragment>
      <BreadCrumbs
        title="Редактирование заказа"
        data={[
          { title: "Заказы" },
          { title: "Редактирование" }
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
    <Loading />
    </>
  ) : (
    <>
    { loading ? (
    <Loading />
    ) : ( 
    <Alert color='danger'>
      <h4 className='alert-heading'>Заказ не найден</h4>
      <div className='alert-body'>
      Информация о заказе с id: {id} не доступка. Проверьте список заказов:{' '}
        <Link to='/apps/food/orders/list'>Список заказов</Link>
      </div>
    </Alert>
    )}
  </>  
  )
}

export default EditOrder
