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
import { businessType } from "../../../../../configs/initial"

const defaultValues = {
  name: '',
  type: '',
  available: ''
}

// const typeOptions = [
//   { value: 1, label: 'Food' },
//   { value: 2, label: 'Beauty' }
// ]

const businessOptions = Object.keys(businessType).map((key) => ({
  value: parseInt(key),
  label: businessType[key]
}))

const requiredFields = ["name", "type"]

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

const SidebarNewCategory = ({ selectedId, open, toggleSidebar, categories, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, t }) => {
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
    type: selectedSubCategory ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(item.category))] : businessOptions[businessOptions.findIndex(i => parseInt(i.value) === parseInt(item.category_type))],
    available: typeof item.available === 'boolean' ? item.available : ''
   } : selectedId ? {name: '', type: categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedId))], available: ''} : {}

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
    if (checkIsValid(data, requiredFields)) {
      reset()  
      toggleSidebar()
      const formData = new FormData();
      formData.append('name', data.name)
      if (!selectedId) formData.append('category_type', data.type.value)
      if (!selectedId && data.available !== '') formData.append('available', data.available)
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
      title={selectedCategory ? t('categoryData.titleEditCategory') : selectedSubCategory ? t('categoryData.titleEditSubcategory') : selectedId ? t('categoryData.titleAddSubcategory') : t('categoryData.titleAddCategory')}
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
                {t('download')}
                  <Input type='file' onChange={handleImg} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                {t('clear')}
                </Button>
              </div>
        </div>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
          {t('categoryData.nameLabel')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='name' placeholder={t('categoryData.namePlaceholder')} invalid={errors.name && true} {...field} />
            )}
          />
          {errors && errors.name && (<FormFeedback>{t('categoryData.nameFeedback')}</FormFeedback>)}
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='type'>
          {selectedId ? t('Category') : t('type')}
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
                options={selectedId ? categoryOptions : businessOptions}
                theme={selectThemeColors}
                placeholder={selectedId ? t('categoryPlaceholder') : t('typePlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.type && true })}
                {...field}
              />
            )}
          />
        {errors && errors.type && (<FormFeedback>{selectedId ? t('categoryFeedback') : t('typeFeedback')}</FormFeedback>)}
        </div>
        {(selectedCategory || !selectedId) && 
        <div className='form-check form-check-success mb-3 mt-2'>
          <Controller
            name='available'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='available'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='available'>
          {t('categoryData.Active')}
          </Label>
        </div> }
        <Button type='submit' className='me-1' color='primary'>
        {t('save')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={handleClose}>
        {t('cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewCategory