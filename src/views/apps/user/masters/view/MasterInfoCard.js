import { useState, Fragment } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { Card, CardBody, Button } from 'reactstrap'
import { Star } from 'react-feather'
// import { deleteMaster } from '../store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Avatar from '@components/avatar'
import MasterModal from './Modal'
// import Sidebar from '../list/Sidebar'

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// import { deleteMaster } from '../store'

const MySwal = withReactContent(Swal)

const MasterInfoCard = ({ userData, stores, specialties, selectedMaster, t }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

//  console.log(selectedMaster)

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleClose = () => navigate("/apps/user/masters/list/") 
const getStore = id => {
  if (!id) return <span>{t('MastersData.notIndicated')}</span>
  const store = stores.find(store => parseInt(store.id) === parseInt(id))
  if (store) {
    return (
      <div className='d-flex flex-column'>
          <span>{store ? store.name : ''}</span>
          <span>{store && store.business_address ? `${store.business_address.city}, ${store.business_address.name}` : ''}</span>
      </div>
    )
  } else return <span>{t('MastersData.notIndicated')}</span>
}
  const renderUserImg = () => {
    if (selectedMaster !== null && selectedMaster.master_profile_picture) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedMaster.master_profile_picture}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedMaster.master_name ? `${selectedMaster.master_name} ${selectedMaster.surname ? selectedMaster.surname : ''}` : 'Специалист'}
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

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: 'Вы уверены?',
  //     text: "Вы не сможете вернуть официанта!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Да, удалить официанта!',
  //     cancelButtonText: 'Отменить',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       dispatch(deleteMaster(selectedMaster.id)).then(() => {
  //         MySwal.fire({
  //           icon: 'success',
  //           title: 'Удален!',
  //           text: 'Официант был удален.',
  //           customClass: {
  //             confirmButton: 'btn btn-success'
  //           }
  //         })
  //         navigate('/apps/user/masters/list')  
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Отмена',
  //         text: 'Удаление отменено',
  //         icon: 'error',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     }
  //   })
  // }

  return (
    <>
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section mb-1'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='d-flex flex-column user-info'>
                  <h4>{selectedMaster.master_name ? `${selectedMaster.master_name} ${selectedMaster.surname ? selectedMaster.surname : ''}` : ''}</h4>
                  <span>{selectedMaster.master_specialty ? selectedMaster.master_specialty.specialty_name : ""}</span>

                  <Rating
                  readonly
                  fractions={2}
                  direction={'ltr'}
                  initialRating={selectedMaster.average_rating ? selectedMaster.average_rating : 0}
                  emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
                  fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
                  />
                </div>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50'> {t('Info')}</h4>
          <div className='info-container'>
            {selectedMaster !== null ? (
              <ul className='list-unstyled'>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>ID:</span>
                  <span>{selectedMaster.id}</span>
                </li>   */}
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Специальность:</span>
                  <span>{selectedMaster.master_specialty ? selectedMaster.master_specialty.specialty_name : "Не указана"}</span>
                </li> */}
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('Store1')}</span>
                  {getStore(selectedMaster.master_business)}
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('Login')}</span>
                  <span>{selectedMaster.login ? selectedMaster.login : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('Phone')}</span>
                  <span>{selectedMaster.phone ? selectedMaster.phone : "Не указан"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={toggleModal}>
            {t('edit')}
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleClose}>
            {t('cancel')}
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* <Sidebar shifts={shifts} stores={stores} open={sidebarOpen} toggleSidebar={toggleSidebar} selectedWaiter={selectedWaiter} setSelectedWaiter={() => {}} />   */}
    </Fragment>
    <MasterModal userData={userData} specialties={specialties} stores={stores} open={modalOpen} toggleModal={toggleModal} selectedMaster={selectedMaster} setSelectedMaster={() => {}} t={t} />
    </>
  )
}

export default MasterInfoCard