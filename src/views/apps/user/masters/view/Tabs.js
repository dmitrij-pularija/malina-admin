import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { ShoppingCart, Image, Award } from 'react-feather'
import MasterWorksList from './Works'
import MasterRewards from './Rewards'
import MasterAppointmentsList from './MasterAppointmentsList'

const WaiterTabs = ({ id, works, ratings, users, appointments, active, toggleTab }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
      <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <Image className='font-medium-3 me-50' />
            <span className='fw-bold'>Работы специалиста</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <ShoppingCart className='font-medium-3 me-50' />
            <span className='fw-bold'>История записей</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Award className='font-medium-3 me-50' />
            <span className='fw-bold'>Отзывы</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
      <TabPane tabId='1'>
          <MasterWorksList works={works} id={id}/>
        </TabPane>
        <TabPane tabId='2'>
          <MasterAppointmentsList appointments={appointments}/>
        </TabPane>
        <TabPane tabId='3'>
          <MasterRewards ratings={ratings} users={users} />
        </TabPane>

      </TabContent>
    </Fragment>
  )
}

export default WaiterTabs