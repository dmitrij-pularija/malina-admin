import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { FileText, Copy, FilePlus } from 'react-feather'
import ProductDetails from '../edit/ProductDetails'
// import SecurityTab from './SecurityTab'
import Addons from './Addons'
import RelatesProducts from './RelatesProducts'
// import UserOrdersList from './UserOrdersList'

const ProductTabs = ({ categories, store, selectedProduct, active, toggleTab, t }) => {

  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <FileText className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('Product')}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <FilePlus className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('Addons')}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Copy className='font-medium-3 me-50' />
            <span className='fw-bold'>{t('RelatedProducts')}</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active} className="width">
        <TabPane tabId='1'>
          <ProductDetails categories={categories} store={store} selectedProduct={selectedProduct} t={t} />
        </TabPane>
        <TabPane tabId='2'>
          <Addons store={store} selectedProduct={selectedProduct} t={t} />
        </TabPane>
        <TabPane tabId='3'>
          <RelatesProducts store={store} selectedProduct={selectedProduct} t={t} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default ProductTabs