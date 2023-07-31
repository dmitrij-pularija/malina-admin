// ** User List Component
import Table from './Table'

// ** Reactstrap Imports

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'


// ** Styles
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default WaitersList
