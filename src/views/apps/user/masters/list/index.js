import Table from './Table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const MastersList = () => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Masters')} data={[{ title: t('Staff') }, { title: t('Masters') }]}  onClick={toggleModal} />
      <Table modalOpen={modalOpen} toggleModal={toggleModal} t={t} />
      <Loading />  
    </div>
  )
}

export default MastersList