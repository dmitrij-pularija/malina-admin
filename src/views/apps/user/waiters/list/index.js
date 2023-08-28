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
      <Breadcrumbs title='Официанты' data={[{ title: 'Пользователи' }, { title: 'Официанты' }]}  onClick={toggleSidebar} />
      <Table sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />
      <Loading />  
    </div>
  )
}

export default WaitersList