import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import { getAllUsers } from '../../../user/store'
import { getAllStores } from '../../../food/stores/store'
import { getOrderStatus } from '../../../food/orders/store'
// import { getAllOrders } from '../store'
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { ShoppingCart, DollarSign, Activity, Star } from 'react-feather'
import { formatNumberInt, formatNumber } from '../../../../../utility/Utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

// const sumTotalPrice = (data) => data.reduce((accumulator, currentValue) => { return accumulator + currentValue.total_order_price }, 0)
// const totalRate = (data) => {
// const sumRate = data.reduce((accumulator, currentValue) => { return accumulator + getRate(currentValue.rate) }, 0)
// const filtredRate = data.filter((item) => parseInt(item.rate) > 0)
// const countRate = filtredRate.length
// if (sumRate && countRate) {
// return sumRate / countRate
// } else {
//   return 0
// }
// }

const OrdersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleAdd = () => navigate('/apps/beauty/orders/add/')
  const users = useSelector(state => state.users.allUsers)
  const status = useSelector(state => state.orders.status)
  const stores = useSelector(state => state.stores.allStores)
  const { userData } = useSelector(state => state.auth) 
  // const { allOrders, count: { totalOrder, totalPrice,  avgPrice,  avgRait } } = useSelector(state => state.orders)
 
  useEffect(() => {
    if (!users.length) dispatch(getAllUsers())
    if (!stores.length) dispatch(getAllStores())
    if (!status.length) dispatch(getOrderStatus())  
    // if (!allOrders.length) dispatch(getAllOrders())
  }, [])

  // let sum = 0, rate = 0, avg = 0

  // if (data.length) {
  //   sum = sumTotalPrice(data)
  //   rate = totalRate(data)
  //   avg = total ? sum / total : 0
  // }

  return (
    <div className='app-user-list'>
<Breadcrumbs title={t('Orders')} data={[{ title: t('Orders') }]} onClick={userData.type === 3 ? null : handleAdd} /> 
      {/* <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Всего заказов'
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalOrder)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='На сумму, &#x0441;&#x332;'
            icon={<DollarSign size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalPrice)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Средняя сумма, &#x0441;&#x332;'
            icon={<Activity size={20}/>}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(avgPrice)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Средняя оценка'
            icon={<Star size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumber(avgRait)}</h3>}
          />
        </Col>
      </Row> */}
      <Table userData={userData} stores={stores} users={users} status={status} t={t} />
      <Loading />
    </div>
  )
}

export default OrdersList