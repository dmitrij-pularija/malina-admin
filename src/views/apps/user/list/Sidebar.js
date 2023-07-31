// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  surname: '',
  login: '',
  email: '',
  phone: '',
  datebirth: '01.01.1900',
  code: ''
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

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [gender, setGender] = useState(4)
  const [clientType, setClientType] = useState('user')
  const [type, setType] = useState(1)

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      // dispatch(
      //   addUser({
      //     role,
      //     avatar: '',
      //     status: 'active',
      //     email: data.email,
      //     currentPlan: plan,
      //     billing: 'auto debit',
      //     company: data.company,
      //     contact: data.contact,
      //     fullName: data.fullName,
      //     username: data.username,
      //     country: data.country.value
      //   })
      // )
    } else {
      // for (const key in data) {
      //   if (data[key] === null) {
      //     setError('country', {
      //       type: 'manual'
      //     })
      //   }
      //   if (data[key] !== null && data[key].length === 0) {
      //     setError(key, {
      //       type: 'manual'
      //     })
      //   }
      // }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setGender(4)
    setClientType('user')
    setType(1)
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Новый пользователь'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Имя <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input id='name' placeholder='John' invalid={errors.name && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='surname'>
            Фамилия <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='surname'
            control={control}
            render={({ field }) => (
              <Input id='surname' placeholder='Doe' invalid={errors.surname && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='login'>
            Логин <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='login'
            control={control}
            render={({ field }) => (
              <Input id='login' placeholder='johnDoe99' invalid={errors.login && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>Вы можете использовать буквы, цифры и точки</FormText>
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            Телефон <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input id='phone' placeholder='+996502945153' invalid={errors.phone && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='datebirth'>
          День рождения <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='datebirth'
            control={control}
            render={({ field }) => (
              <Input id='datebirth' placeholder='01.01.1900' invalid={errors.datebirth && true} {...field} />
            )}
          />
        </div>
        
        <div className='mb-1'>
          <Label className='form-label' for='gender'>
            Пол <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                defaultValue={gender}
                classNamePrefix='select'
                options={genderOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.gender === null })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='code'>
          Код <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <Input id='code' placeholder='12345' invalid={errors.code && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='client_type'>
            Тип <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='client_type'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                defaultValue={clientType}
                classNamePrefix='select'
                options={clientTypeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.client_type === null })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='type'>
            Роль <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={typeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
                {...field}
              />
            )}
          />
        </div>
        <Button type='submit' className='me-1' color='primary'>
          Сохранить
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Отменить
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
