import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors, checkIsValid, dataURLtoBlob } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormFeedback, Form, Input } from 'reactstrap'
// import logo from "@src/assets/images/slider/03.jpg"
import Avatar from '@components/avatar'
import { addCategory, addSubCategory, editCategory, editSubCategory } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  type: ''
}

const typeOptions = [
  { value: 1, label: 'Food' },
  { value: 2, label: 'Beauty' }
]

const requiredFields = ["name", "name"]

// const checkIsValid = data => {
//   return Object.values(data).every(field => (typeof field === 'object' ? field.value !== "" : field.length > 0))
// }

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
  // const [data, setData] = useState(null)
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
    type: selectedSubCategory ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(item.category))] : typeOptions[typeOptions.findIndex(i => parseInt(i.value) === parseInt(item.category_type))]
   } : selectedId ? {name: '', type: categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedId))]} : {}

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
   
  // const dataURLtoBlob = dataURL => {
  //   const arr = dataURL.split(',')
  //   const mime = arr[0].match(/:(.*?);/)[1]
  //   const bstr = atob(arr[1])
  //   let n = bstr.length
  //   const u8arr = new Uint8Array(n)
  
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n)
  //   }
  
  //   return new Blob([u8arr], { type: mime })
  // }
  const handleClose = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
      setItem('')
      setAvatar('')
      toggleSidebar()
      setSelectedSubCategory('')
      setSelectedCategory('')
      reset({...defaultValues})
  }

  const handleImgReset = () => {
    setAvatar('')
  }

  const onSubmit = data => {
    // setData(data)
    if (checkIsValid(data, requiredFields)) {
      reset()  
      toggleSidebar()
      const formData = new FormData();
      formData.append('name', data.name)
      if (!selectedId) formData.append('category_type', data.type.value)
      if (selectedId) formData.append('category', data.type.value)
      if (avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('icon', avatarBlob, 'category.jpg')
      }
      if (item) {
          if (selectedCategory) dispatch(editCategory({ id: item.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
          if (selectedSubCategory) dispatch(editSubCategory({ id: item.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        } else {
          if (!selectedId) dispatch(addCategory(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
          if (selectedId) dispatch(addSubCategory(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        }
        // setSelectedSubCategory('')
        // setSelectedCategory('')
        // setAvatar('')
        // setItem('')
        // reset()  
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

  // const handleSidebarClosed = () => {
  //   for (const key in defaultValues) {
  //     setValue(key, '')
  //   }
  //   setSelectedSubCategory('')
  //   setSelectedCategory('')
  //   setAvatar('')
  //   setItem('')
  //   reset()
  // }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedCategory ? 'Редактирование категории' : selectedSubCategory ? 'Редактирование субкатегории' : selectedId ? 'Создание новой субкатегории' : 'Создание новой категории'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
      // onClosed={handleSidebarClosed}
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
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='name' placeholder='Введите название' invalid={errors.name && true} {...field} />
            )}
          />
          {errors && errors.name && (<FormFeedback>Пожалуйста название</FormFeedback>)}
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='type'>
          {selectedId ? "Категория" : "Тип"}
          <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='type'
                isClearable={false}
                classNamePrefix='select'
                options={selectedId ? categoryOptions : typeOptions}
                theme={selectThemeColors}
                placeholder={selectedId ? "Выберите категорию" : "Выберите тип"}
                className={classnames('react-select', { 'is-invalid': errors.type && true })}
                {...field}
              />
            )}
          />
        {errors && errors.type && (<FormFeedback>{`Пожалуйста выберите ${selectedId ? "Категорию" : "Тип"}`}</FormFeedback>)}
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

export default SidebarNewCategory