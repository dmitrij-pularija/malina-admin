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
import { selectThemeColors, formatDataTimeSave, formatDataTime, checkIsValid, initSelect, initSelectString } from '@utils'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { english } from "flatpickr/dist/l10n/default.js"
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  guests: '',
  name: '',
  phone: '',
  master: '',
  services: '',
  startDate: '',
  endDate: '',
  comment: '',
  status: ''
  }

const requiredFields = ["guests", "name", "phone", "startDate"]

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    users,
    masters,
    filters,
    services,
    userData,
    currentMaster,
    selectedAppointment,
    dispatch,
    addEvent,
    calendarApi,
    selectEvent,
    updateEvent,
    removeEvent,
    changeStatus,
    refetchEvents,
    calendarsColor,
    handleAddEventSidebar
  } = props
  
  // if (open && !currentMaster.value) return toast.error("Вначале выберите специалиста!")
  if (open && !currentMaster.value) return toast.error(i18next.language === 'ru' ? "Вначале выберите специалиста!" : "Choose a specialist first!")
  const { t } = useTranslation()
  // ** Vars & Hooks
  // const selectedEvent = selectedAppointment,
  //   {
  //     control,
  //     setError,
  //     setValue,
  //     getValues,
  //     handleSubmit,
  //     formState: { errors }
  //   } = useForm({
  //     defaultValues: { title: '' }
  //   })
  // const selectedEvent = selectedAppointment

  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [guests, setGuests] = useState({})
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')
  const [endPicker, setEndPicker] = useState(new Date())
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([{ value: 'Business', label: 'Business', color: 'primary' }])
  
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
  
  // const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 
  const masterOptions = masters.map(master => ({
    value: String(master.id),
    label: master.master_name ? `${master.master_name} ${master.surname ? master.surname : ''}` : master.login,
    avatar: master.master_profile_picture
  }))
 
  const guestsOptions = users.map(user => ({
    value: String(user.id),
    label: user.name ? user.name : user.login,
    avatar: user.avatar
  }))
  
  const statusOptions = filters.map(filter => ({
    value: filter.value,
    label: i18next.language === 'ru' ? filter.label : filter.value
  }))

  const filtredServices = services && services.length && currentMaster.value ? services.filter(service => {
    return service.beauty_service_masters.some(master => parseInt(master.id) === parseInt(currentMaster.value))
  }) : []
  // console.log(servicesMastersList)

  // const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 
  const servicesOptions = filtredServices.map(service => ({
    value: String(service.id),
    label: service.beauty_service_name
  })) 


  // ** Custom select components
  // const OptionComponent = ({ data, ...props }) => {
  //   return (
  //     <components.Option {...props}>
  //       <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
  //       {data.label}
  //     </components.Option>
  //   )
  // }
  const servicesList = selectedAppointment && selectedAppointment.appointment_user_account ? selectedAppointment.appointment_services.map(service => parseInt(service.id)) : []

  const values = selectedAppointment ? {
    guests: selectedAppointment.appointment_user_account ? initSelect(guestsOptions, selectedAppointment.appointment_user_account.id) : '',
    name: selectedAppointment.name ? selectedAppointment.name : '',
    phone: selectedAppointment.phone ? selectedAppointment.phone : '',
    master: selectedAppointment.appointment_master ? initSelect(masterOptions, selectedAppointment.appointment_master) : '',
    services: selectedAppointment.appointment_services ? servicesOptions.filter(i => servicesList.includes(parseInt(i.value))) : '',
    startDate: selectedAppointment.appointment_time ? formatDataTime(selectedAppointment.appointment_time) : '',
    endDate: selectedAppointment.appointment_end_time ? formatDataTime(selectedAppointment.appointment_end_time) : '',
    status: selectedAppointment.appointment_status ? initSelectString(statusOptions, selectedAppointment.appointment_status) : initSelectString(statusOptions, 'pending'),
    comment: selectedAppointment.comment ? selectedAppointment.comment : ''
  } : {...defaultValues, guests: userData.type === 1 ? initSelect(guestsOptions, userData.id) : "", master: userData.type === 4 ? initSelect(masterOptions, userData.id) : initSelect(masterOptions, currentMaster.value), name: userData.type === 1 ? userData.name : "", phone: userData.type === 1 ? userData.login : ""}

  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

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

  // ** Adds New Event
  // const handleAddEvent = () => {
  //   const obj = {
  //     title: getValues('title'),
  //     start: startPicker,
  //     end: endPicker,
  //     allDay,
  //     display: 'block',
  //     extendedProps: {
  //       calendar: calendarLabel[0].label,
  //       url: url.length ? url : undefined,
  //       guests: guests.length ? guests : undefined,
  //       location: location.length ? location : undefined,
  //       desc: desc.length ? desc : undefined
  //     }
  //   }
  //   dispatch(addEvent(obj))
  //   refetchEvents()
  //   handleAddEventSidebar()
  //   toast.success('Event Added')
  // }

  // ** Reset Input Values on Close
  // const handleResetInputValues = () => {
  //   dispatch(selectEvent({}))
  //   setValue('title', '')
  //   setAllDay(false)
  //   setUrl('')
  //   setLocation('')
  //   setDesc('')
  //   setGuests({})
  //   setCalendarLabel([{ value: 'Business', label: 'Business', color: 'primary' }])
  //   setStartPicker(new Date())
  //   setEndPicker(new Date())
  // }

  // ** Set sidebar fields
  // const handleSelectedEvent = () => {
    // if (!isObjEmpty(selectedEvent)) {
    //   const calendar = selectedEvent.extendedProps.calendar

    //   const resolveLabel = () => {
    //     if (calendar.length) {
    //       return { label: calendar, value: calendar, color: calendarsColor[calendar] }
    //     } else {
    //       return { value: 'Business', label: 'Business', color: 'primary' }
    //     }
    //   }
    //   setValue('title', selectedEvent.title || getValues('title'))
    //   setAllDay(selectedEvent.allDay || allDay)
    //   setUrl(selectedEvent.url || url)
    //   setLocation(selectedEvent.extendedProps.location || location)
    //   setDesc(selectedEvent.extendedProps.description || desc)
    //   setGuests(selectedEvent.extendedProps.guests || guests)
    //   setStartPicker(new Date(selectedEvent.start))
    //   setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
    //   setCalendarLabel([resolveLabel()])
    // }
  // }

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
      allDay: updatedEventData.allDay
    })

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    if (getValues('title').length) {
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues('title'),
        allDay,
        start: startPicker,
        end: endPicker,
        url,
        display: allDay === false ? 'block' : undefined,
        extendedProps: {
          location,
          description: desc,
          guests,
          calendar: calendarLabel[0].label
        }
      }

      const propsToUpdate = ['id', 'title', 'url']
      const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']
      dispatch(updateEvent(eventToUpdate))
      updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)

      handleAddEventSidebar()
      toast.success('Event Updated')
    } else {
      setError('title', {
        type: 'manual'
      })
    }
  }

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

  const handleUserChange = selectedOption => {
    setValue("guests", selectedOption)
    const findedUser = users.find(users => parseInt(users.id) === parseInt(selectedOption.value)) 
    if (findedUser.name) setValue("name", findedUser.name)
    setValue("phone", findedUser.phone ? findedUser.phone : findedUser.login)
  }

  const onSubmit = (data) => {
    const statusData = {}
    const newData = {}
    const servicesValues = data.services ? data.services.map(service => parseInt(service.value)) : null
    if (checkIsValid(data, requiredFields)) {
      if (data.guests) newData.appointment_user_account = data.guests.value
      if (data.master) newData.appointment_master = data.master.value
      if (data.name) newData.name = data.name
      if (data.phone) newData.phone = data.phone
      if (data.comment) newData.comment = data.comment
      if (data.startDate) newData.appointment_time = formatDataTimeSave(data.startDate).toString()
      // if (data.endDate) newData.appointment_end_time = formatDataTimeSave(data.endDate).toString()
      if (servicesValues) newData.appointment_services = servicesValues
      if (data.status) statusData.appointment_status = data.status.value
      if (selectedAppointment && selectedAppointment.appointment_user_account) {
        dispatch(updateEvent({ id: selectedAppointment.id, appointment: newData })).then(response => response.meta.requestStatus === 'fulfilled' && !statusData && handleClose())
        if (statusData) dispatch(changeStatus({ id: selectedAppointment.id, appointment: statusData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addEvent({ appointment: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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


  // ** Event Action buttons
  // const EventActions = () => {
  //   if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
  //     return (
  //       <Fragment>
  //         <Button className='me-1' type='submit' color='primary'>
  //           Add
  //         </Button>
  //         <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
  //           Cancel
  //         </Button>
  //       </Fragment>
  //     )
  //   } else {
  //     return (
  //       <Fragment>
  //         <Button className='me-1' color='primary' onClick={handleUpdateEvent}>
  //           Update
  //         </Button>
  //         <Button color='danger' onClick={handleDeleteEvent} outline>
  //           Delete
  //         </Button>
  //       </Fragment>
  //     )
  //   }
  // }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleClose}
      // onOpened={handleSelectedEvent}
      // onClosed={handleClose}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedAppointment && selectedAppointment.appointment_user_account ? t('appointmentsData.editTitle') : t('appointmentsData.addTitle')}
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form onSubmit={handleSubmit(onSubmit)}>
        
            <div className='mb-1'>
              <Label className='form-label' for='guests'>
              {t('appointmentsData.customer')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="guests"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                id='guests'
                className={classnames('react-select', { 'is-invalid': errors.guests && true })}
                classNamePrefix='select'
                isClearable={false}
                isDisabled={userData && userData.type === 1}
                options={guestsOptions}
                theme={selectThemeColors}
                placeholder={t('appointmentsData.customerPlaceholder')}
                onChange={handleUserChange}
                value={field.value}
                components={{
                  Option: SelectComponent
                }}
                // {...field}
              />
              )}
              />
              {errors && errors.guests && (
                <FormFeedback>{t('appointmentsData.customerFeedback')}</FormFeedback>
              )} 
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='name'>
              {t('appointmentsData.name')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='name' placeholder={t('appointmentsData.namePlaceholder')} invalid={errors.name && true} {...field} />
                )}
              />
                {errors && errors.name && (
                <FormFeedback>{t('appointmentsData.nameFeedback')}</FormFeedback>
              )} 
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='phone'>
              {t('appointmentsData.phone')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='phone'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='phone' placeholder={t('appointmentsData.phonePlaceholder')} invalid={errors.phone && true} {...field} />
                )}
              />
                {errors && errors.phone && (
                <FormFeedback>{t('appointmentsData.phoneFeedback')}</FormFeedback>
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
              {t('appointmentsData.startDate')}<span className='text-danger'>*</span>
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
                  enableTime: allDay === false,
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
{/* 
            <div className='mb-1'>
              <Label className='form-label' for='endDate'>
              Время окончания<span className='text-danger'>*</span>
              </Label>
              <Controller
                id="endDate"
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
              <Flatpickr
                required
                id='endDate'
                disabled={true}
                // tag={Flatpickr}
                name='endDate'
                className='form-control'
                onChange={date => setValue("endDate", date)}
                value={field.value}
                options={{
                  enableTime: allDay === false,
                  locale: currentLanguage,
                  dateFormat: 'd.m.Y, H:i'
                }}
              />
              )}
              />
              {errors && errors.endDate && (
              <FormFeedback>Пожалуйста выберите время окончания</FormFeedback>
              )} 
            </div> */}
            <div className='mb-1'>
              <Label className='form-label' for='services'>
              {t('appointmentsData.service')}<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="services"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                isMulti
                id='services'
                className={classnames('react-select', { 'is-invalid': errors.services && true })}
                classNamePrefix='select'
                isClearable={false}
                options={servicesOptions}
                placeholder={t('appointmentsData.servicePlaceholder')}
                theme={selectThemeColors}
                {...field}
              />
              )}
              />
              {errors && errors.services && (
                <FormFeedback>{t('appointmentsData.serviceFeedback')}</FormFeedback>
              )} 
            </div>
            {userData.type === 2 && selectedAppointment && selectedAppointment.appointment_user_account && 
            <div className='mb-1'>
              <Label className='form-label' for='status'>
              {t('appointmentsData.status')}
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
                placeholder={t('appointmentsData.statusPlaceholder')}
                {...field}
              />
              )}
              />
              {errors && errors.status && (
                <FormFeedback>{t('appointmentsData.statusFeedback')}</FormFeedback>
              )} 
            </div>}
            <div className='mb-1'>
              <Label className='form-label' for='comment'>
              {t('appointmentsData.comment')}
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
                placeholder={t('appointmentsData.commentPlaceholder')}
                {...field}
              />
              )}
              />
              {errors && errors.comment && (
                <FormFeedback>{t('appointmentsData.commentFeedback')}</FormFeedback>
              )} 
            </div>
            <div className='d-flex mb-1'>
            <Fragment>
             <Button className='me-1' type='submit' color='primary'>
               {selectedAppointment && selectedAppointment.appointment_user_account ? t('appointmentsData.edit') : t('appointmentsData.add')}
             </Button>
             <Button color='secondary' type='reset' onClick={selectedAppointment && selectedAppointment.appointment_user_account ? handleDeleteEvent : handleClose} outline>
               {selectedAppointment && selectedAppointment.appointment_user_account ? t('appointmentsData.delete') : t('appointmentsData.cancel') }
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
