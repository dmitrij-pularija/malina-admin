// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../store'
import { Row, Col, Alert } from 'reactstrap'
import Loading from '../../../../../@core/components/spinner/Loading'
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedOrder } = useSelector(state => state.orders)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
    dispatch(getOrder(id))
  }, [])

// console.log(selectedOrder)
  return selectedOrder !== null && selectedOrder !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={selectedOrder} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} />
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Заказ не найден</h4>
      <div className='alert-body'>
      Информация о заказе с id: {id} не доступка. Проверьте список заказов:{' '}
        <Link to='/apps/food/orders/list'>Список заказов</Link>
      </div>
    <Loading />  
    </Alert>
  )
}

export default InvoicePreview
