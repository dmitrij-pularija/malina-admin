import { useState, useEffect } from 'react'
// import Sidebar from '@components/sidebar'
import { selectThemeColors, formatData, formatDataSave } from '@utils'
import Avatar from '@components/avatar'
import Select from 'react-select'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
import { addUser, editUser } from '../store'
import { useDispatch } from 'react-redux'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  name: '',
  surname: '',
  login: '',
  email: '',
  phone: '',
  type: '',
  clientType: '',
  gender: '',
  datebirth: (new Date())
}

const typeOptions = [
  { value: 1, label: 'user' },
  { value: 2, label: 'admin' },
  { value: 3, label: 'superadmin' }
]

const genderOptions = [
  { value: 1, label: 'Мужчина' },
  { value: 2, label: 'Женщина' },
  { value: 4, label: 'Не указан' }
]

const clientTypeOptions = [
  { value: 'user', label: 'Пользователь' },
  { value: 'customer', label: 'Клиент' },
  { value: 'guest', label: 'Гость' },
  { value: 'admin', label: 'Администратор' }
]

// const checkIsValid = data => {
//   return Object.values(data).every(field => {
//     if (typeof field === 'object') {
//       return field.value !== ""
//     } else {
//       return field.length > 0
//     }
//   })
// }

// const checkIsValid = data => {
//   const results = {};
  
//   for (const fieldName in data) {
//     const field = data[fieldName];
//     let isValid = true;
    
//     if (typeof field === 'object') {
//       isValid = field.value !== "";
//     } else {
//       isValid = field.length > 0;
//     }
    
//     results[fieldName] = isValid;
//   }
  
//   return results
// }


// const renderAvatar = data => {
//   if (data.avatar) {
//     return <Avatar className='me-1' img={data.avatar} size='xl' />
//   } else {
//     return (
//       <Avatar
//         initials
//         size='xl'
//         className='me-1'
//         color={'light-primary'}
//         content={data.name ? data.name : "User"}
//       />
//     )
//   }
// }

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field.value !== "" : field.length > 0))
}

