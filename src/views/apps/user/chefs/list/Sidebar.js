import { useState } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors, checkIsValid, dataURLtoBlob, initSelect  } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormFeedback, Form, Input } from 'reactstrap'
import Avatar from '@components/avatar'
import { addСhefs, editСhefs } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  name: '',
  telegramId: '',
  business: ''
}

// const supplierOptions = [
//   { value: 1, label: 'Beauty' },
//   { value: 2, label: 'Food' }
// ]

const requiredFields = ["telegramId"]

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

const SidebarNewCategory = ({ stores, userData, open, toggleSidebar, selectedСhef, setSelectedСhef, t }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const values = selectedСhef ? {
    name: selectedСhef.name ? selectedСhef.name : '',
    telegramId: selectedСhef.telegram_id ? selectedСhef.telegram_id : '',
    business: initSelect(storeOptions, selectedСhef.business)
  } : {...defaultValues, business: userData.type === 2 ? initSelect(storeOptions, userData.id) : ""}

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
      setSelectedСhef('')
      reset({...defaultValues})
  }

  const handleImgReset = () => {
    setAvatar('')
  }

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData();
      formData.append('telegram_id', data.telegramId)
      formData.append('business', data.business.value)
      if (data.name) formData.append('name', data.name)
      if (avatar && avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('icon', avatarBlob, 'category.jpg')
      }
      if (selectedСhef) {
          dispatch(editСhefs({ id: selectedСhef.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        } else {
          dispatch(addСhefs(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
      title={selectedСhef ? t('сhefsData.titleEdit') : t('сhefsData.titleAdd')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedСhef.name})}
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
          {t('nameLabel')} 
          </Label>
          <Controller
            name='name'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='name' placeholder={t('namePlaceholder')} invalid={errors.name && true} {...field} />
            )}
          />
          {errors && errors.name && (<FormFeedback>{t('nameFeedback')}</FormFeedback>)}
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='business'>
          {t('storeLabel')}<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='business'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='business'
                isClearable={false}
                isDisabled={userData && userData.type === 2}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                placeholder={t('storePlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.business && true })}
                {...field}
              />
            )}
          />
        {errors && errors.business && (<FormFeedback>{t('storeFeedback')}</FormFeedback>)}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='telegramId'>
          {t('сhefsData.telegramIdLabel')} <a href='https://t.me/malinappbot' target="_blank" className='w-100'>@malinappbot</a><span className='text-danger'>*</span> 
          </Label>
          <Controller
            name='telegramId'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='telegramId' placeholder={t('сhefsData.telegramIdPlaceholder')} invalid={errors.telegramId && true} {...field} />
            )}
          />
          {errors && errors.telegramId && (<FormFeedback>{t('сhefsData.telegramIdFeedback')}</FormFeedback>)}
        </div> 
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