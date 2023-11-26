// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatData, formatTimeSave } from '../../../../utility/Utils'
// ** Custom Components
// import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, BellOff, X, Check, AlertTriangle } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap'

// // ** Avatar Imports
// import avatar3 from '@src/assets/images/portrait/small/avatar-s-3.jpg'
// import avatar15 from '@src/assets/images/portrait/small/avatar-s-15.jpg'


const NotificationDropdown = ({userData, isMute, toggleMute, beautyOrders, beautyAppointments, foodOrders, foodBookings, t}) => {
  // ** Notification Array
  const wsActions = {
    update: { label: t('update'), colorName: 'light-warning' },
    create: { label: t('create'), colorName: 'light-success' },
    delete: { label: t('Delete'), colorName: 'light-danger' }
  }
const messageCount = beautyOrders.length + beautyAppointments.length + foodOrders.length + foodBookings.length

const renderNotificationItems = (type) => {
  let array = []
  let link = ""
  const len = userData.type === 3 ? 2 : 3 
  if (type === "beautyOrders") {
    array = beautyOrders.slice(0, len)
    link = "/apps/beauty/orders/preview/"
  }
  if (type === "foodOrders") {
    array = foodOrders.slice(0, len)
    link = "/apps/food/orders/preview/"
  }
  if (type === "beautyAppointments") array = beautyAppointments.slice(0, len)
  if (type === "foodBookings") array = foodBookings.slice(0, len)

  if (array && array.length) {
    return (
      <>
      <h6 className='text-center' >{t(type)}</h6>
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {array.map((item, index) => {
          return (
              <div
              key={index}
                className={classnames('list-item d-flex justify-content-between', 'align-items-center')}
              >
                  <Fragment>
                  <Link
                  to={link ? `${link}${item.data.id}` : "/"}
                  className='text-truncate text-body d-flex gap-10'
                  >
                  <span className='fw-bolder'>{type === "beautyOrders" || type === "foodOrders" ? `№ ${item.data.id}` : type === "beautyAppointments" ? item.data.appointment_master.master_name : item.data.name}</span>
                  <span className='fw-bolder'>{type === "foodBookings" || type === "beautyAppointments" ? t('at') : t('from')}</span>
                  <span className='text-capitalize'>{type === "beautyOrders" || type === "foodOrders" ? formatData(item.data.order_date) : type === "beautyAppointments" ? `${formatData(item.data.appointment_time)} ${formatTimeSave(item.data.appointment_time)}` : `${formatData(item.data.date)} ${item.data.time.slice(0, 5)}`}</span>
                 </Link>
                  </Fragment>
                  <Badge tag='div' color={wsActions[item.action].colorName} pill>
                  {wsActions[item.action].label}
                    </Badge>   
              </div>
          )
        })}
      </PerfectScrollbar>
      </>
    )
      } else return ''
  }


  // const notificationsArray = [
  //   {
  //     img: avatar3,
  //     subtitle: 'Won the monthly best seller badge.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
  //       </p>
  //     )
  //   },
  //   {
  //     img: avatar15,
  //     subtitle: 'You have 10 unread messages.',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>New message</span>&nbsp;received
  //       </p>
  //     )
  //   },
  //   {
  //     avatarContent: 'MD',
  //     color: 'light-danger',
  //     subtitle: 'MD Inc. order updated',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
  //       </p>
  //     )
  //   },
  //   {
  //     title: <h6 className='fw-bolder me-auto mb-0'>System Notifications</h6>,
  //     switch: (
  //       <div className='form-check form-switch'>
  //         <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked />
  //       </div>
  //     )
  //   },
  //   {
  //     avatarIcon: <X size={14} />,
  //     color: 'light-danger',
  //     subtitle: 'USA Server is down due to hight CPU usage',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Server down</span>&nbsp;registered
  //       </p>
  //     )
  //   },
  //   {
  //     avatarIcon: <Check size={14} />,
  //     color: 'light-success',
  //     subtitle: 'Last month sales report generated',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>Sales report</span>&nbsp;generated
  //       </p>
  //     )
  //   },
  //   {
  //     avatarIcon: <AlertTriangle size={14} />,
  //     color: 'light-warning',
  //     subtitle: 'BLR Server using high memory',
  //     title: (
  //       <p className='media-heading'>
  //         <span className='fw-bolder'>High memory</span>&nbsp;usage
  //       </p>
  //     )
  //   }
  // ]

  // ** Function to render Notifications
  /*eslint-disable */
  // const renderNotificationItems = () => {
  //   return (
  //     <PerfectScrollbar
  //       component='li'
  //       className='media-list scrollable-container'
  //       options={{
  //         wheelPropagation: false
  //       }}
  //     >
  //       {notificationsArray.map((item, index) => {
  //         return (
  //           <a
  //             key={index}
  //             className='d-flex'
  //             href={item.switch ? '#' : '/'}
  //             onClick={e => {
  //               if (!item.switch) {
  //                 e.preventDefault()
  //               }
  //             }}
  //           >
  //             <div
  //               className={classnames('list-item d-flex', {
  //                 'align-items-start': !item.switch,
  //                 'align-items-center': item.switch
  //               })}
  //             >
  //               {!item.switch ? (
  //                 <Fragment>
  //                   <div className='me-1'>
  //                     <Avatar
  //                       {...(item.img
  //                         ? { img: item.img, imgHeight: 32, imgWidth: 32 }
  //                         : item.avatarContent
  //                         ? {
  //                             content: item.avatarContent,
  //                             color: item.color
  //                           }
  //                         : item.avatarIcon
  //                         ? {
  //                             icon: item.avatarIcon,
  //                             color: item.color
  //                           }
  //                         : null)}
  //                     />
  //                   </div>
  //                   <div className='list-item-body flex-grow-1'>
  //                     {item.title}
  //                     <small className='notification-text'>{item.subtitle}</small>
  //                   </div>
  //                 </Fragment>
  //               ) : (
  //                 <Fragment>
  //                   {item.title}
  //                   {item.switch}
  //                 </Fragment>
  //               )}
  //             </div>
  //           </a>
  //         )
  //       })}
  //     </PerfectScrollbar>
  //   )
  // }
  /*eslint-enable */
const Icon = isMute ? BellOff : Bell
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Icon size={21} />
        {messageCount > 0 && <Badge pill color='danger' className='badge-up'>
        {messageCount}
        </Badge>}
      </DropdownToggle>
      {messageCount > 0 && <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
          <Button.Ripple 
        className='btn-icon cursor-pointer p-0 me-2' 
        color='transparent' 
        id={`mute-btn`}
        onClick={toggleMute}
        >  
          <Icon size={21} />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`mute-btn`}>
           {isMute ? t('mute') : t('unmute')}
          </UncontrolledTooltip> 
            <h4 className='notification-title mb-0 me-auto'>{t('Notifications')}</h4>
            {messageCount > 0 && <Badge tag='div' color='light-primary' pill>
            {t('New')}{messageCount}
            </Badge>}
          </DropdownItem>
        </li>
        {renderNotificationItems("beautyOrders")}
        {renderNotificationItems("beautyAppointments")}
        {renderNotificationItems("foodOrders")}
        {renderNotificationItems("foodBookings")}    
        {/* <li className='dropdown-menu-footer'>
          <Button color='primary' block>
            Read all notifications
          </Button>
        </li> */}
      </DropdownMenu>}
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
