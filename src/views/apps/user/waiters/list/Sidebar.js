import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import Avatar from '@components/avatar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input, FormFeedback } from 'reactstrap'
import { addWaiter, editWaiter } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  shift: '',
  fullName: '',
  telegram: ''
}

const requiredFields = ["fullName"]

const checkIsValid = (data) => {
  return Object.keys(data).every((key) => {
    const field = data[key]
    if (requiredFields.includes(key)) {
      if (typeof field === "object") {
        return field.value !== ""
      } else {
        return field.length > 0
      }
    } else {
      return true
    }
  })
}


const renderAvatar = data => {
  if (data.avatar) {
    return <Avatar className='me-1' img={data.avatar} size='xl' />
  } else {
    return (
      <Avatar
        initials
        size='xl'
        className='me-1'
        color={'light-primary'}
        content={data.name ? data.name : "Waiter"}
      />
    )
  }
}

const SidebarNewWaiters = ({ shifts, open, toggleSidebar, selectedWaiter, setSelectedWaiter }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if (selectedWaiter) setAvatar(selectedWaiter.profile_picture) 
    }, [selectedWaiter])

  const shiftsOptions = shifts.map((item) => ({
    value: String(item.id),
    label: `${item.business.name} ${item.start_time.slice(0, -3)} - ${item.end_time.slice(0, -3)}`
  }))

  const values = selectedWaiter ? {
    fullName: selectedWaiter.full_name ? selectedWaiter.full_name : '',
    telegram: selectedWaiter.telegram ? selectedWaiter.telegram : '',
    shift: selectedWaiter.shift ? shiftsOptions[shiftsOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.shift.id))] : ''} : {}
  
    const {
      reset,
      control,
      setError,
      setValue,
      getValues,
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


  const onSubmit = data => {
    if (checkIsValid(data)) {
      const formData = new FormData()
      formData.append('full_name', data.fullName)
      if (data.shift) formData.append('shift', data.shift.value)
      if (data.telegram) formData.append('telegram', data.telegram)
      if (avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('profile_picture', avatarBlob, 'avatar.jpg')
      }
      if (selectedWaiter) {
        dispatch(editWaiter({ id: selectedWaiter.id, formData }))
      } else {
        dispatch(addWaiter(formData))
      }
      setSelectedWaiter('')
      toggleSidebar()
      setAvatar('')
      reset()
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

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setSelectedWaiter('')
    setAvatar('')
    reset()
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedWaiter ? 'Редактирование официанта' : 'Новый официант'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedWaiter.full_name})}
        </div>
        <div className='d-flex align-items-center justify-content-center mt-75'>
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
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='fullName'>
            Имя <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='fullName' placeholder='John' invalid={errors.fullName && true} {...field} />
            )}
          />
          {errors && errors.fullName && (<FormFeedback>Пожалуйста заполните имя</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='telegram'>
          ID полученный в Телеграмм - боте <a href='https://t.me/malinappbot' target="_blank" className='w-100'>@malinappbot</a><span className='text-danger'>*</span>
          </Label>
          <Controller
            name='telegram'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='telegram' placeholder='12345' invalid={errors.telegram && true} {...field} />
            )}
          />
          {errors && errors.telegram && (<FormFeedback>Введите Телеграмм ID</FormFeedback>)}  
        </div>  
        <div className='mb-3'>
          <Label className='form-label' for='shift'>
          Смена
          </Label>
          <Controller
            name='shift'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='shift'
                isClearable={false}
                classNamePrefix='select'
                options={shiftsOptions}
                theme={selectThemeColors}
                placeholder="Выберите смену"
                className={classnames('react-select', { 'is-invalid': errors.shift && true })}
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