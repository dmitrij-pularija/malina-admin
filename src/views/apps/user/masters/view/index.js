import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getMaster } from '../store'
import { getAllStores } from '../../../food/stores/store'
import { getAllUsers } from "../../store"
import { getAllSpecialties } from '../../../beauty/specialties/store'
import { getMasterRating } from '../../../beauty/rating/masters/store'
import { getAllAppointments } from '../../../beauty/appointments/store'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Alert } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import MasterTabs from './Tabs'
import MasterInfoCard from './MasterInfoCard'
import Loading from '../../../../../../src/@core/components/spinner/Loading'
import '@styles/react/apps/app-users.scss'

const MasterView = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // const [shifts, setShifts] = useState([])
  const [rating, setRating] = useState([])
  const { selectedMaster, loading } = useSelector(state => state.masters)
  const stores = useSelector(state => state.stores.allStores)
  const specialties = useSelector(state => state.specialties.allSpecialties)
  const { allAppointments } = useSelector(state => state.appointments)
  const { userData } = useSelector(state => state.auth)
  const users = useSelector(state => state.users.allUsers)
  const { id } = useParams()
  const appointments = allAppointments.filter(appointment => parseInt(appointment.appointment_master.id) === parseInt(id))  


  useEffect(() => {
    dispatch(getAllStores())
    if (!users.length) dispatch(getAllUsers())
    if (!stores.length) dispatch(getAllStores())
    if (!allAppointments.length) dispatch(getAllAppointments())
    if (!specialties.length) dispatch(getAllSpecialties())
    // dispatch(getMaster({ waiter: id }))
    // getShifts().then(response => { setShifts(response) })
    getMasterRating(parseInt(id)).then(response => response && response.length && setRating(response))
    dispatch(getMaster(parseInt(id)))
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
  <div className='app-user-view'>
    <Breadcrumbs title={t('DetailedInfo')} data={[{ title: t('Staff') }, { title: t('Masters') }, { title: t('Details') }]} />
      {selectedMaster !== null && selectedMaster !== undefined ? ( 
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <MasterInfoCard userData={userData} specialties={specialties} stores={stores} selectedMaster={selectedMaster} t={t} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <MasterTabs id={selectedMaster ? selectedMaster.id : null} works={selectedMaster ? selectedMaster.master_works : []} ratings={rating} users={users} active={active} toggleTab={toggleTab} appointments={appointments}  t={t} />
        </Col>
      </Row>
      ) : (
        loading ? (
        <Loading />
        ) : (
        <Alert color='danger'>
        <h4 className='alert-heading'>{t('MastersData.alert')}</h4>
        <div className='alert-body'>
        {t('MastersData.alertText1')}{id} {t('MastersData.alertText2')}<Link to='/apps/user/masters/list'>{t('MastersData.alertText3')}</Link>
        </div>
        </Alert>
        )
      )}
    </div>
  )
}

export default MasterView