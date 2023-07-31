// ** React Imports
import { useState, Fragment } from 'react'
import Rating from 'react-rating'
// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
import { Star } from 'react-feather'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
// import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import { Russian } from "flatpickr/dist/l10n/ru.js"

// ** Custom Components
import Avatar from '@components/avatar'
// ** Utils
import { selectThemeColors } from '@utils'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const storeOptions = [
  { value: '189', label: 'MALINA ECO FOOD' },
  { value: '236', label: 'Chicken Crispy' }
] 

const MySwal = withReactContent(Swal)

const WaiterInfoCard = ({ selectedWaiter }) => {
  // ** State
  const [show, setShow] = useState(false)
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      telegram: selectedWaiter.telegram,
      fullName: selectedWaiter.full_name,
      avgRating: selectedWaiter.avg_rating,
      picture: selectedWaiter.profile_picture
    }
  })

  // ** render user img
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
      telegram: selectedWaiter.telegram,
      fullName: selectedWaiter.full_name,
      avgRating: selectedWaiter.avg_rating,
      picture: selectedWaiter.profile_picture
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Вы уверены?',
      text: "Вы не сможете вернуть официанта!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да, удалить официанта!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Удален!',
          text: 'Официант был удален.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
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
                  <span>{selectedWaiter.storeid ? selectedWaiter.storeid.name : "Не указан"}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Телефон:</span>
                  <span>{selectedWaiter.storeid.phone ? selectedWaiter.storeid.phone : "Не указан"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Изменить
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Удалить
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-sm'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Изменить информацию об официанте</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col xs={12}>
                <Label className='form-label' for='fullName'>
                  Имя
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='fullName'
                  name='fullName'
                  render={({ field }) => (
                    <Input {...field} id='fullName' placeholder='John' invalid={errors.fullName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='telegram'>
                Telegram
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='telegram'
                  name='telegram'
                  render={({ field }) => (
                    <Input {...field} id='telegram' placeholder='12345' invalid={errors.telegram && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='status'>
                Ресторан:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={storeOptions}
                  theme={selectThemeColors}
                  defaultValue={storeOptions[storeOptions.findIndex(i => i.value === selectedWaiter.id)]}
                />
              </Col>
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

export default WaiterInfoCard
