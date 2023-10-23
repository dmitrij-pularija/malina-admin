import { Fragment, useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { X } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form, FormFeedback } from 'reactstrap'
import { selectThemeColors, formatDataTimeSave, formatDataTime, checkIsValid, initSelect, isObjEmpty } from '@utils'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { english } from "flatpickr/dist/l10n/default.js"
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
  comment: ''
  }

const requiredFields = ["guests", "name", "phone", "master", "startDate"]

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    users,
    masters,
    services,
    userData,
    selectedAppointment,
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

  
  const servicesOptions = services.map(service => ({
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
  const servicesList = selectedAppointment ? selectedAppointment.appointment_services.map(service => parseInt(service.id)) : []

  const values = selectedAppointment ? {
    guests: selectedAppointment.appointment_user_account ? initSelect(guestsOptions, selectedAppointment.appointment_user_account.id) : '',
    name: selectedAppointment.name ? selectedAppointment.name : '',
    phone: selectedAppointment.phone ? selectedAppointment.phone : '',
    master: selectedAppointment.appointment_master ? initSelect(masterOptions, selectedAppointment.appointment_master) : '',
    services: selectedAppointment.appointment_services ? servicesOptions.filter(i => servicesList.includes(parseInt(i.value))) : '',
    startDate: selectedAppointment.appointment_time ? formatDataTime(selectedAppointment.appointment_time) : '',
    endDate: selectedAppointment.appointment_end_time ? formatDataTime(selectedAppointment.appointment_end_time) : '',
    comment: selectedAppointment.comment ? selectedAppointment.comment : ''
  } : {...defaultValues, guests: userData.type === 1 ? initSelect(guestsOptions, userData.id) : "", master: userData.type === 4 ? initSelect(masterOptions, userData.id) : "", name: userData.type === 1 ? userData.name : "", phone: userData.type === 1 ? userData.login : ""}

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
  const handleAddEvent = () => {
    const obj = {
      title: getValues('title'),
      start: startPicker,
      end: endPicker,
      allDay,
      display: 'block',
      extendedProps: {
        calendar: calendarLabel[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined
      }
    }
    dispatch(addEvent(obj))
    refetchEvents()
    handleAddEventSidebar()
    toast.success('Event Added')
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    setValue('title', '')
    setAllDay(false)
    setUrl('')
    setLocation('')
    setDesc('')
    setGuests({})
    setCalendarLabel([{ value: 'Business', label: 'Business', color: 'primary' }])
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
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
  }

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

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id))
    removeEventInCalendar(selectedEvent.id)
    handleAddEventSidebar()
    toast.error('Event Removed')
  }

  const handleClose = () => {
    for (const key in defaultValues) setValue(key, "")
    handleAddEventSidebar()
    reset({ ...defaultValues })
  }  

  const onSubmit = (data) => {
    // console.log(data)
    const newData = {}
    const servicesValues = data.services ? data.services.map(service => parseInt(service.value)) : null
    if (checkIsValid(data, requiredFields)) {
      if (data.guests) newData.appointment_user_account = data.guests.value
      if (data.master) newData.appointment_master = data.master.value
      if (data.name) newData.name = data.name
      if (data.phone) newData.phone = data.phone
      if (data.comment) newData.comment = data.comment
      if (data.startDate) newData.appointment_time = formatDataTimeSave(data.startDate).toString()
      if (data.endDate) newData.appointment_end_time = formatDataTimeSave(data.endDate).toString()
      if (servicesValues) newData.appointment_services = servicesValues
      
      if (selectedAppointment) {
        dispatch(updateEvent({ id: selectedAppointment.id, appointment: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
      // onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedAppointment ? 'Редактировать' : 'Добавить'} запись
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='guests'>
                Клиент<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="guests"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                id='guests'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                isDisabled={userData && userData.type === 1}
                options={guestsOptions}
                theme={selectThemeColors}
                placeholder="Выберите клиента"
                // value={guests.length ? [...guests] : null}
                // onChange={data => setGuests([...data])}
                components={{
                  Option: SelectComponent
                }}
                {...field}
              />
              )}
              />
              {errors && errors.guests && (
                <FormFeedback>Пожалуйста клиента</FormFeedback>
              )} 
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='name'>
                Имя <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='name' placeholder='Ввелите имя' invalid={errors.name && true} {...field} />
                )}
              />
                {errors && errors.name && (
                <FormFeedback>Пожалуйста введите имя</FormFeedback>
              )} 
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='phone'>
                Телефон<span className='text-danger'>*</span>
              </Label>
              <Controller
                name='phone'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id='phone' placeholder='Ввелите телефон' invalid={errors.phone && true} {...field} />
                )}
              />
                {errors && errors.phone && (
                <FormFeedback>Пожалуйста введите елефон</FormFeedback>
              )} 
            </div>
            <div className='mb-1'>
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
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='services'>
               Услуга<span className='text-danger'>*</span>
              </Label>
              <Controller
                  name="services"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select
                isMulti
                id='services'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={servicesOptions}
                placeholder="Выберите услугу"
                theme={selectThemeColors}
                {...field}
              />
              )}
              />
              {errors && errors.services && (
                <FormFeedback>Пожалуйста выберите услугу</FormFeedback>
              )} 
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='startDate'>
                Время начала<span className='text-danger'>*</span>
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
                className='form-control'
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
              <FormFeedback>Пожалуйста выберите время начала</FormFeedback>
              )} 
            </div>

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
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='comment'>
                Коментарий
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
                placeholder='Введите коментарий'
                {...field}
              />
              )}
              />
              {errors && errors.comment && (
                <FormFeedback>Пожалуйста введите коментарий</FormFeedback>
              )} 
            </div>
            <div className='d-flex mb-1'>
            <Fragment>
             <Button className='me-1' type='submit' color='primary'>
               {selectedAppointment ? "Изменить" : "Добавить"}
             </Button>
             <Button color='secondary' type='reset' onClick={handleClose} outline>
               Отменить
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
