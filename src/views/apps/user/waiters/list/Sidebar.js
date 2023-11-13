import { useState, useEffect } from 'react'
import Sidebar from '@components/sidebar'
import Avatar from '@components/avatar'
import { selectThemeColors, checkIsValid, dataURLtoBlob, initSelect } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, Form, Input, FormFeedback } from 'reactstrap'
import { addWaiter, editWaiter } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  shift: '',
  businessId: '',
  fullName: '',
  telegram: ''
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

const requiredFields = ["fullName", "businessId"]

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
        content={data.name ? data.name : "Waiter"}
      />
    )
  }
}

const SidebarNewWaiters = ({ shifts, userData, stores, open, toggleSidebar, selectedWaiter, setSelectedWaiter, t }) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')
  // const values = {}
  const initShiftsOptions = id => { 
  const filtredShifts = id ? shifts.filter(shift => parseInt(shift.business.id) === parseInt(id)) : shifts
  return filtredShifts.map((item) => ({
    value: String(item.id),
    label: `${item.start_time.slice(0, -3)} - ${item.end_time.slice(0, -3)} ${item.description} `
  }))
}
  const [shiftsOptions, setShiftsOptions] = useState(initShiftsOptions(selectedWaiter ? selectedWaiter.business_id.id : ''))

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
}))

  useEffect(() => {
    if (selectedWaiter) {
      setAvatar(selectedWaiter.profile_picture)
      // values.fullName = selectedWaiter.full_name ? selectedWaiter.full_name : ''
      // values.telegram = selectedWaiter.telegram ? selectedWaiter.telegram : ''
      // values.businessId = selectedWaiter.business_id ? storeOptions[storeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.business_id.id))] : ''
      // values.shift = selectedWaiter.shift ? shiftsOptions[shiftsOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.shift.id))] : ''
    }

    }, [selectedWaiter])

  const values = selectedWaiter ? {
    fullName: selectedWaiter.full_name ? selectedWaiter.full_name : '',
    telegram: selectedWaiter.telegram ? selectedWaiter.telegram : '',
    businessId: initSelect(storeOptions, selectedWaiter.business_id.id),
    shift: selectedWaiter.shift ? shiftsOptions[shiftsOptions.findIndex(i => parseInt(i.value) === parseInt(selectedWaiter.shift.id))] : ''
    } : {...defaultValues, businessId: userData.type === 2 ? initSelect(storeOptions, userData.id) : ""}
  
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
     
    const handleImgReset = () => {
      setAvatar('')
    } 
    const handleClose = () => {
      for (const key in defaultValues) {
        setValue(key, '')
      }
        setSelectedWaiter('')
        toggleSidebar()
        setAvatar('')
        reset({...defaultValues})
    }

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      formData.append('full_name', data.fullName)
      formData.append('business_id', data.businessId.value)
      if (data.shift) formData.append('shift', data.shift.value)
      if (data.telegram) formData.append('telegram', data.telegram)
      if (avatar && avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('profile_picture', avatarBlob, 'avatar.jpg')
      }
      if (selectedWaiter) {
        dispatch(editWaiter({ id: selectedWaiter.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addWaiter(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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

  const handleStoreChange = (selectedOption) => {
    setValue("shift", "")
    setShiftsOptions(initShiftsOptions(selectedOption.value))
    setValue("businessId", selectedOption)
  } 


  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedWaiter ? t('waiterData.titleEdit') : t('waiterData.titleAdd')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-1'>
        <div className='d-flex align-items-center justify-content-center'>
        {renderAvatar({avatar, name: selectedWaiter.full_name})}
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
          <Label className='form-label' for='fullName'>
          {t('nameLabel')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='fullName' placeholder={t('namePlaceholder')} invalid={errors.fullName && true} {...field} />
            )}
          />
          {errors && errors.fullName && (<FormFeedback>{t('nameFeedback')}</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='businessId'>
          {t('storeLabel')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='businessId'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='businessId'
                isClearable={false}
                value={field.value}
                isDisabled={userData && userData.type === 2}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                onChange={handleStoreChange}
                placeholder={t('storePlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.businessId && true })}
              />
            )}
          />
          {errors && errors.businessId && (<FormFeedback>{t('storeFeedback')}</FormFeedback>)}  
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='shift'>
          {t('shift')}
          </Label>
          <Controller
            name='shift'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                id='shift'
                isClearable={false}
                // value={field.value}
                isDisabled={!getValues('businessId').value}
                classNamePrefix='select'
                options={shiftsOptions}
                theme={selectThemeColors}
                placeholder={t('waiterData.shiftPlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.shift && true })}
                {...field}
              />
            )}
          />
          {errors && errors.shift && (<FormFeedback>{t('waiterData.shiftFeedback')}</FormFeedback>)}
        </div>
        {/* <div className='mb-3'>
  <Label className='form-label' htmlFor='shift'>
    Смена
  </Label>
  <Controller
    name='shift'
    control={control}
    rules={{ required: false }}
    render={({ field }) => (
      <CreatableSelect
        id='shift'
        isClearable={false}
        options={shiftsOptions}
        theme={selectThemeColors}
        onCreateOption={handleCreateOption}
        formatCreateLabel={formatCreateLabel}
        placeholder="Выберите смену или добавьте новую"
        className={classnames('react-select', { 'is-invalid': errors.shift && true })}
        {...field}
      />
    )}
  />
</div> */}
{/* <div className='mb-3'>
  <Label className='form-label' htmlFor='shift'>
    Смена
  </Label>
  <Controller
    name='shift'
    control={control}
    rules={{ required: false }}
    render={({ field }) => (
      <CustomCreatableSelect
        id='shift'
        isClearable={false}
        options={shiftsOptions}
        theme={selectThemeColors}
        placeholder="Введите смену в формате ЧЧ:ММ - ЧЧ:ММ"
        className={classnames('react-select', { 'is-invalid': errors.shift && true })}
        {...field}
      />
    )}
  />
</div> */}
<div className='mb-3'>
          <Label className='form-label' for='telegram'>
          {t('waiterData.telegramIdLabel')} <a href='https://t.me/malinappbot' target="_blank" className='w-100'>@malinappbot</a><span className='text-danger'>*</span>
          </Label>
          <Controller
            name='telegram'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='telegram' placeholder={t('waiterData.telegramIdPlaceholder')} invalid={errors.telegram && true} {...field} />
            )}
          />
          {errors && errors.telegram && (<FormFeedback>{t('waiterData.telegramIdFeedback')}</FormFeedback>)}  
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

export default SidebarNewWaiters