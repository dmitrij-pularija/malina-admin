import { useEffect, useRef, useState , Fragment } from "react"
// import StoreDetails from "../detail/StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from "../../stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllUsers } from "../../../user/store"
import { getAllTables } from "../../../food/tables/store"
import { getAllWaiters } from "../../../user/waiters/store"
import { FileText, User, MapPin, Link } from 'react-feather'
import Wizard from '@components/wizard'
import Address from '../edit/steps/Address'
import Payment from '../edit/steps/Payment'
import Details from '../edit/steps/Details'
import Cart from '../edit/steps/Cart'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

// const defaultValues = {
   // name: '',
   // city: '',
   // street: '',
   // houseNumber: '',
   // entrance: '',
   // floor: '',
   // phoneNumber: '',
  // deliveryPrice: '',
   // location: '',
   // longitude: '',
   // latitude: '',
  // timeDelivery: '',
  // rdt: '',
  // comment: ''
// }

//  user_id	
//  business_id
//  table	
//  payment_type	
//  order_type	
//  time_delivery	
//  used_points	
//  delivery_address	
//  tips	
//  quantity_appliances	
//  comment	
//  order_cart
//  waiter	
//  requested_delivery_time	

const AddOrder = () => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const stores = useSelector((state) => state.stores.allStores)
  const users = useSelector((state) => state.users.allUsers)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const tables = useSelector(state => state.tables.allTables)
  const products = useSelector(state => state.products.allProducts)
 
  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!waiters.length) dispatch(getAllWaiters())
    if (!tables.length) dispatch(getAllTables())
    if (!products.length) dispatch(getAllProducts())
  }, [])
  
const updateData = newData => setData(prevState => ({...prevState, ...newData}))
  
  const steps = [
    {
      id: 'step-details',
      title: 'Реквизиты',
      // subtitle: 'Добввьте реквизиты заказа',
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} waiters={waiters} tables={tables} handleUpdate={updateData} orderData={data} />
    },
    {
      id: 'step-address',
      title: 'Адрес',
      // subtitle: 'введите адрес доставки',
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' address={[]} handleUpdate={updateData} orderData={data} selectedOrder={null}/>
    },
    {
      id: 'order-details',
      title: 'Состав',
      // subtitle: 'Выберите состав заказа',
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} handleUpdate={updateData} orderData={data} />
    },
    {
      id: 'step-payment',
      title: 'Оплата',
      // subtitle: 'Добавьте способ оплаты',
      icon: <Link size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={null} />
    }
  ]



  return (
    <>
    <Fragment>
      <BreadCrumbs
        title="Создание заказа"
        data={[
          { title: "Заказы" },
          { title: "Создание" }
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
  )
}

export default AddOrder