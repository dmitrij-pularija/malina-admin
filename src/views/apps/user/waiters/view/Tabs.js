import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { ShoppingCart, Award } from 'react-feather'
import Rewards from './Rewards'
import WaiterOrdersList from './WaiterOrdersList'

const WaiterTabs = ({ active, toggleTab, ratings, orders, users, t }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
      <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <Award className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('Feedback')}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <ShoppingCart className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('History')}</span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={active}>

        <TabPane tabId='1'>
          <Rewards ratings={ratings} users={users} t={t}/>
        </TabPane>
        <TabPane tabId='2'>
          <WaiterOrdersList orders={orders} t={t}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}

export default WaiterTabs