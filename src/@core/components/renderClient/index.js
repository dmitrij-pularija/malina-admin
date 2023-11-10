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
 if (type === "user") {
    redirectLink = `/apps/user/view/${data.id}`
    name = data.name ? `${data.name} ${data.surname ? data.surname : ''}` : "User"
    login = data.login
    avatar = data.avatar
 }
 if (type === "waiter") {
    redirectLink = `/apps/user/waiters/view/${data.id}`
    name = "Waiter"
    login = ""
 }
 if (type === "chef") {
    redirectLink = ""
    name = "Chef"
 }
 if (type === "master") {
    redirectLink = `/apps/user/masters/view/${data.id}`
    name = "Master"
    login = ""
 }
 if (type === "store") {
    name = "Store"
 }

 if (data) {
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