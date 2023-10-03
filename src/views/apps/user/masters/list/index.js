import Table from './Table'
import { useState } from 'react'
import Loading from '../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const WaitersList = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Специалисты' data={[{ title: 'Пользователи' }, { title: 'Специалисты' }]}  onClick={toggleModal} />
      <Table modalOpen={modalOpen} toggleModal={toggleModal} />
      <Loading />  
    </div>
  )
}

export default WaitersList