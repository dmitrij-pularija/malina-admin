import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import "@styles/react/apps/app-users.scss"

const CategoriesList = () => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
    <div className="app-user-list" >
      <Breadcrumbs title={t('Categories')} data={[{ title:  t('Store') }, { title: t('Categories') }]} onClick={toggleSidebar} /> 
      <Table sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} t={t} />
    </div>
    <Loading />
    </>
  )
}

export default CategoriesList