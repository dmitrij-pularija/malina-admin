// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
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
  1: 'Мужчина',
  2: 'Женщина',
  3: '3',
  4: 'Не указан'
}

// maintainer: 'light-success',
// subscriber: 'light-primary'

const statusColors = {
  false: 'light-success',
  true: 'light-warning'
}

const genderOptions = [
  { value: 1, label: 'Мужчина' },
  { value: 2, label: 'Женщина' },
  { value: 4, label: 'Не указан' }
]
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
  // ** State
  const initDate = selectedUser.datebirth ? selectedUser.datebirth : (new Date())

  const [show, setShow] = useState(false)
  const [picker, setPicker] = useState(formatData(initDate))
  // const handleDateChange = (date) => setPicker(date)
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: selectedUser.login,
      lastName: selectedUser.surname,
      firstName: selectedUser.name
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar) {
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
          content={selectedUser.name ? `${selectedUser.name} ${selectedUser.surname}` : 'User'}
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
                    <Badge color={typeObj[selectedUser.client_type].color} className='text-capitalize'>
                      {typeObj[selectedUser.client_type].type}
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
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Изменить
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Блокировать
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Изменить информацию о пользователе</h1>
            <p>При обновлении сведений о пользователе будет проведен аудит конфиденциальности.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  Имя
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Фамилия
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Login
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedUser.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                Тип пользователя:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={typeOptions}
                  theme={selectThemeColors}
                  defaultValue={typeOptions[typeOptions.findIndex(i => i.value === selectedUser.client_type)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Код
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Код'
                  defaultValue={selectedUser.code}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                Телефон
                </Label>
                <Input id='contact' defaultValue={selectedUser.phone} placeholder='+9 967 933 4422' />
              </Col>
              <Col md={6} xs={12}>
              {/* <PickerDefault title={"День рождения"} picker={picker} handleChange={handleDateChange}/> */}
              {/* <Fragment> */}
                <Label className='form-label' for='default-picker'>
                  День рождения
                </Label>
                <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' options={{ dateFormat: 'd.m.Y', locale: Russian }} />
              {/* </Fragment> */}
                {/* <Label className='form-label' for='language'>
                День рождения
                </Label>
                <Input id='contact' defaultValue={selectedUser.datebirth} placeholder='1999-07-26' /> */}
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='gender'>
                Пол
                </Label>
                <Select
                  id='gender'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={genderOptions}
                  theme={selectThemeColors}
                  defaultValue={genderOptions[genderOptions.findIndex(i => i.value === selectedUser.gender)]}
                />
              </Col>
              {/* <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col> */}
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Сохранить
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Отменить
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
