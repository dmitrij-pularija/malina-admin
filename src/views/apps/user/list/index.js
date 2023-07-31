import { useSelector } from 'react-redux'
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
import { formatNumberInt } from '../../../../utility/Utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  const { totalCount, totalUsers, totalCustomers, totalGuests } = useSelector(state => state.users.count)

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Всего'
            icon={<Users size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalCount)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Пользователи'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalUsers)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Клиенты'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalCustomers)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Гости'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalGuests)}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
