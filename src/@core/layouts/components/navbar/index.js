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
import beautyOrderNotification from '@src/assets/mp3/beautyOrderNotification.ogg'
import beautyAppointmentsNotification from '@src/assets/mp3/beautyAppointmentsNotification.ogg'
import foodOrderNotification from '@src/assets/mp3/foodOrderNotification.ogg'
import foodBookingNotification from '@src/assets/mp3/foodBookingNotification.ogg'

const beautyOrderAudio = new Audio(beautyOrderNotification)
const beautyAppointmentsAudio = new Audio(beautyAppointmentsNotification)
const foodOrderAudio = new Audio(foodOrderNotification)
const foodBookingAudio = new Audio(foodBookingNotification)

// const playAudio = () => {
//   const audio = new Audio(notification)
//   audio.play()
// }

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
      if (!isMute) beautyOrderAudio.play()
    }
    if (userData.business === 2 || userData.type === 3 || userData.type === 4) beautyAppointmentsSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addBeautyAppointmentsMessage(data))
      if (!isMute) beautyAppointmentsAudio.play()
    }
    if (userData.business === 1 || userData.type === 3) foodOrderSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addFoodOrdersMessage(data))
      if (!isMute) foodOrderAudio.play()
    }
    if (userData.business === 1 || userData.type === 3) foodBookingSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      dispatch(addFoodBookingMessage(data))
      if (!isMute) foodBookingAudio.play()
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
