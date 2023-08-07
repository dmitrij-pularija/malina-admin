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
import { addTable } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  number: '',
  branch: { value: '', label: 'Выбирите Бранч>' },
  waiter: { value: '', label: 'Выбирите официанта' }
}

// const storeOptions = [
//   { value: '189', label: 'MALINA ECO FOOD' },
//   { value: '236', label: 'Chicken Crispy' }
// ] 


const checkIsValid = data => {
  // setStore(defaultValues.store)
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewTable = ({ open, toggleSidebar, waiters, branches }) => {
  // ** States
  const [data, setData] = useState(null)
  const [branch, setBranch] = useState(defaultValues.branch)
  const [waiter, setWaiter] = useState(defaultValues.waiter)

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

  const branchOptions = branches.map((branch) => ({
    value: String(branch.id),
    label: branch.name
  }))

  const waiterOptions = waiters.map((waiter) => ({
    value: String(waiter.id),
    label: waiter.full_name
  }))

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (checkIsValid(data)) {
      setBranch(defaultValues.branch)
      setWaiter(defaultValues.waiter)  
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
    setBranch(defaultValues.branch)
    setWaiter(defaultValues.waiter)
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Добавление нового столя'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='number'>
          Номер стола <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='number'
            control={control}
            render={({ field }) => (
              <Input id='number' placeholder='Введите номер стола' invalid={errors.number && true} {...field} />
            )}
          />
        </div>  
        <div className='mb-3'>
          <Label className='form-label' for='branch'>
          Бранч <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='branch'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={branch}
                classNamePrefix='select'
                options={branchOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.branch.value !== "" })}
                {...field}
              />
            )}
          />
        </div> 
        <div className='mb-3'>
          <Label className='form-label' for='waiter'>
          Официант <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='waiter'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={waiter}
                classNamePrefix='select'
                options={waiterOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.waiter.value !== "" })}
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

export default SidebarNewTable
