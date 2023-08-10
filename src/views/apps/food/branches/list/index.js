import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'
import '@styles/react/apps/app-users.scss'

const BranchesList = () => {

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Филиалы' data={[{ title: 'Структура' }, { title: 'Филиалы' }]} />
      <Table />
    </div>
  )
}

export default BranchesList
