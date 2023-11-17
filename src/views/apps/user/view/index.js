import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { getUser } from '../store'
import { getData } from '../../food/orders/store'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert } from 'reactstrap'
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { selectedUser } = useSelector(state => state.users)
  const foodOrders = useSelector(state => state.orders.data)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
    dispatch(getUser(parseInt(id)))
    dispatch(getData({user_id: parseInt(id)}))
    }
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return selectedUser !== null && selectedUser !== undefined ? (
    <div className='app-user-view'>
    
    <Breadcrumbs title={t('UsersData.titleInfo')} data={[{ title: t('Users') }, { title: t('Details') }]} />
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={selectedUser} t={t} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} score={selectedUser.score} data={foodOrders} t={t} />
        </Col>
      </Row>
    </div>
  ) : (
    <>
    <Breadcrumbs title={t('UsersData.titleInfo')} data={[{ title: t('Users') }, { title: t('Details') }]} />
    <Alert color='danger'>
      <h4 className='alert-heading'>{t('UsersData.alert')}</h4>
      <div className='alert-body'>
      {t('UsersData.alertText1')}{id}{t('UsersData.alertText2')}<Link to='/apps/user/list'>{t('UsersData.alertText3')}</Link>
      </div>
    </Alert>
    </>
  )
}
export default UserView