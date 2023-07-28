import { useSelector } from 'react-redux'
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { ShoppingCart, DollarSign, Activity, Star } from 'react-feather'
import { formatNumberInt, formatNumber, getRate} from '../../../../../utility/Utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const sumTotalPrice = (data) => data.reduce((accumulator, currentValue) => { return accumulator + currentValue.totalprice }, 0)
const totalRate = (data) => {
const sumRate = data.reduce((accumulator, currentValue) => { return accumulator + getRate(currentValue.rate) }, 0)
const filtredRate = data.filter((item) => item.rate.length > 0)
const countRate = filtredRate.length
if (sumRate && countRate) {
return sumRate / countRate
} else {
  return 0
}
}

const OrdersList = () => {
  const { total, data } = useSelector(state => state.orders)
  let sum = 0, rate = 0, avg = 0

  if (data.length) {
    sum = sumTotalPrice(data)
    rate = totalRate(data)
    avg = total ? sum / total : 0
  }

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Всего заказов'
            icon={<ShoppingCart size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(total)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='На сумму'
            icon={<DollarSign size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(sum)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Средняя сумма'
            icon={<Activity size={20}/>}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt( avg )}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Средняя оценка'
            icon={<Star size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumber(rate)}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default OrdersList