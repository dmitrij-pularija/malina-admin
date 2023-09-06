import { useEffect, useRef, useState , Fragment } from "react"
// import StoreDetails from "../detail/StoreDetails"
import BreadCrumbs from "@components/breadcrumbs"
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import { Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from "../../stores/store"
import { getAllUsers } from "../../../user/store"
import { FileText, User, MapPin, Link } from 'react-feather'
import Wizard from '@components/wizard'
import Address from '../edit/steps/Address'
import SocialLinks from '../edit/steps/SocialLinks'
import Details from '../edit/steps/Details'
import AccountDetails from '../edit/steps/AccountDetails'
import "@styles/react/apps/app-users.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const AddOrder = () => {
  const dispatch = useDispatch()
  const stores = useSelector((state) => state.stores.allStores)
  const users = useSelector((state) => state.users.allUsers)

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
  }, [])
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'personal-info',
      title: 'Реквизиты',
      subtitle: 'Добввьте реквизиты заказа',
      icon: <User size={18} />,
      content: <Details stepper={stepper} type='modern-vertical' stores={stores} users={users}/>
    },
    {
      id: 'step-address',
      title: 'Адрес',
      subtitle: 'введите адрес доставки',
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'account-details',
      title: 'Состав',
      subtitle: 'Выберите состав заказа',
      icon: <FileText size={18} />,
      content: <AccountDetails stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'social-links',
      title: 'Оплата',
      subtitle: 'Добавьте способ оплаты',
      icon: <Link size={18} />,
      content: <SocialLinks stepper={stepper} type='modern-vertical' />
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