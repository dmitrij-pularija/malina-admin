import { useEffect, useRef, useState, Fragment } from "react"
// import StoreDetails from "../detail/StoreDetails"
import { useTranslation } from 'react-i18next'
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import ModalMap from '../../../../../@core/components/map/ModalMap'
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from "../../stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllUsers } from "../../../user/store"
import { getAllTables } from "../../../food/tables/store"
import { getAllWaiters } from "../../../user/waiters/store"
import { FileText, User, MapPin, Copy } from 'react-feather'
import Wizard from '@components/wizard'
import Address from '../edit/steps/Address'
import Payment from '../edit/steps/Payment'
import Details from '../edit/steps/Details'
import Cart from '../edit/steps/Cart'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const AddOrder = () => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const stores = useSelector((state) => state.stores.allStores)
  const users = useSelector((state) => state.users.allUsers)
  const waiters = useSelector(state => state.waiters.allWaiters)
  const tables = useSelector(state => state.tables.allTables)
  const products = useSelector(state => state.products.allProducts)
  const { userData } = useSelector(state => state.auth)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!waiters.length) dispatch(getAllWaiters())
    if (!tables.length) dispatch(getAllTables())
    if (!products.length) dispatch(getAllProducts())
  }, [])
  
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
      // subtitle: 'Добввьте реквизиты заказа',
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} userData={userData} waiters={waiters} tables={tables} handleUpdate={updateData} orderData={data} selectedOrder={null} t={t} />
    },
    {
      id: 'step-address',
      title: t('ordersData.step2'),
      // subtitle: 'введите адрес доставки',
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' handleUpdate={updateData} orderData={data} selectedOrder={null} toggleMap={toggleMap} selectedCoordinates={selectedCoordinates} t={t} />
    },
    {
      id: 'order-details',
      title: t('ordersData.step3'),
      // subtitle: 'Выберите состав заказа',
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} userData={userData} handleUpdate={updateData} orderData={data}  selectedOrder={null} t={t} />
    },
    {
      id: 'step-payment',
      title: t('ordersData.step4'),
      // subtitle: 'Добавьте способ оплаты',
      icon: <Copy size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={null} t={t} />
    }
  ]



  return (
    <>
    <Fragment>
      <BreadCrumbs
        title={t('ordersData.titleAdd')}
        data={[
          { title: t('Orders') },
          { title: t('Creation') }
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
    <ModalMap isOpen={mapOpen} toggle={toggleMap} onCoordinateSelected={handleCoordinateSelected} selectedOrder={null}  t={t} />
    <Loading />
    </>
  )
}

export default AddOrder