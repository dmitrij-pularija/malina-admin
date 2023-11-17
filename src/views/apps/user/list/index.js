import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Table from './Table'
import Loading from '../../../../../src/@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { Users, UserPlus, UserCheck, UserX } from 'react-feather'
import { formatNumberInt } from '@utils'
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  // const { totalCount, totalUsers, totalCustomers, totalGuests } = useSelector(state => state.users.count)
  const toggleModal = () => setModalOpen(!modalOpen)
  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Users')} data={[{ title: t('Users') }]} onClick={toggleModal}/>
      {/* <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Всего'
            icon={<Users size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalCount)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Пользователи'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalUsers)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Клиенты'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalCustomers)}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Гости'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{formatNumberInt(totalGuests)}</h3>}
          />
        </Col>
      </Row> */}
      <Table modalOpen={modalOpen} toggleModal={toggleModal} t={t} />
      <Loading />  
    </div>
  )
}

export default UsersList