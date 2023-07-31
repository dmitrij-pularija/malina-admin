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
// import Rewards from './Rewards'
// import UserTimeline from './UserTimeline'
// import Notifications from './Notifications'
// import UserOrdersList from './UserOrdersList'

const UserTabs = ({ active, toggleTab, score }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            {/* <ShoppingCart className='font-medium-3 me-50' /> */}
            <span className='fw-bold'>История заказов</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            {/* <Award className='font-medium-3 me-50' /> */}
            <span className='fw-bold'>Отзывы</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            {/* <Lock className='font-medium-3 me-50' /> */}
            <span className='fw-bold'>Безопасность</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Link className='font-medium-3 me-50' />
            <span className='fw-bold'>Connections</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          {/* <UserOrdersList /> */}
          {/* <UserTimeline /> */}
          {/* <InvoiceList /> */}
        </TabPane>
        <TabPane tabId='2'>
          {/* <Rewards score={score} /> */}
        </TabPane>
        <TabPane tabId='3'>
          {/* <SecurityTab /> */}
        </TabPane>
{/* 
        <TabPane tabId='4'>
          <Notifications />
        </TabPane>
        <TabPane tabId='5'>
          <Connections />
        </TabPane> */}
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
