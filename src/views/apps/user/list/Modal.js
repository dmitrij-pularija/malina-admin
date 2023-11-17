import { useState, useEffect } from 'react'
import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectThemeColors, formatData, formatDataSave, checkIsValid, dataURLtoBlob } from '@utils'
import Avatar from '@components/avatar'
import Select from 'react-select'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Card, Form, FormFeedback, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
import { addUser, editUser } from '../store'
import { useDispatch } from 'react-redux'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const SignupSchema = yup.object().shape({
  password: yup.string().min(8),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
})

const defaultValues = {
  name: '',
  surname: '',
  login: '',
  email: '',
  phone: '',
  type: '',
  clientType: '',
  gender: '',
  birthday: '',
  device: '',
  password: '',
  confirmPassword: ''
}

const typeOptions = [
  { value: 1, label: 'Пользователь' },
  { value: 2, label: 'Предприятие' },
  { value: 3, label: 'Администратор' },
  { value: 4, label: 'Мастер' }
]

const genderOptions = [
  { value: 1, label: 'Мужской' },
  { value: 2, label: 'Женский' },
  { value: 3, label: 'Другое' },
  { value: 4, label: 'Не указано' }
]

const clientTypeOptions = [
  { value: 'user', label: 'Пользователь' },
  { value: 'customer', label: 'Клиент' },
  { value: 'guest', label: 'Гость' },
  { value: 'admin', label: 'Администратор' }
]

const requiredFields = ["login"]

// const checkIsValid = (data) => {
//   return Object.keys(data).every((key) => {
//     const field = data[key]
//     if (requiredFields.includes(key)) {
//       if (typeof field === "object") {
//         return field.value !== ""
//       } else {
//         return field.length > 0
//       }
//     } else {
//       return true
//     }
//   })
// }

