import { useSelector } from 'react-redux'
// import Table from './Table'
import Loading from '../../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
// import { Row, Col } from 'reactstrap'
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
// import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
// import { formatNumberInt } from '@utils'
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  // const { totalCount, totalUsers, totalCustomers, totalGuests } = useSelector(state => state.users.count)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Меню' data={[{ title: 'Меню' }]} />
      {/* <Table /> */}
      <Loading />  
    </div>
  )
}

export default UsersList