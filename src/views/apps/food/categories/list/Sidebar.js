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
import { addCategory } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  available: 0,
  icon: '',
  state: { value: null, label: 'Выбирите статус' }
}

const stateOptions = [
  { value: 0, label: 'Не активная' },
  { value: 1, label: 'Активная' }
]

// const genderOptions = [
//   { value: 1, label: 'Мужчина' },
//   { value: 2, label: 'Женщина' },
//   { value: 4, label: 'Не указан' }
// ]

// const clientTypeOptions = [
//   { value: 'user', label: 'Пользователь' },
//   { value: 'customer', label: 'Клиент' },
//   { value: 'guest', label: 'Гость' },
//   { value: 'admin', label: 'Администратор' }
// ]

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [state, setState] = useState(defaultValues.state)

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
    // console.log(data)
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

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setState(defaultValues.state)
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Создание новой категории'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
          Название <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input id='name' placeholder='Введите название категории' invalid={errors.name && true} {...field} />
            )}
          />
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='available'>
          Статус <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='available'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={state}
                classNamePrefix='select'
                options={stateOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.status.value !== null })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-3'>
          <Label className='form-label' for='icon'>
          Аватар
          </Label>
          <Input type='file' id='icon' name='icon' />
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
