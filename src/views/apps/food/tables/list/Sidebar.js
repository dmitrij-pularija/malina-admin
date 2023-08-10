import { useState } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { addTable, editTable } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  number: '',
  branch: '',
  waiter: ''
}
const checkIsValid = data => {
  return Object.values(data).every(field => {
    if (typeof field === 'object') return field.value !== ''
    if (Array.isArray(field)) return field.length > 0
    if (typeof field === 'string') return field.length > 0
    if (typeof field === 'number') return field > 0    
})
} 

const SidebarNewTable = ({ open, toggleSidebar, waiters, branches, selectedTable, setSelectedTable }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)

  const waiterList = selectedTable ? selectedTable.waiter.map(waiter => parseInt(waiter.id)) : [] 

  const branchOptions = branches.map((branch) => ({
    value: String(branch.id),
    label: branch.name
  }))

  const waiterOptions = waiters.map((waiter) => ({
    value: String(waiter.id),
    label: waiter.full_name
  }))

  const values = selectedTable ? {
    number: selectedTable.number,
    branch: branchOptions[branchOptions.findIndex(i => parseInt(i.value) === parseInt(selectedTable.branch.id))],
    waiter: waiterOptions.filter(i => waiterList.includes(parseInt(i.value)))
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
      const waiterValues = data.waiter.map(waiter => parseInt(waiter.value))  
      reset()  
      toggleSidebar()
      if (selectedTable) {  
      dispatch(
        editTable({
          id: selectedTable.id, 
          number: parseInt(data.number),
          branch: parseInt(data.branch.value),
          waiter: waiterValues
        })
      )
      setSelectedTable('')
      reset()
      } else {
        dispatch(
        addTable({
          number: parseInt(data.number),
          branch: parseInt(data.branch.value),
          waiter: waiterValues
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
      title={selectedTable ? 'Редактирование стола' : 'Создание нового стола'}
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
                id='branch'
                isClearable={false}
                classNamePrefix='select'
                options={branchOptions}
                theme={selectThemeColors}
                placeholder="Выбирите бранч"
                className={classnames('react-select', { 'is-invalid': data !== null && data.branch === "" })}
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
                isMulti
                id='waiter'
                isClearable={false}
                classNamePrefix='select'
                options={waiterOptions}
                theme={selectThemeColors}
                placeholder="Выбирите официанта(ов)"
                className={classnames('react-select', { 'is-invalid': data !== null && data.waiter.length > 0 })}
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