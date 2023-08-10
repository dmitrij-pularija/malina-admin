import { useState } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input } from 'reactstrap'
import { addBranch, editBranch } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  address: '',
  store: ''
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field.value !== "" : field.length > 0))
}

const SidebarBranches = ({ stores, open, toggleSidebar, selectedBranch, setSelectedBranch }) => {

const dispatch = useDispatch()
const [data, setData] = useState(null)
const storeOptions = stores.map((store) => ({
  value: String(store.id),
  label: store.name
}))

const values = selectedBranch ? {
  name: selectedBranch.name,
  address: selectedBranch.address,
  store: storeOptions[storeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedBranch.storeid.id))]
 } : {}

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      reset()  
      toggleSidebar()
      if (selectedBranch) {  
      dispatch(
        editBranch({
          id: selectedBranch.id, 
          name: data.name,
          address: data.address,
          storeid: data.store.value
        })
      )
      setSelectedBranch('')
      reset()
      } else {
        dispatch(
        addBranch({
          name: data.name,
          address: data.address,
          storeid: data.store.value
        })
      )
      }
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
    reset()
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedBranch ? 'Редактирование бранча' : 'Создание нового бранча'}
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
              <Input id='name' placeholder='Введите название филиала' invalid={errors.name && true} {...field} />
            )}
          />
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='address'>
          Адрес <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <Input id='address' placeholder='Введите адрес филиала' invalid={errors.address && true} {...field} />
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
                id='store'
                isClearable={false}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                placeholder="Выбирите Заведение"
                className={classnames('react-select', { 'is-invalid': data && data.store === "" })}
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

export default SidebarBranches