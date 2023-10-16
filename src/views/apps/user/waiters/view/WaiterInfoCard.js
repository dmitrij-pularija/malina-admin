import { useState, Fragment } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { Card, CardBody, Button } from 'reactstrap'
import { Star } from 'react-feather'
import { deleteWaiter } from '../store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Avatar from '@components/avatar'
import Sidebar from '../list/Sidebar'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const WaiterInfoCard = ({ userData, stores, shifts, selectedWaiter }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleClose = () => navigate("/apps/user/waiters/list/") 
  const renderUserImg = () => {
    if (selectedWaiter !== null && selectedWaiter.profile_picture) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedWaiter.profile_picture}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedWaiter.full_name ? selectedWaiter.full_name : 'Waiter'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Вы уверены?',
      text: "Вы не сможете вернуть официанта!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да, удалить официанта!',
      cancelButtonText: 'Отменить',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteWaiter(selectedWaiter.id)).then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Удален!',
            text: 'Официант был удален.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          navigate('/apps/user/waiters/list')  
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Отмена',
          text: 'Удаление отменено',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section mb-1'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedWaiter.full_name !== null ? selectedWaiter.full_name : ''}</h4>
                  <Rating
                  readonly
                  fractions={2}
                  direction={'ltr'}
                  initialRating={selectedWaiter.avg_rating}
                  emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
                  fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
                  />
                </div>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Информация:</h4>
          <div className='info-container'>
            {selectedWaiter !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ID:</span>
                  <span>{selectedWaiter.id}</span>
                </li>  
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Telegram:</span>
                  <span>{selectedWaiter.telegram ? selectedWaiter.telegram : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Ресторан:</span>
                  <span>{selectedWaiter.business_id ? selectedWaiter.business_id.name : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Смена:</span>
                  <span>{selectedWaiter.shift ? `${selectedWaiter.shift.start_time.slice(0, -3)} - ${selectedWaiter.shift.end_time.slice(0, -3)}` : "Не указана"}</span>
                  {/* <span>{selectedWaiter.shift ? selectedWaiter.shift.description : ''}</span> */}
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Телефон:</span>
                  <span>{selectedWaiter.business_id && selectedWaiter.business_id.phone ? selectedWaiter.business_id.phone : "Не указан"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={toggleSidebar}>
              Изменить
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleClose}>
            Отменить
            </Button>
          </div>
        </CardBody>
      </Card>
      <Sidebar shifts={shifts} userData={userData} stores={stores} open={sidebarOpen} toggleSidebar={toggleSidebar} selectedWaiter={selectedWaiter} setSelectedWaiter={() => {}} />  
    </Fragment>
  )
}

export default WaiterInfoCard