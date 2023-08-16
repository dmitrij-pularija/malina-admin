import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import Avatar from '@components/avatar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input } from 'reactstrap'
import { addWaiter, editWaiter } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  storeid: '',
  fullName: '',
  telegram: ''
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field.value !== "" : field.length > 0))
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

const SidebarNewWaiters = ({ stores, open, toggleSidebar, selectedWaiter, setSelectedWaiter }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if (selectedWaiter) setAvatar(selectedWaiter.profile_picture) 
    }, [selectedWaiter])

  const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const values = selectedWaiter ? {
    fullName: selectedWaiter.full_name,
    telegram: selectedWaiter.telegram,
    storeid: storeOptions[storeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.storeid.id))]} : {}
  
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


  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {

      const formData = new FormData()
      formData.append('full_name', data.fullName)
      formData.append('storeid', data.storeid.value)

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
          <Label className='form-label' for='storeid'>
          Ресторан <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='storeid'
            control={control}
            render={({ field }) => (
              <Select
                id='storeid'
                isClearable={false}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                placeholder="Выберите заведение"
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
