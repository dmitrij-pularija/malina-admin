// ** React Import
import { useEffect, useState, useRef, memo } from 'react'

// ** Full Calendar & it's Plugins
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import enLocale from '@fullcalendar/core/locales/en-gb'
import i18next from 'i18next'
import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import { formatDataTimeSave } from '@utils'
// import { appointmentsObj } from '../../../../configs/initial'
// import { formatTimeSave } from '@utils'

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)
  const [viewType, setViewType] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language === 'en' ? enLocale : ruLocale)
  // ** Props
  const {
    data,
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    currentMaster,
    getAppointment,
    handleDatesSet,
    updateEvent
  } = props

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi])

  useEffect(() => {
    const handleLanguageChange = () => setCurrentLanguage(i18next.language === 'en' ? enLocale : ruLocale)
    i18next.on('languageChanged', handleLanguageChange)
    return () => i18next.off('languageChanged', handleLanguageChange)
  }, [])
  
  const handleViewChange = (arg) => setViewType(arg.view.type !== 'dayGridMonth')

  const dataEvents = data && data.length ? data.map(event => ({id: event.id, title: `${event.appointment_services ? event.appointment_services.map(service => service.beauty_service_name).join(', ') : ''} | ${event.name} | ${event.phone}`, start: event.appointment_time, end: event.appointment_end_time, extendedProps: { calendar: event.appointment_status }})) : []
// const dataEvents = data && data.length ? data.map(event => ({id: event.id, title: `${formatTimeSave(event.appointment_time)} - ${formatTimeSave(event.appointment_end_time)} <br> ${event.appointment_services ? event.appointment_services.map(service => service.beauty_service_name).join(', ') : ''} <br> ${event.name} | ${event.phone}`, start: event.appointment_time, end: event.appointment_end_time})) : []

// ** calendarOptions(Props)
  const calendarOptions = {
    events: dataEvents,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    // eventDidMount(info) {
    //   info.el.title = info.event.title
    //   if (info.event.description) {
    //     info.el.innerHTML += `<br>${info.event.description}`
    //   }
    // },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,
    datesSet: handleDatesSet,
    viewDidMount: handleViewChange,
    eventDisplay: 'block',
    displayEventTime: viewType,
    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
      
      return [
        // Background Color
        `bg-light-${colorName}`
      ]
    },
    // eventContent: (arg) => {
    //   if (arg.view.type === 'dayGridMonth') calendarOptions.displayEventTime = false
    // },
    eventClick({ event: clickedEvent }) {
      dispatch(getAppointment(clickedEvent._def.publicId))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    dateClick(info) {
      if (currentMaster && currentMaster.value) {
      const ev = blankEvent
      ev.appointment_master = currentMaster.value
      ev.appointment_time = formatDataTimeSave(info.date).toString()
      ev.appointment_end_time = formatDataTimeSave(info.date).toString()
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
      } else toast.error('Вначале выберите специалиста!')
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent))
      toast.success('Event Updated')
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent))
      toast.success('Event Updated')
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'
  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar 
        locale={currentLanguage} 
        {...calendarOptions} 
        />{' '}
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
