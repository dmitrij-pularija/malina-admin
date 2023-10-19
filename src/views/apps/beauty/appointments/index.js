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
import { getAllMasters } from '../../user/masters/store'
import { getAllStores } from '../../food/stores/store'
import { getData, getAppointment, addAppointment, editAppointment, deleteAppointment } from './store'
// import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import Loading from '../../../../@core/components/spinner/Loading'
import '@styles/react/apps/app-calendar.scss'

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
}

const CalendarComponent = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.auth)
  const stores = useSelector(state => state.stores.allStores)
  const masters = useSelector(state => state.masters.allMasters)
  const {data, loading} = useSelector(state => state.appointments)
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isRtl] = useRTL()

  const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  const [filtredMasters, setFiltredMasters] = useState([])
  const [selectedMasters, setSelectedMasters] = useState([])

  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const toggleSidebar = val => setLeftSidebarOpen(val)
  const masterIds = id => {
    const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(id))
    return filtredMasters.map(master => parseInt(master.id))
  }
  const handleStoreChange = data => {
    setSelectedMasters([])
    setCurrentStore(data)
    setFiltredMasters(masters.filter(master => parseInt(master.master_business) === parseInt(data.value)))
    setSelectedMasters(masterIds(data.value))
  }

  const updateAllFilters = value => {
    if (value === true) {
      setSelectedMasters(filtredMasters.map(master => parseInt(master.id)))
    } else {
      setSelectedMasters([])
    }
  }

  const updateFilter = value => {
    if (selectedMasters.includes(parseInt(value))) {
    const filtredMasters = selectedMasters.filter(master => parseInt(master) !== parseInt(value))
    setSelectedMasters(filtredMasters)   
    } else {
      setSelectedMasters([...selectedMasters, parseInt(value)])
    }
    
  }

  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents()
    }
  }

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: 'Показать все' }) 

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!masters.length) dispatch(getAllMasters())  
  }, [])

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
              masters={filtredMasters}
              userData={userData}
              appointments={data}
              selectedMasters={selectedMasters}
              currentStore={currentStore}
              storeOptions={storeOptions}
              handleStoreChange={handleStoreChange}
              updateFilter={updateFilter}
              updateAllFilters={updateAllFilters}
            />
          </Col>
          <Col className='position-relative'>
            {/* <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={getAppointment}
              updateEvent={editAppointment}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            /> */}
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      {/* <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        updateEvent={updateEvent}
        removeEvent={removeEvent}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      /> */}
      <Loading /> 
    </Fragment>
  )
}

export default CalendarComponent
