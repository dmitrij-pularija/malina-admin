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
import { addWaiter } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  storeid: '',
  full_name: '',
  telegram: ''
}

const storeOptions = [
  { value: '189', label: 'MALINA ECO FOOD' },
  { value: '236', label: 'Chicken Crispy' }
] 

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewWaiters = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [store, setStore] = useState({ value: '', label: 'Выбирите Заведение' })

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
    setStore({ value: '', label: 'Выбирите Заведение' })

  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Новый официант'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='fullName'>
            Имя <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <Input id='fullName' placeholder='John' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='telegram'>
          ID полученный в Телеграмм - боте <a href='https://t.me/malinappbot' target="_blank" className='w-100'>@malinappbot</a><span className='text-danger'>*</span>
          </Label>
          <Controller
            name='telegram'
            control={control}
            render={({ field }) => (
              <Input id='telegram' placeholder='12345' invalid={errors.telegram && true} {...field} />
            )}
          />
        </div>  
        <div className='mb-3'>
          <Label className='form-label' for='store'>
          Ресторан <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='store'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={store}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.store === null })}
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

export default SidebarNewWaiters
