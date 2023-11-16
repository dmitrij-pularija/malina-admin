// ** React Imports
import { useEffect, useRef, useState, Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import BreadCrumbs from "@components/breadcrumbs"
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../@core/components/spinner/Loading'
import { formatStringTime } from '@utils'
import { getOrder } from '../store'
import { getAllStores } from "../../../food/stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllCategories } from "../../products/categories/store"
import { getAllUsers } from "../../../user/store"
import { Alert, Card, CardBody } from 'reactstrap'
import { FileText, User, MapPin, Copy } from 'react-feather'
import ModalMap from '../../../../../@core/components/map/ModalMap'
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
  const { t } = useTranslation()
  const [stepper, setStepper] = useState(null)
  const [data, setData] = useState(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const { selectedOrder, loading } = useSelector(state => state.beautyOrders)
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)
  const { userData } = useSelector(state => state.auth)
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
  const toggleMap = () => setMapOpen(!mapOpen)
  const handleCoordinateSelected = coords => {
    setSelectedCoordinates(coords)
    // console.log(coords)
  }
  
  const steps = [
    {
      id: 'step-details',
      title: t('ordersBeautyData.step1'),
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users} userData={userData} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    },
    {
      id: 'step-address',
      title: t('ordersBeautyData.step2'),
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} toggleMap={toggleMap} selectedCoordinates={selectedCoordinates} />
    },
    {
      id: 'order-details',
      title: t('ordersBeautyData.step3'),
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} categories={categories} userData={userData} handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    },
    {
      id: 'step-payment',
      title: t('ordersBeautyData.step4'),
      icon: <Copy size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={selectedOrder} />
    }
  ]

  return selectedOrder !== null && selectedOrder !== undefined ? (
    <>
    <Fragment>
      <BreadCrumbs
        title={t('ordersBeautyData.titleEdit')}
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
    <ModalMap isOpen={mapOpen} toggle={toggleMap} onCoordinateSelected={handleCoordinateSelected} selectedAddres={selectedOrder.delivery_address} />
    <Loading />
    </>
  ) : (
    loading ? <Loading /> : <Alert color='danger'>
      <h4 className='alert-heading'>{t('ordersData.alert')}</h4>
      <div className='alert-body'>
      {t('ordersData.alertText1')} {id} {t('ordersData.alertText2')}{' '}
        <Link to='/apps/beauty/orders/list'>{t('ordersData.alertText3')}</Link>
      </div>
    </Alert>
  )
}

export default EditOrder
