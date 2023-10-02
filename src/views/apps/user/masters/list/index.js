import Table from './Table'
import { useState } from 'react'
import Loading from '../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Специалисты' data={[{ title: 'Пользователи' }, { title: 'Специалисты' }]}  onClick={toggleSidebar} />
      <Table sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Loading />  
    </div>
  )
}

export default WaitersList