const UserModal = ({ open, toggleModal, selectedUser, t }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(selectedUser && selectedUser.avatar && selectedUser.avatar.includes("http") ? selectedUser.avatar : '')
  const values = selectedUser ? {
    // avatar: (selectedUser.avatar && selectedUser.avatar.includes("http")) ? selectedUser.avatar : '',
    name: selectedUser.name ? selectedUser.name : '',
    surname: selectedUser.surname ? selectedUser.surname : '',
    login: selectedUser.login ? selectedUser.login : '',
    email: selectedUser.email ? selectedUser.email : '',
    phone: selectedUser.phone ? selectedUser.phone : '',
    device: selectedUser.device_id ? selectedUser.device_id : '',
    type: selectedUser.user_type ? typeOptions[typeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.type))] : '',
    clientType: selectedUser.type ? clientTypeOptions[clientTypeOptions.findIndex(i => i.value === selectedUser.user_type)] : '',
    gender: selectedUser.gender ? genderOptions[genderOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.gender))] : '',
    birthday: selectedUser.birthday ? formatData(selectedUser.birthday) : ''
    } : {}

  useEffect(() => {
    if (selectedUser && selectedUser.avatar && selectedUser.avatar.includes("http")) setAvatar(selectedUser.avatar)
    }, [selectedUser])
  
      const {
        reset,
        control,
        setValue,
        getValues,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm({ defaultValues, values, resolver: yupResolver(SignupSchema) })
      
const handleClose = () => {
  // setSelectedUser('')
  // setValue('avatar', '')
  // setAvatar('')
  reset({
    ...defaultValues
  })
  toggleModal()
}

      const handleImg = e => {
        const reader = new FileReader(),
          files = e.target.files
        reader.onload = function () {
          // setValue('avatar', reader.result)
          setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
      }  
       
      // const dataURLtoBlob = dataURL => {
      //   const arr = dataURL.split(',')
      //   const mime = arr[0].match(/:(.*?);/)[1]
      //   const bstr = atob(arr[1])
      //   let n = bstr.length
      //   const u8arr = new Uint8Array(n)
      
      //   while (n--) {
      //     u8arr[n] = bstr.charCodeAt(n)
      //   }
      
      //   return new Blob([u8arr], { type: mime })
      // }
    
      const handleImgReset = () => {
        // setValue('avatar', '')
        setAvatar('')
      }

      const renderUserImg = (image, name) => {
        if (image) {
          return (
            <img
              height='110'
              width='110'
              alt='user-avatar'
              src={image}
              className='img-fluid rounded mb-1'
              
            />
          )
        } else {
          return (
            <Avatar
              initials
              color={'light-primary'}
              className='rounded mb-1'
              content={name}
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
    if (!selectedUser && !data.password) return setError('password', { type: 'manual'})
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      formData.append('login', data.login)
      if (data.password) formData.append('password', data.password)
      if (data.name) formData.append('name', data.name)
      if (data.surname) formData.append('surname', data.surname)
      if (data.email) formData.append('email', data.email)
      if (data.phone) formData.append('phone', data.phone)
      if (data.device) formData.append('device_id', data.device)
      if (data.type) formData.append('user_type', data.type.value)
      if (data.clientType) formData.append('type', data.clientType.value)
      if (data.gender) formData.append('gender', data.gender.value)
      if (data.birthday) formData.append('birthday', formatDataSave(data.birthday))
      // if (avatar && avatar.startsWith('data:image')) {
      //   const avatarBlob = dataURLtoBlob(avatar)
      //   formData.append('avatar', avatarBlob, 'avatar.jpg')
      // }
      if (selectedUser) {
        dispatch(editUser({ id: selectedUser.id, formData,  avatar })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addUser({ formData,  avatar })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      }
      // setSelectedUser('')
      // toggleModal()
      // setAvatar('')
      // reset()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  // const handleModalClosed = () => handleClear()

return (
  <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
  <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
  <ModalBody className='px-sm-5 pt-50 pb-5'>
    <div className='text-center mb-2'>
      <h1 className='mb-1'>{selectedUser ? t('UsersData.titleEdit') : t('UsersData.titleAdd')}</h1>
    </div>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className='gy-1 pt-75'>
      <Col md={6} xs={12}>
      <div className='d-flex align-items-center flex-column'>
      {renderUserImg(avatar, selectedUser ? `${selectedUser.name} ${selectedUser.surname}` : "User")}
              <div className='d-flex align-items-center gap-10'>
                <Button className='mb-0' tag={Label} size='sm' color='primary'>
                {t('download')}
                  <Input type='file' onChange={handleImg} hidden accept='image/*' />
                </Button>
                <Button color='secondary' size='sm' outline onClick={handleImgReset}>
                {t('clear')}
                </Button>
              </div>
        </div>
      </Col>
        <Col md={6} xs={12}>
        <div>
          <Label className='form-label' for='name'>
          {t('name')}
          </Label>
          <Controller
            control={control}
            rules={{ required: false }}
            id='name'
            name='name'
            render={({ field }) => (
              <Input {...field} id='name' placeholder={t('namePlaceholder')} invalid={errors.name && true} />
            )}
          />
        </div>
        <div className='mt-1'>
          <Label className='form-label' for='surname'>
          {t('surname')}
          </Label>
          <Controller
            control={control}
            rules={{ required: false }}
            id='surname'
            name='surname'
            render={({ field }) => (
              <Input {...field} id='surname' placeholder={t('surnamePlaceholder')} invalid={errors.surname && true} />
            )}
          />
          </div> 
        </Col>
        <Col md={6} xs={12} >
          <Label className='form-label' for='birthday'>
          {t('UsersData.birth')}
          </Label>
          <Controller
                      id="birthday"
                      name="birthday"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
          <Flatpickr 
          className='form-control' 
          value={field.value} 
          onChange={(date) => setValue("birthday", date)} 
          id='birthday' 
          name='birthday' 
          options={{ dateFormat: 'd.m.Y', locale: Russian }} 
          />
          )}
          />
        </Col>
        <Col md={6} xs={12} >
          <Label className='form-label' for='login'>
          {t('loginLabel')}<span className='text-danger'>*</span>
          </Label>
          <Controller
            control={control}
            rules={{ required: true }}
            id='login'
            name='login'
            render={({ field }) => (
              <Input {...field} id='login' placeholder={t('loginPlaceholder')} invalid={errors.login && true} />
            )}
          />
          {errors && errors.login && (<FormFeedback>{t('loginFeedback')}</FormFeedback>)}
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='type'>
          {t('Role')}
          </Label>
          <Controller
            id='type'
            name='type'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='type'
                name='type'
                isClearable={false}
                classNamePrefix='select'
                options={typeOptions}
                theme={selectThemeColors}
                placeholder={t('RolePlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.type && true })}
                {...field}
              />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='email'>
            Email
          </Label>
          <Controller
                  id='email'
                  name="email"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='example@domain.com'
            {...field}
          />
          )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='clientType'>
          {t('UsersData.clientTypeLabel')}
          </Label>
          <Controller
            id='clientType'
            name='clientType'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='clientType'
                name='clientType'
                isClearable={false}
                classNamePrefix='select'
                options={clientTypeOptions}
                theme={selectThemeColors}
                placeholder={t('UsersData.clientTypePlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.clientType && true })}
                {...field}
              />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='phone'>
          {t('phone')}
          </Label>
          <Controller
                  id='phone'
                  name="phone"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
          <Input 
          id='phone' 
          name='phone' 
          type='tel'
          placeholder={t('phonePlaceholder')} 
          {...field}
          />
          )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='gender'>
          {t('UsersData.gender')}
          </Label>
          <Controller
            id='gender'
            name='gender'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='gender'
                name='gender'
                isClearable={false}
                classNamePrefix='select'
                options={genderOptions}
                theme={selectThemeColors}
                placeholder={t('UsersData.genderPlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.gender && true })}
                {...field}
              />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='device'>
          {t('UsersData.deviceLabel')}
          </Label>
          <Controller
                  id='device'
                  name="device"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
          <Input 
          id='device' 
          name='device' 
          type='tel'
          placeholder={t('UsersData.devicePlaceholder')} 
          {...field}
          />
          )}
          />
        </Col>
        <Col md={6} xs={12}>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t('password')}
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
              </Col>
              <Col md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t('confirmPassword')}
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>      
        <Col xs={12} className='text-center mt-2 pt-50'>
          <Button type='submit' className='me-1' color='primary'>
          {t('save')}
          </Button>
          <Button
            type='reset'
            color='secondary'
            outline
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
        </Col>
      </Row>
    </Form>
  </ModalBody>
</Modal>
)
  
}

export default UserModal