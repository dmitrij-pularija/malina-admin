import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getWaiter } from '../store'
import { getAllStores } from '../../../food/stores/store'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import WaiterTabs from './Tabs'
import WaiterInfoCard from './WaiterInfoCard'
import '@styles/react/apps/app-users.scss'

const WaiterView = () => {
  const dispatch = useDispatch()
  const { selectedWaiter } = useSelector(state => state.waiters)
  const stores = useSelector(state => state.stores.allStores)
  const { id } = useParams()

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores({ business_type: 1 }))
    dispatch(getWaiter(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return selectedWaiter !== null && selectedWaiter !== undefined ? (
    <div className='app-user-view'>
      <Breadcrumbs title='Детальная информация' data={[{ title: 'Пользователи' }, { title: 'Официанты' }, { title: 'Детали' }]} />
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <WaiterInfoCard stores={stores} selectedWaiter={selectedWaiter} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <WaiterTabs active={active} toggleTab={toggleTab} ratings={selectedWaiter.waiter_ratings}/>
        </Col>
      </Row>
    </div>
  ) : (
    <>
    <Breadcrumbs title='Детальная информация' data={[{ title: 'Пользователи' }, { title: 'Официанты' }, { title: 'Детали' }]} />
    <Alert color='danger'>
      <h4 className='alert-heading'>Официант не найден</h4>
      <div className='alert-body'>
        Официант с id: {id} не найден. Проверьте в списке официантов: <Link to='/apps/user/waiters/list'>Список официантов</Link>
      </div>
    </Alert>
    </>
  )
}

export default WaiterView