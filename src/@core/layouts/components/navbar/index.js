// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { addBeautyOrdersMessage, beautyOrderSocket } from '../../../../views/apps/beauty/orders/store'
import { addBeautyAppointmentsMessage, beautyAppointmentsSocket } from '../../../../views/apps/beauty/appointments/store'
import { addFoodOrdersMessage, foodOrderSocket } from '../../../../views/apps/food/orders/store'
import { addFoodBookingMessage, foodBookingSocket } from '../../../../views/apps/food/bookings/store'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import notification from '@src/assets/mp3/notification.ogg'

const playAudio = () => {
  const audio = new Audio(notification)
  audio.play()
}

const ThemeNavbar = props => {
  const { skin, setSkin, setMenuVisibility } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { userData } = useSelector(state => state.auth)
  const beautyOrders = useSelector(state => state.beautyOrders.messages)
  const beautyAppointments = useSelector(state => state.appointments.messages)
  const foodOrders = useSelector(state => state.orders.messages)
  const foodBookings = useSelector(state => state.bookings.messages)
  const [isMute, setIsMute] = useState(false)
  
  const toggleMute = () => setIsMute(!isMute)

  useEffect(() => {
    if (userData.business === 2 || userData.type === 3) beautyOrderSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addBeautyOrdersMessage(data))
      if (!isMute) playAudio()
    }
    if (userData.business === 2 || userData.type === 3 || userData.type === 4) beautyAppointmentsSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addBeautyAppointmentsMessage(data))
      if (!isMute) playAudio()
    }
    if (userData.business === 1 || userData.type === 3) foodOrderSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addFoodOrdersMessage(data))
      if (!isMute) playAudio()
    }
    if (userData.business === 1 || userData.type === 3) foodBookingSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addFoodBookingMessage(data))
      if (!isMute) playAudio()
    }
  }, [isMute])


  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} userData={userData} isMute={isMute} toggleMute={toggleMute} beautyOrders={beautyOrders} beautyAppointments={beautyAppointments} foodOrders={foodOrders} foodBookings={foodBookings} t={t}/>
    </Fragment>
  )
}

export default ThemeNavbar