const UserModal = ({ open, toggleModal, selectedUser, setSelectedUser }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [avatar, setAvatar] = useState('')
  const initDate = selectedUser.datebirth ? selectedUser.datebirth : (new Date())
  const [picker, setPicker] = useState(formatData(initDate))
  const values = {}
  // const values = selectedUser ? {
  //   name: selectedUser.name,
  //   surname: selectedUser.surname,
  //   login: selectedUser.login,
  //   email: selectedUser.email,
  //   phone: selectedUser.phone,
  //   type: typeOptions[typeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.type))],
  //   clientType: clientTypeOptions[clientTypeOptions.findIndex(i => i.value === selectedUser.client_type)],
  //   gender: genderOptions[genderOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.gender))],
  //   datebirth: formatData(selectedUser.datebirth)
  //   } : {}

  useEffect(() => {
    if (selectedUser) {
      setAvatar(selectedUser.avatar)
      values.name = selectedUser.name
      values.surname = selectedUser.surname
      values.login = selectedUser.login
      values.email = selectedUser.email
      values.phone = selectedUser.phone
      values.type = typeOptions[typeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.type))]
      values.clientType = clientTypeOptions[clientTypeOptions.findIndex(i => i.value === selectedUser.client_type)]
      values.gender = genderOptions[genderOptions.findIndex(i => parseInt(i.value) === parseInt(selectedUser.gender))]
      values.datebirth = formatData(selectedUser.datebirth)
    } 
    }, [selectedUser])

    
    
      const {
        reset,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm({ defaultValues, values })
      
      const handleImg = e => {
        const reader = new FileReader(),
          files = e.target.files
        reader.onload = function () {
          setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
      }  
       
      const dataURLtoBlob = dataURL => {
        const arr = dataURL.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
      
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
      
        return new Blob([u8arr], { type: mime })
      }
    
    
      const handleImgReset = () => {
        setAvatar('')
      }

      const renderUserImg = () => {
        if (avatar) {
          return (
            <img
              height='110'
              width='110'
              alt='user-avatar'
              src={avatar}
              className='img-fluid rounded mt-2 mb-2'
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
    setData(data)
    // const validationResults = checkIsValid(data);
    // for (const fieldName in validationResults) {
    //   if (!validationResults[fieldName]) {
    //     console.log(`Field "${fieldName}" did not pass validation.`);
    //   }
    // }
    // if (checkIsValid(data)) {
      console.log(data)
    
    if (checkIsValid(data)) {
      const formData = new FormData()
      formData.append('login', data.login)
      if (data.datebirth) formData.append('password', '111111')
      if (data.name) formData.append('name', data.name)
      if (data.surname) formData.append('surname', data.surname)
      if (data.email) formData.append('email', data.email)
      if (data.phone) formData.append('phone', data.phone)
      if (data.type) formData.append('type', data.type.value)
      if (data.clientType) formData.append('client_type', data.clientType.value)
      if (data.gender) formData.append('gender', data.gender.value)
      if (data.datebirth) formData.append('datebirth', formatDataSave(data.datebirth))
      // if (avatar.startsWith('data:image')) {
      //   const avatarBlob = dataURLtoBlob(avatar)
      //   formData.append('avatar', avatarBlob, 'avatar.jpg')
      // }
      if (selectedUser) {
        dispatch(editUser({ id: selectedUser.id, formData }))
      } else {
        dispatch(addUser(formData))
      }
      setSelectedUser('')
      toggleModal()
      setAvatar('')
      reset()
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleModalClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setSelectedUser('')
    setAvatar('')
    toggleModal()
    reset()
  }

return (
  <Modal isOpen={open} toggle={handleModalClosed} className='modal-dialog-centered modal-lg'>
  <ModalHeader className='bg-transparent' toggle={handleModalClosed}></ModalHeader>
  <ModalBody className='px-sm-5 pt-50 pb-5'>
    <div className='text-center mb-2'>
      <h1 className='mb-1'>{selectedUser ? "Изменение информации о пользователе" : "Добавление нового пользователя"}</h1>
    </div>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className='gy-1 pt-75'>
      <Col md={6} xs={12}>
      <div className='d-flex align-items-center flex-column'>
      {renderUserImg()}
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Загрузить
                  <Input type='file' onChange={handleImg} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Очистить
                </Button>
              </div>
        </div>
      </Col>
        <Col md={6} xs={12}>
        <div>
          <Label className='form-label' for='name'>
            Имя
          </Label>
          <Controller
            control={control}
            id='name'
            name='name'
            render={({ field }) => (
              <Input {...field} id='name' placeholder='John' invalid={errors.name && true} />
            )}
          />
        {/* </Col> */}
        {/* <Col md={6} xs={12}> */}
        </div>
        <div className='mt-1'>
          <Label className='form-label' for='surname'>
            Фамилия
          </Label>
          <Controller
            control={control}
            id='surname'
            name='surname'
            render={({ field }) => (
              <Input {...field} id='surname' placeholder='Doe' invalid={errors.surname && true} />
            )}
          />
          </div>
          <div className='mt-1'>
          <Label className='form-label' for='datebirth'>
            День рождения
          </Label>
          <Flatpickr 
          className='form-control' 
          value={picker} 
          onChange={date => setPicker(date)} 
          id='datebirth' 
          name='datebirth' 
          options={{ dateFormat: 'd.m.Y', locale: Russian }} 
          />
        </div>  
        </Col>
        <Col md={6} xs={12} >
          <Label className='form-label' for='login'>
            Login<span className='text-danger'>*</span>
          </Label>
          <Controller
            control={control}
            id='login'
            name='login'
            render={({ field }) => (
              <Input {...field} id='login' placeholder='john.doe.007' invalid={errors.login && true} />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='type'>
          Тип пользователя<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select
                id='type'
                isClearable={false}
                classNamePrefix='select'
                options={typeOptions}
                theme={selectThemeColors}
                placeholder="Выберите тип пользователя"
                className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
                {...field}
              />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='email'>
            Email
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='example@domain.com'
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='clientType'>
          Роль<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='clientType'
            control={control}
            render={({ field }) => (
              <Select
                id='clientType'
                isClearable={false}
                classNamePrefix='select'
                options={clientTypeOptions}
                theme={selectThemeColors}
                placeholder="Выберите роль пользователя"
                className={classnames('react-select', { 'is-invalid': data !== null && data.clientType === null })}
                {...field}
              />
            )}
          />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='phone'>
          Телефон
          </Label>
          <Input 
          id='phone' 
          name='phone' 
          type='tel'
          placeholder='+9 967 933 4422' />
        </Col>
        <Col md={6} xs={12}>
          <Label className='form-label' for='gender'>
          Пол
          </Label>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Select
                id='gender'
                isClearable={false}
                classNamePrefix='select'
                options={genderOptions}
                theme={selectThemeColors}
                placeholder="Выберите пол пользователя"
                className={classnames('react-select', { 'is-invalid': data !== null && data.gender === null })}
                {...field}
              />
            )}
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
            onClick={toggleModal}
          >
            Отменить
          </Button>
        </Col>
      </Row>
    </Form>
  </ModalBody>
</Modal>
)
  
}

export default UserModal

// return (
//   <Sidebar
//     size='lg'
//     open={open}
//     title='Новый пользователь'
//     headerClassName='mb-1'
//     contentClassName='pt-0'
//     toggleSidebar={toggleSidebar}
//     onClosed={handleSidebarClosed}
//   >
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <div className='mb-1'>
//         <Label className='form-label' for='name'>
//           Имя <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='name'
//           control={control}
//           render={({ field }) => (
//             <Input id='name' placeholder='John' invalid={errors.name && true} {...field} />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='surname'>
//           Фамилия <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='surname'
//           control={control}
//           render={({ field }) => (
//             <Input id='surname' placeholder='Doe' invalid={errors.surname && true} {...field} />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='login'>
//           Логин <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='login'
//           control={control}
//           render={({ field }) => (
//             <Input id='login' placeholder='johnDoe99' invalid={errors.login && true} {...field} />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='userEmail'>
//           Email <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='email'
//           control={control}
//           render={({ field }) => (
//             <Input
//               type='email'
//               id='userEmail'
//               placeholder='john.doe@example.com'
//               invalid={errors.email && true}
//               {...field}
//             />
//           )}
//         />
//         <FormText color='muted'>Вы можете использовать буквы, цифры и точки</FormText>
//       </div>

//       <div className='mb-1'>
//         <Label className='form-label' for='phone'>
//           Телефон <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='phone'
//           control={control}
//           render={({ field }) => (
//             <Input id='phone' placeholder='+996502945153' invalid={errors.phone && true} {...field} />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='datebirth'>
//         День рождения <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='datebirth'
//           control={control}
//           render={({ field }) => (
//             <Input id='datebirth' placeholder='01.01.1900' invalid={errors.datebirth && true} {...field} />
//           )}
//         />
//       </div>
      
//       <div className='mb-1'>
//         <Label className='form-label' for='gender'>
//           Пол <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='gender'
//           control={control}
//           render={({ field }) => (
//             // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//             <Select
//               isClearable={false}
//               defaultValue={gender}
//               classNamePrefix='select'
//               options={genderOptions}
//               theme={selectThemeColors}
//               className={classnames('react-select', { 'is-invalid': data !== null && data.gender === null })}
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='code'>
//         Код <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='code'
//           control={control}
//           render={({ field }) => (
//             <Input id='code' placeholder='12345' invalid={errors.code && true} {...field} />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='client_type'>
//           Тип <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='client_type'
//           control={control}
//           render={({ field }) => (
//             // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//             <Select
//               isClearable={false}
//               defaultValue={clientType}
//               classNamePrefix='select'
//               options={clientTypeOptions}
//               theme={selectThemeColors}
//               className={classnames('react-select', { 'is-invalid': data !== null && data.client_type === null })}
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <div className='mb-1'>
//         <Label className='form-label' for='type'>
//           Роль <span className='text-danger'>*</span>
//         </Label>
//         <Controller
//           name='type'
//           control={control}
//           render={({ field }) => (
//             // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//             <Select
//               isClearable={false}
//               classNamePrefix='select'
//               options={typeOptions}
//               theme={selectThemeColors}
//               className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <Button type='submit' className='me-1' color='primary'>
//         Сохранить
//       </Button>
//       <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
//         Отменить
//       </Button>
//     </Form>
//   </Sidebar>
// )