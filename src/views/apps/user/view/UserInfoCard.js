// ** React Imports
import { useState, Fragment } from 'react'
import { useNavigate } from "react-router-dom"
// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import UserModal from '../list/Modal'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import { Russian } from "flatpickr/dist/l10n/ru.js"

// ** Custom Components
import Avatar from '@components/avatar'
// import PickerDefault from './PickerDefault'
// ** Utils
import { selectThemeColors, formatData } from '@utils'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// const typeColors = {
//   1: 'light-info',
//   2: 'light-danger',
//   3: 'light-warning'
// }

const roleObj = {
  1: {
    role: 'user',
    class: 'text-primary',
    color: 'light-info',
    icon: "User"
  },
  2: {
    role: 'admin',
    class: 'text-danger',
    color: 'light-warning',
    icon: "Slack"
  },
  3: {
    role: 'superadmin',
    class: 'text-success',
    color: 'light-danger',
    icon: "Command"
  }
}

const typeObj = {
  user: { type: 'Пользователь', color: 'light-success'},
  customer:{ type:  'Клиент', color: 'light-primary'},
  guest:{ type:  'Гость', color: 'light-warning'},
  admin:{ type:  'Администратор', color: 'light-danger'} 
}

const genderObj = {
  1: 'Мужской',
  2: 'Женский',
  3: 'Другое',
  4: 'Не указано'
}

// maintainer: 'light-success',
// subscriber: 'light-primary'

const statusColors = {
  false: 'light-success',
  true: 'light-warning'
}

// const genderOptions = [
//   { value: 1, label: 'Мужской' },
//   { value: 2, label: 'Женский' },
//   { value: 3, label: 'Другое' },
//   { value: 4, label: 'Не указано' }
// ]
// const statusOptions = [
//   { value: 'false', label: 'Активный' },
//   { value: 'true', label: 'Не Активный' }
// ]

const typeOptions = [
    { value: 'user', label: 'Пользователь' },
    { value: 'customer', label: 'Клиент' },
    { value: 'guest', label: 'Гость' },
    { value: 'admin', label: 'Администратор' }
  ]

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ]

// const languageOptions = [
//   { value: 'english', label: 'English' },
//   { value: 'spanish', label: 'Spanish' },
//   { value: 'french', label: 'French' },
//   { value: 'german', label: 'German' },
//   { value: 'dutch', label: 'Dutch' }
// ]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  const navigate = useNavigate()
  // ** State
  // const initDate = selectedUser.datebirth ? selectedUser.datebirth : (new Date())

  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)
  const handleClose = () => navigate("/apps/user/list")
  // const [picker, setPicker] = useState(formatData(initDate))
  // const handleDateChange = (date) => setPicker(date)
  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues: {
  //     username: selectedUser.login,
  //     lastName: selectedUser.surname,
  //     firstName: selectedUser.name
  //   }
  // })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser && selectedUser.avatar && selectedUser.avatar.includes("http")) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.name ? `${selectedUser.name} ${selectedUser.surname}` : selectedUser.user_type}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(42px)',
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

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: selectedUser.login,
      lastName: selectedUser.surname,
      firstName: selectedUser.name
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Вы уверены?',
      text: "Вы не сможете вернуть пользователя!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да, заблокировать пользователя!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Заблокирован!',
          text: 'Пользователь был заблокирован.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Отменен',
          text: 'Отмена блокировки :)',
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
                  <h4>{selectedUser.name !== null ? `${selectedUser.name} ${selectedUser.surname}` : ''}</h4>
                  {selectedUser !== null ? (
                    <Badge color={typeObj[selectedUser.user_type].color} className='text-capitalize'>
                      {typeObj[selectedUser.user_type].type}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{`ID: ${selectedUser.id}`}</h4>
              </div>
            </div>
          </div> */}
          {/* <div className='d-flex justify-content-around my-2'>
            <h4 className='mb-0'>{`ID: ${selectedUser.id}`}</h4>
          </div> */}
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Информация:</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ID:</span>
                  <span>{selectedUser.id}</span>
                </li>  
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Роль:</span>
                  <Badge color={roleObj[selectedUser.type].color} className='text-capitalize'>
                      {roleObj[selectedUser.type].role}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Логин:</span>
                  <span>{selectedUser.login ? selectedUser.login : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedUser.email ? selectedUser.email : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Телефон:</span>
                  <span>{selectedUser.phone ? selectedUser.phone : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Код:</span>
                  <span>{selectedUser.code ? selectedUser.code : "Не указан"}</span>
                </li>

                <li className='mb-75'>
                  <span className='fw-bolder me-25'>День рождения:</span>
                  <span>{selectedUser.datebirth ? formatData(selectedUser.datebirth) : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Пол:</span>
                  <span>{genderObj[selectedUser.gender]}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Статус:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.is_archive]}>
                    {selectedUser.is_archive ? "Не активный" : "Активный"}
                  </Badge>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2 gap-10'>
            <Button color='primary' onClick={toggleModal}>
              Изменить
            </Button>
            <Button color="secondary" outline onClick={handleClose}>
              Отменить
            </Button>
          </div>
        </CardBody>
      </Card>
      <UserModal open={modalOpen} toggleModal={toggleModal} selectedUser={selectedUser} setSelectedUser={() => {}} />
    </Fragment>
  )
}

export default UserInfoCard
