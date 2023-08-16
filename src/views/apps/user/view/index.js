import { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { useParams, Link } from 'react-router-dom'
import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert } from 'reactstrap'
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector(state => state.users)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getUser(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return selectedUser !== null && selectedUser !== undefined ? (
    <div className='app-user-view'>
    <Breadcrumbs title='Информация о пользователе' data={[{ title: 'Пользователи' }, { title: 'Детали' }]} />
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={selectedUser} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} score={selectedUser.score}/>
        </Col>
      </Row>
    </div>
  ) : (
    <>
    <Breadcrumbs title='Информация о пользователе' data={[{ title: 'Пользователи' }, { title: 'Детали' }]} />
    <Alert color='danger'>
      <h4 className='alert-heading'>Пользователь не найден</h4>
      <div className='alert-body'>
        Пользователь с id: {id} не найден. Проверьте в списке пользователей: <Link to='/apps/user/list'>Список пользователей</Link>
      </div>
    </Alert>
    </>
  )
}
export default UserView