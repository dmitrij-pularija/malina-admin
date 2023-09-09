import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { FileText, Copy, FilePlus } from 'react-feather'
import ProductDetails from '../edit/ProductDetails'
// import SecurityTab from './SecurityTab'
// import Rewards from './Rewards'
// import UserOrdersList from './UserOrdersList'

const ProductTabs = ({ categories, stores, selectedProduct, active, toggleTab }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <FileText className='font-medium-3 me-50' />
            <span className='fw-bold'>Блюдо</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <FilePlus className='font-medium-3 me-50' />
            <span className='fw-bold'>Добавки</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Copy className='font-medium-3 me-50' />
            <span className='fw-bold'>Связанные продукты</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active} className="width">
        <TabPane tabId='1'>
          <ProductDetails categories={categories} stores={stores} selectedProduct={selectedProduct} />
        </TabPane>
        <TabPane tabId='2'>
          {/* <Rewards score={score} /> */}
        </TabPane>
        <TabPane tabId='3'>
          {/* <SecurityTab /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default ProductTabs