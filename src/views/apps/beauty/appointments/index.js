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
import { getAllUsers } from "../../user/store"
import { getAllStores } from '../../food/stores/store'
import { getAllMasters } from '../../user/masters/store'
import { getAllServices } from '../services/services/store'
import { getData, getAppointment, addAppointment, editAppointment, deleteAppointment, selectEvent } from './store'
// import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import Loading from '../../../../@core/components/spinner/Loading'
import '@styles/react/apps/app-calendar.scss'

const calendarsColor = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'danger'
}

const filters = [
  { id: 1, value: 'pending', label: 'Новая', color: 'warning', className: 'form-check-warning mb-1' },
  { id: 2, value: 'confirmed', label: 'Подтверждена', color: 'info', className: 'form-check-info mb-1' },
  { id: 3, value: 'completed', label: 'Посещена', color: 'success', className: 'form-check-success mb-1' },
  { id: 4, value: 'cancelled', label: 'Отменен', color: 'danger', className: 'form-check-danger mb-1' }
]

const filterValues = filters.map(filter => filter.value)

const CalendarComponent = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.auth)
  const users = useSelector(state => state.users.allUsers)
  const stores = useSelector(state => state.stores.allStores)
  const masters = useSelector(state => state.masters.allMasters)
  const services = useSelector(state => state.services.allServices)
  const {data, selectedAppointment, loading} = useSelector(state => state.appointments)
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isRtl] = useRTL()

  const [currentStore, setCurrentStore] = useState({ value: '', label: 'Не выбрано' })
  const [currentMaster, setCurrentMaster] = useState({ value: '', label: 'Не выбран' })
  const [selectedCalendars, setSelectedCalendars] = useState(filterValues)
  const [appointments, setAppointments] = useState([])
  // console.log(data)
  
  
  const [filtredMasters, setFiltredMasters] = useState([])
  const [selectedMasters, setSelectedMasters] = useState([])

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const toggleSidebar = val => setLeftSidebarOpen(val)
  const masterIds = id => {
    const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(id))
    return filtredMasters.map(master => parseInt(master.id))
  }
  const handleStoreChange = data => {
    setCurrentMaster({ value: '', label: 'Не выбран' })
    setSelectedMasters([])
    setCurrentStore(data)
    setFiltredMasters(masters.filter(master => parseInt(master.master_business) === parseInt(data.value)))
    setSelectedMasters(masterIds(data.value))
  }

  const handleMasterChange = data => {
    setCurrentMaster(data)
    // dispatch(getData(data.value))
  }

  const updateAllFilters = value => {
    if (value === true) {
      setSelectedCalendars(filterValues)
      // setSelectedMasters(filtredMasters.map(master => parseInt(master.id)))
    } else {
      setSelectedCalendars([])
      // setSelectedMasters([])
    }
  }

  const updateFilter = value => {
    if (selectedCalendars.includes(value)) {
     const filtredCalendars = selectedCalendars.filter(calendar => calendar !== value)  
    // const filtredMasters = selectedMasters.filter(master => parseInt(master) !== parseInt(value))
    setSelectedCalendars(filtredCalendars)   
    } else {
      setSelectedCalendars([...selectedCalendars, value])
    }
    
  }

  // const blankEvent = {
  //   title: '',
  //   start: '',
  //   end: '',
  //   allDay: false,
  //   url: '',
  //   extendedProps: {
  //     calendar: '',
  //     guests: [],
  //     location: '',
  //     description: ''
  //   }
  // }

  const blankEvent = {
    appointment_user_account: '',
    name: '',
    phone: '',
    appointment_master: '',
    appointment_services: '',
    appointment_time: '',
    appointment_end_time: '',
    comment: ''
  }

  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }
  // const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 
  const masterOptions = filtredMasters.map(master => ({
    value: String(master.id),
    label: master.master_name ? `${master.master_name} ${master.surname ? master.surname : ''}` : master.login,
    avatar: master.master_profile_picture
  }))

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: 'Показать все' }) 

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers())
    if (!stores.length) dispatch(getAllStores())
    if (!masters.length) dispatch(getAllMasters())
    if (!services.length) dispatch(getAllServices())
  }, [])

  useEffect(() => {
    dispatch(getData(currentMaster.value))
  }, [currentMaster.value])

  useEffect(() => {
  const filtredAppointments = data.filter(item => selectedCalendars.includes(item.appointment_status) && parseInt(item.appointment_master) === parseInt(currentMaster.value))  
  setAppointments(filtredAppointments)
}, [data.length, selectedCalendars, currentMaster.value])

  useEffect(() => {
    if (userData.type === 2 && stores.length) {
      setCurrentStore(initSelect(storeOptions, userData.id))
      setFiltredMasters(masters.filter(master => parseInt(master.master_business) === parseInt(userData.id)))
      setSelectedMasters(masterIds(userData.id))
    }
  }, [stores.length, masters.length])

  return (
    <Fragment>
      <Breadcrumbs title='Записи к специалистам' data={[{ title: 'Услуги' }, { title: 'Запись' }]} onClick={handleAddEventSidebar} />
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
              appointments={appointments}
              currentMaster={currentMaster}
              masterOptions={masterOptions}
              handleMasterChange={handleMasterChange}
              selectedMasters={selectedMasters}
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
              data={appointments}
              // store={store}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              currentMaster={currentMaster}
              getAppointment={getAppointment}
              updateEvent={editAppointment}
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
        masters={masters}
        currentMaster={currentMaster}
        services={services}
        userData={userData}
        selectedAppointment={selectedAppointment}
        dispatch={dispatch}
        addEvent={addAppointment}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        updateEvent={editAppointment}
        removeEvent={deleteAppointment}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
      <Loading /> 
    </Fragment>
  )
}

export default CalendarComponent
