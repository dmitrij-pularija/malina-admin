import { useSelector, useDispatch } from 'react-redux'
import { Fragment, useState, useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'
import { useRTL } from '@hooks/useRTL'
import { initSelect } from '@utils'
import { useTranslation } from 'react-i18next'
import { getAllUsers } from "../../user/store"
import { getAllStores } from '../stores/store'
import { getData, getBooking, addBooking, editBooking, deleteBooking, selectEvent, changeStatus } from './store'
// import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import Loading from '../../../../@core/components/spinner/Loading'
import '@styles/react/apps/app-calendar.scss'

const calendarsColor = {
  pending: 'info',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
  rejected: 'warning'
}

const filters = [
  { id: 1, value: 'pending', label: 'Новое', color: 'info', className: 'form-check-info mb-1' },
  { id: 2, value: 'confirmed', label: 'Подтверждено', color: 'primary', className: 'form-check-primary mb-1' },
  { id: 3, value: 'completed', label: 'Посещено', color: 'success', className: 'form-check-success mb-1' },
  { id: 4, value: 'cancelled', label: 'Отменено', color: 'danger', className: 'form-check-danger mb-1' },
  { id: 5, value: 'rejected', label: 'Отклонено', color: 'warning', className: 'form-check-warning mb-1' }
]

const filterValues = filters.map(filter => filter.value)

const CalendarComponent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { userData } = useSelector(state => state.auth)
  const users = useSelector(state => state.users.allUsers)
  const stores = useSelector(state => state.stores.allStores)
  const {data, selectedBooking, loading} = useSelector(state => state.bookings)
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isRtl] = useRTL()
  const [endTime, setEndTime] = useState("23:59:00")
  const [currentStore, setCurrentStore] = useState("")
  const [selectedCalendars, setSelectedCalendars] = useState(filterValues)
  const [bookings, setBookings] = useState([])
  // console.log(data)
  const getEndTime = id => { 
    if (id && stores && stores.length) {
      const findedStore = stores.find(store => parseInt(store.id) === parseInt(id))
      return findedStore && findedStore.work_time_end ? findedStore.work_time_end : "23:59:00"
    } else return "23:59:00"
  }  
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const toggleSidebar = val => setLeftSidebarOpen(val)
  const handleStoreChange = data => {
    setCurrentStore(data)
    setEndTime(getEndTime(data.value))
    dispatch(getData({
      business_id: data.value
    }))
  }
  const updateAllFilters = value => {
    if (value === true) {
      setSelectedCalendars(filterValues)
    } else {
      setSelectedCalendars([])
    }
  }

  const updateFilter = value => {
    if (selectedCalendars.includes(value)) {
     const filtredCalendars = selectedCalendars.filter(calendar => calendar !== value)  
    setSelectedCalendars(filtredCalendars)   
    } else {
      setSelectedCalendars([...selectedCalendars, value])
    }
    
  }

  const blankEvent = {
    business: '',
    user: '',
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    comment: ''
  }

  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: `${t('bookingsData.notSelected')}` }) 

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers())
    if (!stores.length) dispatch(getAllStores())
    if (userData.type === 2) dispatch(getData({
      business_id: userData.id
    }))
    // dispatch(getData({
    //   business_id: userData.type === 2 ? userData.id : currentStore ? currentStore.value : ""
    // }))
  }, [])

  // useEffect(() => {
  //   dispatch(getData(currentStore.value))
  // }, [currentStore.value])

  useEffect(() => {
  const filtredBooking = data.filter(item => selectedCalendars.includes(item.status))

  // const filtredBooking = data.filter(item => selectedCalendars.includes(item.status) && parseInt(item.business.id) === parseInt(currentStore.value))
  setBookings(filtredBooking)
}, [data, selectedCalendars])
// }, [data, selectedCalendars, currentStore.value])

  useEffect(() => {
    if (userData.type === 2 && stores.length) {
      setCurrentStore(initSelect(storeOptions, userData.id))
      setEndTime(getEndTime(userData.id))
    }
  }, [stores.length])

  return (
    <Fragment>
      <Breadcrumbs title={t('bookingsData.title')} data={[{ title: t('bookingsData.title1') }]} onClick={handleAddEventSidebar} />
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              filters={filters}
              selectedCalendars={selectedCalendars}
              userData={userData}
              bookings={bookings}
              currentStore={currentStore}
              storeOptions={storeOptions}
              handleStoreChange={handleStoreChange}
              updateFilter={updateFilter}
              updateAllFilters={updateAllFilters}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              data={bookings}
              endTime={endTime}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              currentStore={currentStore}
              getBooking={getBooking}
              updateEvent={editBooking}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        users={users}
        filters={filters}
        userData={userData}
        stores={filtredStore}
        currentStore={currentStore}
        selectedBooking={selectedBooking}
        dispatch={dispatch}
        addEvent={addBooking}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        updateEvent={editBooking}
        removeEvent={deleteBooking}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        changeStatus={changeStatus}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
      <Loading /> 
    </Fragment>
  )
}

export default CalendarComponent
