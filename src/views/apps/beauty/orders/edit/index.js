// ** React Imports
import { useEffect, useRef, useState, Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../@core/components/spinner/Loading'
import { formatStringTime } from '@utils'
import { getOrder } from '../store'
import { getAllStores } from "../../../food/stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllCategories } from "../../products/categories/store"
import { getAllUsers } from "../../../user/store"
import { Alert, Card, CardBody } from 'reactstrap'
import { FileText, User, MapPin, Copy } from 'react-feather'
import Wizard from '@components/wizard'
import Address from './steps/Address'
import Payment from './steps/Payment'
import Details from './steps/Details'
import Cart from './steps/Cart'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const EditOrder = () => {
  const { id } = useParams()
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const { selectedOrder, loading } = useSelector(state => state.beautyOrders)
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)
  const products = useSelector(state => state.productsBeauty.allProducts)
  const categories = useSelector(state => state.beautyProductsCategories.allCategories)

  useEffect(() => {
    dispatch(getOrder(id))
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!products.length) dispatch(getAllProducts())
    if (!categories.length) dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (selectedOrder) {
    const cart = selectedOrder.carts.map(cart => parseInt(cart.id))
    setData({...selectedOrder, user_account: selectedOrder.user_account, order_business: selectedOrder.order_business, carts: cart })
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
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
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
      content: <Cart stepper={stepper} type='modern-vertical' products={products} categories={categories} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
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
    loading ? <Loading /> : <Alert color='danger'>
      <h4 className='alert-heading'>Заказ не найден</h4>
      <div className='alert-body'>
      Информация о заказе с id: {id} не доступка. Проверьте список заказов:{' '}
        <Link to='/apps/beauty/orders/list'>Список заказов</Link>
      </div>
    </Alert>
  )
}

export default EditOrder
