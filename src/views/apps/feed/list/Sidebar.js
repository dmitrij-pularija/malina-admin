import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Sidebar from '@components/sidebar'
import { selectThemeColors, checkIsValid, dataURLtoBlob, initSelect } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormFeedback, Form, Input } from 'reactstrap'
import Avatar from '@components/avatar'
import { getFeeds, addFeed, editFeed } from '../store'
import { feedsType } from "../../../../configs/initial"

const defaultValues = {
  title: '',
  subtitle: '',
  text: '',
  type: '',
  business: ''
}

// const supplierOptions = [
//   { value: 1, label: 'Beauty' },
//   { value: 2, label: 'Food' }
// ]

const requiredFields = ["title", "business", "type"]

// const checkIsValid = data => {
//   return Object.values(data).every(field => (typeof field === 'object' ? field.value !== "" : field.length > 0))
// }

const renderAvatar = data => {
  if (data.avatar) {
    return <img
    height='150'
    width='150'
    alt='Feed picture'
    src={data.avatar}
    className='img-fluid rounded'
    style={{ height: "150px", width: "150px" }}
  />

    // return <Avatar className='rounded me-1' img={data.avatar} style={{ height: "150px", width: "150px" }} />
  } else {
    return (
      <Avatar
        initials
        className='rounded me-1'
        color={'light-primary'}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(58px)",
          width: "100%",
          height: "100%"
        }}
        style={{ height: "150px", width: "150px" }}
        content={data.name ? data.name : "Публикация"}
      />
    )
  }
}

const SidebarFeed = ({ stores, open, toggleSidebar, selectedFeed, setSelectedFeed }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')

  const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const feedsTypeOptions = Object.keys(feedsType).map((key) => ({
    value: parseInt(key),
    label: feedsType[key]
  }))

  const values = selectedFeed ? {
    title: selectedFeed.title ? selectedFeed.title : '',
    subtitle: selectedFeed.subtitle ? selectedFeed.subtitle : '',
    text: selectedFeed.text ? selectedFeed.text : '',
    business: initSelect(storeOptions, selectedFeed.business.id),
    type: initSelect(feedsTypeOptions, selectedFeed.type)
    } : {}

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
      setSelectedFeed('')
      reset({...defaultValues})
      dispatch(getFeeds())
  }

  const handleImgReset = () => {
    setAvatar('')
  }

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData();
      formData.append('title', data.title)
      formData.append('business', data.business.value)
      formData.append('type', data.type.value)
      if (data.subtitle) formData.append('subtitle', data.subtitle)
      if (data.text) formData.append('text', data.text)

      if (avatar && avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('image', avatarBlob, 'feed.jpg')
      }
      if (selectedFeed) {
          dispatch(editFeed({ id: selectedFeed.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
        } else {
          dispatch(addFeed(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
      title={selectedFeed ? 'Редактирование публикации' : 'Создание новой публикации'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedFeed.title})}
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
          <Label className='form-label' for='title'>
          Заголовок<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='title' placeholder='Введите заголовок' invalid={errors.title && true} {...field} />
            )}
          />
          {errors && errors.title && (<FormFeedback>Пожалуйста введите заголовок</FormFeedback>)}
        </div>  
        <div className='mb-1'>
          <Label className='form-label' for='subtitle'>
          Под заголовок 
          </Label>
          <Controller
            name='subtitle'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='subtitle' placeholder='Введите под заголовок' invalid={errors.subtitle && true} {...field} />
            )}
          />
          {errors && errors.subtitle && (<FormFeedback>Пожалуйста введите под заголовок</FormFeedback>)}
        </div>
        
        <div className='mb-1'>
          <Label className='form-label' for='business'>
          Заведение<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='business'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='business'
                isClearable={false}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                placeholder={"Выберите заведение"}
                className={classnames('react-select', { 'is-invalid': errors.business && true })}
                {...field}
              />
            )}
          />
        {errors && errors.business && (<FormFeedback>{`Пожалуйста выберите заведение`}</FormFeedback>)}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='type'>
          Тип<span className='text-danger'>*</span>
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
                options={feedsTypeOptions}
                theme={selectThemeColors}
                placeholder={"Выберите тип публикации"}
                className={classnames('react-select', { 'is-invalid': errors.type && true })}
                {...field}
              />
            )}
          />
        {errors && errors.type && (<FormFeedback>{`Пожалуйста выберите тип публикации`}</FormFeedback>)}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='text'>
          Публикация
          </Label>
          <Controller
            name='text'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='text' type="textarea" placeholder='Введите публикацию' invalid={errors.text && true} {...field} />
            )}
          />
          {errors && errors.text && (<FormFeedback>Пожалуйста введите публикацию</FormFeedback>)}
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

export default SidebarFeed