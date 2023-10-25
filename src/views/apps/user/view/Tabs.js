import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { ShoppingCart, Lock, Award } from 'react-feather'
import SecurityTab from './SecurityTab'
import Rewards from './Rewards'
import UserOrdersList from './UserOrdersList'

const UserTabs = ({ active, toggleTab, score }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <ShoppingCart className='font-medium-3 me-50' />
            <span className='fw-bold'>История заказов</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Award className='font-medium-3 me-50' />
            <span className='fw-bold'>Бонусы</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Безопасность</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserOrdersList />
        </TabPane>
        {/* <TabPane tabId='2'>
          <Rewards score={score} />
        </TabPane>
        <TabPane tabId='3'>
          <SecurityTab />
        </TabPane> */}
      </TabContent>
    </Fragment>
  )
}
export default UserTabs