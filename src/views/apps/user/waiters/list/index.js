import Table from './Table'
import { useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Официанты' data={[{ title: 'Пользователи' }, { title: 'Официанты' }]}  onClick={toggleSidebar} />
      <Table sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default WaitersList