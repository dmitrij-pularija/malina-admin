import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getWaiter } from '../store'
import { getAllUsers } from "../../store"
import { getAllStores, getShifts } from '../../../food/stores/store'
import { getData } from '../../../food/rating/waiters/store'
import { getAllOrders } from '../../../food/orders/store'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import WaiterTabs from './Tabs'
import WaiterInfoCard from './WaiterInfoCard'
import '@styles/react/apps/app-users.scss'

const WaiterView = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [shifts, setShifts] = useState([])
  // const [rating, setRating] = useState([])
  const { selectedWaiter, loading } = useSelector(state => state.waiters)
  const users = useSelector(state => state.users.allUsers)
  const stores = useSelector(state => state.stores.allStores)
  const { allOrders } = useSelector(state => state.orders)
  const { userData } = useSelector(state => state.auth)
  const rating = useSelector(state => state.ratingWaiters.data)
  const { id } = useParams()
//  console.log(selectedWaiter)

 const orders = allOrders.filter(order => parseInt(order.waiter) === parseInt(id))  

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers())
    if (!stores.length) dispatch(getAllStores())
    if (!allOrders.length) dispatch(getAllOrders())
    dispatch(getData({ waiter: id }))
    getShifts().then(response => { setShifts(response) })
    // getWaiterRating(parseInt(id)).then(response => setRating(response))
    dispatch(getWaiter(parseInt(id)))
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return selectedWaiter !== null && selectedWaiter !== undefined ? (
    <div className='app-user-view'>
      <Breadcrumbs title={t('detailsInfo')} data={[{ title: t('Users') }, { title: t('Waiters') }, { title: t('Details') }]} />
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <WaiterInfoCard userData={userData} stores={stores} shifts={shifts} selectedWaiter={selectedWaiter} t={t} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <WaiterTabs active={active} toggleTab={toggleTab} ratings={rating} orders={orders} users={users} t={t} />
        </Col>
      </Row>
    </div>
  ) : (
    loading ? <Loading /> : <>
    <Breadcrumbs title={t('detailsInfo')} data={[{ title: t('Users') }, { title: t('Waiters') }, { title: t('Details') }]} />
    <Alert color='danger'>
      <h4 className='alert-heading'>{t('waiterData.alert')}</h4>
      <div className='alert-body'>
      {t('waiterData.alertText1')} {id} {t('waiterData.alertText2')} <Link to='/apps/user/waiters/list'>{t('waiterData.alertText3')}</Link>
      </div>
    </Alert>
    </>
  )
}

export default WaiterView