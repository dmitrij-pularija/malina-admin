import { useEffect, useRef, useState, Fragment } from "react"
import BreadCrumbs from "@components/breadcrumbs"
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from "../../../food/stores/store"
import { getAllProducts } from "../../products/products/store"
import { getAllCategories } from "../../products/categories/store"
import { getAllUsers } from "../../../user/store"
import { FileText, User, MapPin, Copy } from 'react-feather'
import Wizard from '@components/wizard'
import ModalMap from '../../../../../@core/components/map/ModalMap'
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
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const [data, setData] = useState(null)
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)
  const { userData } = useSelector(state => state.auth)
  const products = useSelector(state => state.productsBeauty.allProducts)
  const categories = useSelector(state => state.beautyProductsCategories.allCategories)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!products.length) dispatch(getAllProducts())
    if (!categories.length) dispatch(getAllCategories())
  }, [])
  
  const toggleMap = () => setMapOpen(!mapOpen)
  const updateData = newData => setData(prevState => ({...prevState, ...newData}))
  const handleCoordinateSelected = coords => {
    setSelectedCoordinates(coords)
    // console.log(coords)
  }

  const steps = [
    {
      id: 'step-details',
      title: t('ordersBeautyData.step1'),
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users}  userData={userData} handleUpdate={updateData} orderData={data} selectedOrder={null} t={t} />
    },
    {
      id: 'step-address',
      title: t('ordersBeautyData.step2'),
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' handleUpdate={updateData} orderData={data} selectedOrder={null} toggleMap={toggleMap} selectedCoordinates={selectedCoordinates} t={t} />
    },
    {
      id: 'order-details',
      title: t('ordersBeautyData.step3'),
      icon: <FileText size={18} />,
      content: <Cart stepper={stepper} type='modern-vertical' products={products} categories={categories}  userData={userData} handleUpdate={updateData} orderData={data}  selectedOrder={null} t={t} />
    },
    {
      id: 'step-payment',
      title: t('ordersBeautyData.step4'),
      icon: <Copy size={18} />,
      content: <Payment stepper={stepper} type='modern-vertical'  handleUpdate={updateData} orderData={data} selectedOrder={null} t={t} />
    }
  ]



  return (
    <>
    <Fragment>
      <BreadCrumbs
        title={t('ordersBeautyData.titleAdd')}
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
    <ModalMap isOpen={mapOpen} toggle={toggleMap} onCoordinateSelected={handleCoordinateSelected} selectedAddres={null} />
    <Loading />
    </>
  )
}

export default AddOrder