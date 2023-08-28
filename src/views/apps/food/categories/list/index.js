import { useState } from 'react'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const CategoriesList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title='Категории' data={[{ title: 'Структура' }, { title: 'Категории' }]} onClick={toggleSidebar} /> 
      <Table sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
    <Loading />
    </>
  )
}

export default CategoriesList