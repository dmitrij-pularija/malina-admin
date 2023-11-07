import { Fragment, useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { X } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import classnames from "classnames"
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form, FormFeedback } from 'reactstrap'
import { selectThemeColors, formatDataTimetoDataSave, formatTimeSave, formatDataTime, checkIsValid, initSelect, initSelectString } from '@utils'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { english } from "flatpickr/dist/l10n/default.js"
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  business: '',
  user: '',
  name: '',
  phone: '',
  guests: '',
  startDate: '',
  comment: '',
  status: '',
  response: ''
  }
  const getDateTime = (date, time) => {
    if (date && time) {
    return  `${date}T${time}`
    } else return ''
  }  

const requiredFields = ["guests", "startDate", "name", "phone"]

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    users,
    stores,
    filters,
    userData,
    currentStore,
    selectedBooking,
    dispatch,
    addEvent,
    calendarApi,
    selectEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    calendarsColor,
    handleAddEventSidebar
  } = props
  
  // if (open && !currentMaster.value) return toast.error("Вначале выберите специалиста!")
  if (open && !currentStore.value) return toast.error(i18next.language === 'ru' ? "Вначале выберите заведение!" : "Choose a store first!")
  const { t } = useTranslation()

  // const [url, setUrl] = useState('')
  // const [desc, setDesc] = useState('')
  // const [guests, setGuests] = useState({})
  // const [allDay, setAllDay] = useState(false)
  // const [location, setLocation] = useState('')
  // const [endPicker, setEndPicker] = useState(new Date())
  // const [startPicker, setStartPicker] = useState(new Date())
  // const [calendarLabel, setCalendarLabel] = useState([{ value: 'Business', label: 'Business', color: 'primary' }])
  
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language === 'en' ? english : Russian)

  useEffect(() => {
    const handleLanguageChange = () => setCurrentLanguage(i18next.language === 'en' ? english : Russian)
    i18next.on('languageChanged', handleLanguageChange)
    return () => i18next.off('languageChanged', handleLanguageChange)
  }, [])

  // ** Select Options
  // const options = [
  //   { value: 'Business', label: 'Business', color: 'primary' },
  //   { value: 'Personal', label: 'Personal', color: 'danger' },
  //   { value: 'Family', label: 'Family', color: 'warning' },
  //   { value: 'Holiday', label: 'Holiday', color: 'success' },
  //   { value: 'ETC', label: 'ETC', color: 'info' }
  // ]

  // const guestsOptions = [
  //   { value: 'Donna Frank', label: 'Donna Frank', avatar: img1 },
  //   { value: 'Jane Foster', label: 'Jane Foster', avatar: img2 },
  //   { value: 'Gabrielle Robertson', label: 'Gabrielle Robertson', avatar: img3 },
  //   { value: 'Lori Spears', label: 'Lori Spears', avatar: img4 },
  //   { value: 'Sandy Vega', label: 'Sandy Vega', avatar: img5 },
  //   { value: 'Cheryl May', label: 'Cheryl May', avatar: img6 }
  // ]
  
  // const filtredStores = stores.filter(store => parseInt(store.id) === parseInt(store)) 
  const storesOptions = stores.map(store => ({
    value: String(store.id),
    label: store.name
  }))
 
  const usersOptions = users.map(user => ({
    value: String(user.id),
    label: user.name ? user.name : user.login,
    avatar: user.avatar
  }))
  
  const statusOptions = filters.map(filter => ({
    value: filter.value,
    label: i18next.language === 'ru' ? filter.label : filter.value
  }))


  // console.log(servicesMastersList)

  // const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 



  // ** Custom select components
  // const OptionComponent = ({ data, ...props }) => {
  //   return (
  //     <components.Option {...props}>
  //       <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
  //       {data.label}
  //     </components.Option>
  //   )
  // }


  const values = selectedBooking ? {
    user: selectedBooking.user ? initSelect(usersOptions, selectedBooking.user.id) : '',
    name: selectedBooking.name ? selectedBooking.name : '',
    phone: selectedBooking.phone ? selectedBooking.phone : '',
    guests: selectedBooking.guests ? selectedBooking.guests : '',
    business: selectedBooking.business ? initSelect(storesOptions, selectedBooking.business.id) : '',
    startDate: selectedBooking.date && selectedBooking.time ? formatDataTime(getDateTime(selectedBooking.date, selectedBooking.time)) : '',
    status: selectedBooking.status ? initSelectString(statusOptions, selectedBooking.status) : initSelectString(statusOptions, 'pending'),
    response: selectedBooking.response ? selectedBooking.response : '',
    comment: selectedBooking.comment ? selectedBooking.comment : ''
  } : {...defaultValues, user: userData.type === 1 ? initSelect(usersOptions, userData.id) : "", business: userData.type === 2 ? initSelect(storesOptions, userData.id) : currentStore ? initSelect(storesOptions, currentStore.value) : '', name: userData.type === 1 ? userData.name : "", phone: userData.type === 1 ? userData.login : "", status: initSelectString(statusOptions, 'pending')}

  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  // console.log(values.status)

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
          {data.avatar ? <Avatar className='my-0 me-1' size='sm' img={data.avatar} /> : <Avatar initials className='my-0 me-1' size='sm' color={'light-primary'} content={data.label ? data.label : "Malina"} />}
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }

  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }
    existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
      allDay: updatedEventData.allDay
    })

    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }
 
  // const handleUpdateEvent = () => {
  //   if (getValues('title').length) {
  //     const eventToUpdate = {
  //       id: selectedEvent.id,
  //       title: getValues('title'),
  //       allDay,
  //       start: startPicker,
  //       end: endPicker,
  //       url,
  //       display: allDay === false ? 'block' : undefined,
  //       extendedProps: {
  //         location,
  //         description: desc,
  //         guests,
  //         calendar: calendarLabel[0].label
  //       }
  //     }

  //     const propsToUpdate = ['id', 'title', 'url']
  //     const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']
  //     dispatch(updateEvent(eventToUpdate))
  //     updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)

  //     handleAddEventSidebar()
  //     toast.success('Event Updated')
  //   } else {
  //     setError('title', {
  //       type: 'manual'
  //     })
  //   }
  // }

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = eventId => {
    calendarApi.getEventById(eventId).remove()
  }
  const handleClose = () => {
    for (const key in defaultValues) setValue(key, "")
    handleAddEventSidebar()
    reset({ ...defaultValues })
    dispatch(selectEvent({}))
  } 

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedAppointment.id))
    removeEventInCalendar(selectedAppointment.id)
    handleClose()
    toast.success('Запись удалена')
  }

  const onSubmit = (data) => {
    const newData = {}
    if (checkIsValid(data, requiredFields)) {
      newData.business = currentStore.value
      if (data.guests) newData.guests = data.guests
      if (data.user) newData.user = data.user.value
      if (data.name) newData.name = data.name
      if (data.phone) newData.phone = data.phone
      if (data.comment) newData.comment = data.comment
      if (data.startDate) {
        newData.date = formatDataTimetoDataSave(data.startDate).toString()
        newData.time = formatTimeSave(data.startDate).toString()
      }
      if (data.status) newData.status = data.status.value
      if (data.response) newData.response = data.response
      
      if (selectedBooking && selectedBooking.user) {
        dispatch(updateEvent({ id: selectedBooking.id, booking: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addEvent({ booking: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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


  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleClose}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedBooking && selectedBooking.user ? t('bookingsData.editTitle') : t('bookingsData.addTitle')}
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form onSubmit={handleSubmit(onSubmit)}>
        
            <div className='mb-1'>
              <Label className='form-label' for='user'>
              {t('bookingsData.customer')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="user"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                id='user'
                className={classnames('react-select', { 'is-invalid': errors.user && true })}
                classNamePrefix='select'
                isClearable={false}
                isDisabled={userData && userData.type === 1}
                options={usersOptions}
                theme={selectThemeColors}
                placeholder={t('bookingsData.customerPlaceholder')}
                components={{
                  Option: SelectComponent
                }}
                {...field}
              />
              )}
              />
              {errors && errors.guests && (
                <FormFeedback>{t('bookingsData.customerFeedback')}</FormFeedback>
              )} 
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='name'>
              {t('bookingsData.name')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='name' placeholder={t('bookingsData.namePlaceholder')} invalid={errors.name && true} {...field} />
                )}
              />
                {errors && errors.name && (
                <FormFeedback>{t('bookingsData.nameFeedback')}</FormFeedback>
              )} 
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='phone'>
              {t('bookingsData.phone')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='phone'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='phone' placeholder={t('bookingsData.phonePlaceholder')} invalid={errors.phone && true} {...field} />
                )}
              />
                {errors && errors.phone && (
                <FormFeedback>{t('bookingsData.phoneFeedback')}</FormFeedback>
              )} 
            </div>
            
            {/* <div className='mb-1'>
              <Label className='form-label' for='master'>
                Специалист<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="master"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                id='master'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={masterOptions}
                theme={selectThemeColors}
                placeholder="Выберите специалиста"
                // value={guests.length ? [...guests] : null}
                // onChange={data => setMaster([...data])}
                components={{
                  Option: SelectComponent
                }}
                {...field}
              />
              )}
              />
              {errors && errors.master && (
                <FormFeedback>Пожалуйста выберите специалиста</FormFeedback>
              )} 
            </div> */}
            

            <div className='mb-1'>
              <Label className='form-label' for='startDate'>
              {t('bookingsData.startDate')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                id="startDate"
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
              <Flatpickr
                required
                id='startDate'
                name='startDate'
                className={classnames('form-control', { 'is-invalid': errors.startDate && true })}
                onChange={date => setValue("startDate", date)}
                value={field.value}
                options={{
                  enableTime: true,
                  locale: currentLanguage,
                  dateFormat: 'd.m.Y, H:i'
                }}
              />
              )}
              />
              {errors && errors.startDate && (
              <FormFeedback>{t('appointmentsData.startDateFeedback')}</FormFeedback>
              )} 
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='guests'>
              {t('bookingsData.guests')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='guests'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='guests' placeholder={t('bookingsData.guestsPlaceholder')} invalid={errors.guests && true} {...field} />
                )}
              />
                {errors && errors.guests && (
                <FormFeedback>{t('bookingsData.guestsFeedback')}</FormFeedback>
              )} 
            </div>
            {userData.type === 2 && 
            <div className='mb-1'>
              <Label className='form-label' for='status'>
              {t('bookingsData.status')}
              </Label>
              <Controller
                  name="status"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
              <Select
                id='status'
                className={classnames('react-select', { 'is-invalid': errors.status && true })}
                classNamePrefix='select'
                isClearable={false}
                // isDisabled={userData && userData.type === 1}
                options={statusOptions}
                theme={selectThemeColors}
                placeholder={t('bookingsData.statusPlaceholder')}
                {...field}
              />
              )}
              />
              {errors && errors.status && (
                <FormFeedback>{t('bookingsData.statusFeedback')}</FormFeedback>
              )} 
            </div>}
            {userData.type === 2 && 
            <div className='mb-1'>
              <Label className='form-label' for='response'>
              {t('bookingsData.response')}
              </Label>
              <Controller
                name='response'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input id='name' placeholder={t('bookingsData.responsePlaceholder')} invalid={errors.response && true} {...field} />
                )}
              />
                {errors && errors.response && (
                <FormFeedback>{t('bookingsData.responseFeedback')}</FormFeedback>
              )} 
            </div>}
            <div className='mb-1'>
              <Label className='form-label' for='comment'>
              {t('bookingsData.comment')}
              </Label>
              <Controller
                  name="comment"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
              <Input
                type='textarea'
                name='text'
                id='comment'
                rows='3'
                placeholder={t('bookingsData.commentPlaceholder')}
                {...field}
              />
              )}
              />
              {errors && errors.comment && (
                <FormFeedback>{t('bookingsData.commentFeedback')}</FormFeedback>
              )} 
            </div>
            <div className='d-flex mb-1'>
            <Fragment>
             <Button className='me-1' type='submit' color='primary'>
               {selectedBooking && selectedBooking.user ? t('bookingsData.edit') : t('bookingsData.add')}
             </Button>
             <Button color='secondary' type='reset' onClick={selectedBooking && selectedBooking.user ? handleDeleteEvent : handleClose} outline>
               {selectedBooking && selectedBooking.user ? t('bookingsData.delete') : t('bookingsData.cancel') }
             </Button>
            </Fragment>
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar
