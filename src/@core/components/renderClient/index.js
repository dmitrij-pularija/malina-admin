import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import '@styles/base/pages/app-ecommerce.scss'

 const getAvatar = (avatar, name) => {
  if (avatar && avatar.includes("http")) {
    return <Avatar className='me-1' img={avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={name}
      />
    )
  }
  }

const renderClient = (data, type) => {
 let redirectLink = ""
 let name = "User"
 let login = ""
 let avatar = ""

 if (data) {
 if (type === "user") {
    redirectLink = `/apps/user/view/${data.id}`
    name = data.name ? `${data.name} ${data.surname ? data.surname : ''}` : "User"
    login = data.login
    avatar = data.avatar
 }
 if (type === "waiter") {
    redirectLink = `/apps/user/waiters/view/${data.id}`
    name = data.full_name ?  data.full_name : "Waiter"
    login = ""
    avatar = data.profile_picture
 }
 if (type === "chef") {
    avatar = ""
    redirectLink = ""
    name = data.name ?  data.name : "Chef"
    login = data.telegram_id ? data.telegram_id : ""

 }
 if (type === "master") {
    redirectLink = `/apps/user/masters/view/${data.id}`
    name = "Master"
    login = ""
 }
 if (type === "store") {
    redirectLink = `/apps/food/stores/view/${data.id}`
    name = data.name ?  data.name : "Store"
    login = data.business_address && data.business_address.city ?  `${data.business_address.city}, ${data.business_address.name ? data.business_address.name : ''}` : "Store"
    avatar = data.avatar
 }
 if (type === "feed") {
    redirectLink = ""
    name = data.title ?  data.title : "Feed"
    avatar = data.images && data.images.length ? data.images[0].link : ""
}

 
  return (
    <Link
    to={redirectLink}
    className='user_name text-truncate text-body d-flex justify-content-left align-items-center'
    >
    <div className='d-flex justify-content-left align-items-center'>
    {getAvatar(avatar, name)}
    <div className='d-flex flex-column'>
        <span className='fw-bolder'>{name}</span>
        {login && <small className='text-truncate text-muted mb-0'>{login}</small>}
    </div>
  </div> 
  </Link>
  )
 } else return ''
}

export default renderClient