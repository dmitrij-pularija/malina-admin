import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors, checkIsValid, dataURLtoBlob } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormFeedback, Form, Input } from 'reactstrap'
import Avatar from '@components/avatar'
import { addAddon, editAddon } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  price: 0
}

const requiredFields = ["name"]

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
        content={data.name ? data.name : "Добавка"}
      />
    )
  }
}

const SidebarAddons = ({ open, toggleSidebar, selectedAddon, setSelectedAddon }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')

  const values = selectedAddon ? {
    name: selectedAddon.name ? selectedAddon.name : '',
    price: selectedAddon.price ? selectedAddon.price : 0} : {}

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
   
  const handleClose = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
      setAvatar('')
      toggleSidebar()
      setSelectedAddon('')
      reset({...defaultValues})
  }

  const handleImgReset = () => {
    setAvatar('')
  }

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      formData.append('name', data.name)
      if (data.price) formData.append('price', data.price)
      if (avatar && avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('image', avatarBlob, 'addon.jpg')
      }
      if (selectedAddon) {
          dispatch(editAddon({ id: selectedAddon.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        } else {
          dispatch(addAddon(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        }
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

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedAddon ? 'Редактирование добавки' : 'Создание новой добавки'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedAddon.name})}
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
          <Label className='form-label' for='name'>
          Название <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='name' placeholder='Введите название' invalid={errors.name && true} {...field} />
            )}
          />
          {errors && errors.name && (<FormFeedback>Пожалуйста введите название</FormFeedback>)}
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='price'>
          Цена
          </Label>
          <Controller
            name='price'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='price' placeholder='Введите цену' invalid={errors.price && true} {...field} />
            )}
          />
          {errors && errors.price && (<FormFeedback>Пожалуйста введите цену</FormFeedback>)}
        </div>
        <Button type='submit' className='me-1' color='primary'>
          Сохранить
        </Button>
        <Button type='reset' color='secondary' outline onClick={handleClose}>
          Отменить
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarAddons