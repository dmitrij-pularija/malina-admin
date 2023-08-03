// import { useSelector } from 'react-redux'
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
// import { Row, Col } from 'reactstrap'

// ** Custom Components
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
// import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
// import { formatNumberInt } from '../../../../utility/Utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const CategoriesList = () => {
  // const { totalCount, totalUsers, totalCustomers, totalGuests } = useSelector(state => state.users.count)

  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default CategoriesList
