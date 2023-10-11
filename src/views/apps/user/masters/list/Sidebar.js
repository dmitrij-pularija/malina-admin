import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import Avatar from '@components/avatar'
import { selectThemeColors, checkIsValid, dataURLtoBlob, initSelect } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input, FormFeedback } from 'reactstrap'
import { addMaster, editMaster } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  business: '',
  specialty: '',
  name: '',
  surname: '',
  login: '',
  password: '',
  phone: ''
}

// const CustomCreatableSelect = ({ onCreateOption, ...props }) => {
//   const handleCreateOption = (inputValue) => {
//     const [timeRange, description] = inputValue.split(' ')
//     const startTime = timeRange.split('-')[0].trim()
//     const endTime = timeRange.split('-')[1].trim()
//     onCreateOption({
//       start_time: startTime,
//       end_time: endTime,
//       description
//     })
//   }

//   return (
//     <CreatableSelect
//       formatCreateLabel={({ label }) => `Создать смену: ${label}`}
//       onCreateOption={handleCreateOption}
//       {...props}
//     />
//   )
// }

const requiredFields = ["login", "business"]

// const checkIsValid = (data) => {
//   return Object.keys(data).every((key) => {
//     const field = data[key]
//     if (requiredFields.includes(key)) {
//       if (typeof field === "object") {
//         return field.value !== ""
//       } else {
//         return field.length > 0
//       }
//     } else {
//       return true
//     }
//   })
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
        content={data.name ? data.name : "Специалист"}
      />
    )
  }
}

const SidebarNewMaster = ({ stores, specialties, open, toggleSidebar, selectedMaster, setSelectedMaster }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')
  // const values = {}
  const specialtyOptions = specialties.map((item) => ({
    value: String(item.id),
    label: item.specialty_name
  }))

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
}))

  useEffect(() => {
    if (selectedMaster) {
      setAvatar(selectedMaster.master_profile_picture)
      // values.fullName = selectedWaiter.full_name ? selectedWaiter.full_name : ''
      // values.telegram = selectedWaiter.telegram ? selectedWaiter.telegram : ''
      // values.businessId = selectedWaiter.business_id ? storeOptions[storeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.business_id.id))] : ''
      // values.shift = selectedWaiter.shift ? shiftsOptions[shiftsOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.shift.id))] : ''
    }

    }, [selectedMaster])

  const values = selectedMaster ? {
    business: initSelect(storeOptions, selectedMaster.master_business),
    specialty: initSelect(specialtyOptions, selectedMaster.master_specialty),
    name: selectedMaster.master_name ? selectedMaster.master_name : '',
    surname: selectedMaster.surname ? selectedMaster.surname : '',
    login: selectedMaster.telegram ? selectedMaster.telegram : '',
    phone: selectedMaster.telegram ? selectedMaster.telegram : ''
    } : {}
  
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
  
//     const handleCreateOption = (value) => {
// console.log(value)
//     }

//     const formatCreateLabel = (inputValue) => {
//       return `Создать смену: ${inputValue}`
//     }

  
    const handleImgReset = () => {
      setAvatar('')
    } 
    const handleClose = () => {
      // console.log('clear')
      for (const key in defaultValues) {
        setValue(key, '')
      }
      // for (const key in values) {
      //   setValue(key, '')
      // }
        setSelectedMaster('')
        toggleSidebar()
        setAvatar('')
        reset({...defaultValues})
    }

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      formData.append('master_business', data.business.value)
      formData.append('login', data.login)
      if (data.specialty) formData.append('master_specialty', data.specialty.value)
      if (data.name) formData.append('master_name', data.name)
      if (data.surname) formData.append('surname', data.surname)
      if (data.phone) formData.append('phone', data.phone)
      if (avatar && avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('master_profile_picture', avatarBlob, 'avatar.jpg')
      }
      if (selectedMaster) {
        dispatch(editMaster({ id: selectedMaster.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addMaster(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
      title={selectedMaster ? 'Редактирование специалиста' : 'Новый специалист'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
      // onClosed={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedMaster.master_name})}
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
            Имя
          </Label>
          <Controller
            name='name'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='name' placeholder='John' invalid={errors.name && true} {...field} />
            )}
          />
          {errors && errors.name && (<FormFeedback>Пожалуйста заполните имя</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='surname'>
            Фамилия
          </Label>
          <Controller
            name='surname'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='surname' placeholder='Dou' invalid={errors.surname && true} {...field} />
            )}
          />
          {errors && errors.surname && (<FormFeedback>Пожалуйста заполните фамилию</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='business'>
          Заведение <span className='text-danger'>*</span>
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
                placeholder="Выберите Заведение"
                className={classnames('react-select', { 'is-invalid': errors.business && true })}
                {...field}
              />
            )}
          />
          {errors && errors.business && (<FormFeedback>Пожалуйста выберите заведение</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='specialty'>
          Специальность
          </Label>
          <Controller
            name='specialty'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='specialty'
                isClearable={false}
                classNamePrefix='select'
                options={specialtyOptions}
                theme={selectThemeColors}
                placeholder="Выберите специальность"
                className={classnames('react-select', { 'is-invalid': errors.specialty && true })}
                {...field}
              />
            )}
          />
          {errors && errors.specialty && (<FormFeedback>Пожалуйста выберите специальность</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='login'>
          Логин <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='login'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='login' placeholder='Введите логин' invalid={errors.login && true} {...field} />
            )}
          />
          {errors && errors.login && (<FormFeedback>Введите логин</FormFeedback>)}  
        </div> 
        <div className='mb-2'>
          <Label className='form-label' for='phone'>
          Телефон
          </Label>
          <Controller
            name='phone'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='phone' placeholder='Введите теоефон' invalid={errors.phone && true} {...field} />
            )}
          />
          {errors && errors.phone && (<FormFeedback>Введите теоефон</FormFeedback>)}  
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

export default SidebarNewMaster