// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getWaiter } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import WaiterTabs from './Tabs'
// import PlanCard from './PlanCard'
import WaiterInfoCard from './WaiterInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const WaiterView = () => {
  // ** Store Vars
  const { selectedWaiter } = useSelector(state => state.waiters)
  const dispatch = useDispatch()
// console.log(selectedWaiter)

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
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
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <WaiterInfoCard selectedWaiter={selectedWaiter} />
          {/* <PlanCard /> */}
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          {/* <WaiterTabs active={active} toggleTab={toggleTab} score={selectedUser.score}/> */}
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Пользователь не найден</h4>
      <div className='alert-body'>
        Официант с id: {id} не найден. Проверьте в списке официантов: <Link to='/apps/user/цaiterы/list'>Список официантов</Link>
      </div>
    </Alert>
  )
}
export default WaiterView
