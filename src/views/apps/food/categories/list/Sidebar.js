import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import logo from "@src/assets/images/slider/03.jpg"
import Avatar from '@components/avatar'
import { addCategory, addSubCategory, editCategory, editSubCategory } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  available: ''
}

const stateOptions = [
  { value: 0, label: 'Не активная' },
  { value: 1, label: 'Активная' }
]

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
        content={data.name ? data.name : "Категория"}
      />
    )
  }
}

const SidebarNewCategory = ({ selectedId, open, toggleSidebar, categories, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [item, setItem] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
  if (selectedCategory) {
    setItem(selectedCategory)
    if (selectedCategory.icon) setAvatar(selectedCategory.icon) 
  }
  if (selectedSubCategory) {
    setItem(selectedSubCategory)
    if (selectedSubCategory.icon) setAvatar(selectedSubCategory.icon) 
  } 
  }, [selectedCategory, selectedSubCategory])

  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name
}))

  const values = item ? {
    name: item.name,
    available: selectedSubCategory ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(item.category))] : stateOptions[stateOptions.findIndex(i => parseInt(i.value) === parseInt(item.available))]
   } : selectedId ? {name: '', available: categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedId))]} : {}

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
    setAvatar(logo)
  }

  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      reset()  
      toggleSidebar()
      const formData = new FormData();
      formData.append('name', data.name)
      if (!selectedId) formData.append('available', data.available.value)
      if (selectedId) formData.append('category', data.available.value)
      if (avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('icon', avatarBlob, 'category.jpg')
      }
      if (item) {
          if (selectedCategory) dispatch(editCategory({ id: item.id, formData }))
          if (selectedSubCategory) dispatch(editSubCategory({ id: item.id, formData }))
        } else {
          if (!selectedId) dispatch(addCategory(formData))
          if (selectedId) dispatch(addSubCategory(formData))
        }
        setSelectedSubCategory('')
        setSelectedCategory('')
        setAvatar('')
        setItem('')
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
    setSelectedSubCategory('')
    setSelectedCategory('')
    setAvatar('')
    setItem('')
    reset()
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedCategory ? 'Редактирование категории' : selectedSubCategory ? 'Редактирование субкатегории' : selectedId ? 'Создание новой субкатегории' : 'Создание новой категории'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: item.name})}
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
            render={({ field }) => (
              <Input id='name' placeholder='Введите название категории' invalid={errors.name && true} {...field} />
            )}
          />
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='available'>
          {selectedId ? "Категория" : "Статус"}
          <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='available'
            control={control}
            render={({ field }) => (
              <Select
                id='available'
                isClearable={false}
                classNamePrefix='select'
                options={selectedId ? categoryOptions : stateOptions}
                theme={selectThemeColors}
                placeholder={selectedId ? "Выберите категорию" : "Выберите статус"}
                className={classnames('react-select', { 'is-invalid': data !== null && data.available === "" })}
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

export default SidebarNewCategory