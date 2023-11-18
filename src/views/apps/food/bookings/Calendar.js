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
import { formatTimeSave, formatDataSave } from '@utils'

const getDateTime = (date, time) => {
  if (date && time) {
  return  `${date}T${time}`
  } else return ''
}

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)
  const [viewType, setViewType] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language === 'en' ? enLocale : ruLocale)
  // ** Props
  const {
    data,
    isRtl,
    endTime,
    dispatch,
    currentStore,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    getBooking,
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
  
  const dataEvents = data && data.length ? data.map(event => ({id: event.id, title: `${event.name} | ${event.phone} | Количество гостей ${event.guests}`, start: getDateTime(event.date, event.time), end: getDateTime(event.date, endTime), extendedProps: { calendar: event.status }})) : []
// ** calendarOptions(Props)
// console.log(dataEvents)
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

    eventClick({ event: clickedEvent }) {
      dispatch(getBooking(clickedEvent._def.publicId))
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
      if (currentStore && currentStore.value) {
      const ev = blankEvent
      ev.business = currentStore.value
      ev.date = formatDataSave(info.date).toString()
      ev.time = formatTimeSave(info.date).toString()
      ev.status = 'pending'
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
      } else toast.error('Вначале выберите заведение!')
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
        // eventContent={(info) => {
        //   const title = info.event.title
        //   return { html: `<div>${title}</div>` }
        // }}
        locale={currentLanguage} 
        {...calendarOptions} 
        />{' '}
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
