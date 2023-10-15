// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getOrderStatus } from '../../../food/orders/store'
import { getAllStores } from "../../../food/stores/store"
import { getAllUsers } from "../../../user/store"
import { getOrder, deleteOrder } from '../store'
import { Row, Col, Alert } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loading from '../../../../../@core/components/spinner/Loading'
// import handleDel from '../../../../../@core/components/delete/handleDel'
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import SidebarChangeStatatus from '../shared-sidebar/SidebarChangeStatatus'
import '@styles/base/pages/app-invoice.scss'

const MySwal = withReactContent(Swal)

const OrderPreview = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector(state => state.orders)
  const stores = useSelector(state => state.stores.allStores)
  const users = useSelector(state => state.users.allUsers)
  const { selectedOrder, loading } = useSelector(state => state.beautyOrders)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleNavigate = () => navigate("/apps/beauty/orders/list/")

   useEffect(() => {
    if (!status.length) dispatch(getOrderStatus())
    if (!stores.length) dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    dispatch(getOrder(id))
  }, [])

const handleDelOrder = (id) => {
      return MySwal.fire({
        title: 'Удаление',
        text: `Вы не сможете востановить заказ !`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'удалить',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
        
      }).then(function (result) {
        if (result.value) {
          dispatch(deleteOrder(id)).then(response => {
            if (response.meta.requestStatus === 'fulfilled') { 
            MySwal.fire({
              icon: 'success',
              title: 'Удаление',
              text: `Заказ id: ${id} успешно удален`,
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
            handleNavigate()
          }
          }
          )
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire({
            title: 'Отмена удаления',
            text: 'Удаление отменено',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        }
      })
    } 


  return selectedOrder !== null && selectedOrder !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={selectedOrder} stores={stores} users={users}/>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} toggleSidebar={toggleSidebar} handleDelOrder={handleDelOrder} />
        </Col>
      </Row>
      <SidebarChangeStatatus toggleSidebar={toggleSidebar} open={sidebarOpen} statuses={status} selectedOrder={selectedOrder}/>
    </div>
  ) : (
    loading ? <Loading /> : <Alert color='danger'>
      <h4 className='alert-heading'>Заказ не найден</h4>
      <div className='alert-body'>
      Информация о заказе с id: {id} не доступка. Проверьте список заказов:{' '}
        <Link to='/apps/beauty/orders/list'>Список заказов</Link>
      </div> 
    </Alert>
  )
}

export default OrderPreview