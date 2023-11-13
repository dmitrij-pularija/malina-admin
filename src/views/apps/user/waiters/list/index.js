import Table from './Table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Waiters')} data={[{ title: t('Users') }, { title: t('Waiters') }]}  onClick={toggleSidebar} />
      <Table sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} t={t} />
      <Loading />  
    </div>
  )
}

export default WaitersList