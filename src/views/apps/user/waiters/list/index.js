import Table from './Table'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Официанты' data={[{ title: 'Пользователи' }, { title: 'Официанты' }]} />
      <Table />
    </div>
  )
}

export default WaitersList