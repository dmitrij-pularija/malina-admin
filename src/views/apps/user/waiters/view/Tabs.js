// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { ShoppingCart, Lock, Award, Bell, Link } from 'react-feather'

// ** User Components
// import InvoiceList from './InvoiceList'
// import SecurityTab from './SecurityTab'
// import Connections from './Connections'
import Rewards from './Rewards'
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
import WaiterOrdersList from './WaiterOrdersList'

const WaiterTabs = ({ active, toggleTab, ratings }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <ShoppingCart className='font-medium-3 me-50' />
            <span className='fw-bold'>История заказов</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Award className='font-medium-3 me-50' />
            <span className='fw-bold'>Отзывы</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <WaiterOrdersList />
        </TabPane>
        <TabPane tabId='2'>
          <Rewards ratings={ratings} />
        </TabPane>

      </TabContent>
    </Fragment>
  )
}
export default WaiterTabs