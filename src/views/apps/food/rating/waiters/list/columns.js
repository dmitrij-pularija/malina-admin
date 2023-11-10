import renderClient from '@components/renderClient'
// ** React Imports
// import Avatar from '@components/avatar'
// import Logo2 from '@components/logo2'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

  // const getAvatar = data => {
  // if (data.avatar && data.avatar.includes("http")) {
  //   return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  // } else {
  //   return (
  //     <Avatar
  //       initials
  //       className='me-1'
  //       color={'light-primary'}
  //       content={data.name}
  //     />
  //   )
  // }
  // }

// ** Renders Client Columns


export const columns = (users, waiters, stores, userData, t) => {

  // const getWaiterInfo = id => {
  //   const foundWaiter = waiters.find(item => item.id === id)
  //   if (!foundWaiter) return {name: "", avatar: ""}
  //   return {name: foundWaiter.full_name ? foundWaiter.full_name : '', avatar: foundWaiter.profile_picture}
  //   }

  // const getUserInfo = id => {
  //   const foundUser = users.find(item => item.id === id)
  //   if (!foundUser) return {name: "User", avatar: ""}
  //   return {name: `${foundUser.name ? foundUser.name : 'Customer'} ${foundUser.surname ? foundUser.surname : foundUser.id}`, avatar: foundUser.avatar }
  // }


  const getWaiterInfo = id => {
    const foundWaiter = waiters.find(item => item.id === id)
    if (!foundWaiter) return {}
    return foundWaiter
    } 
    
    const getUserInfo = id => {
      const foundUser = users.find(item => item.id === id)
      if (!foundUser) return {}
      return foundUser
    }

    const getStoreInfo = id => {
      const foundStore = stores.find(item => item.id === id)
      if (!foundStore) return {}
      return foundStore
    }

  // const renderClient = (id, type) => {
  //   let data = {}
  //   if (type === "waiter") data = getWaiterInfo(id)
  //   if (type === "user") data = getUserInfo(id)
   
  //   return (
  //   <div className='d-flex justify-content-left align-items-center'>
  //   {getAvatar(data)}
  //   <div className='d-flex flex-column'>
  //       <span className='fw-bolder'>{data.name}</span>
  //   </div>
  // </div>
  //   )
  // }

  // const renderStoore = (id) => {
  //   if (!stores.length) return
  //   const foundStore = stores.find(item => item.id === id)
  //   return (
  //     <div className='d-flex justify-content-left align-items-center'>
  //     {getAvatar(foundStore)}  
  //     {/* <Logo2 src={foundStore.image} size={"s"}/> */}
  //   <div className='d-flex flex-column ml3'>
  //       <span className='fw-bolder'>{foundStore.name}</span>
  //     <small className='text-truncate text-muted mb-0'>{foundStore.business_address ? `${foundStore.business_address.city} ${foundStore.business_address.name}` : ""}</small>
  //   </div>
  // </div>
  //   )
  // }

  return [
  {
    name: '№',
    sortable: false,
    width: '80px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('waiter'),
    minWidth: '180px',
    sortable: true,
    sortField: 'waiter',
    cell: row => renderClient(getWaiterInfo(row.waiter), "waiter")
  },
  {
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'star.value',
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.star.value}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: t('review'),
    minWidth: '180px',
    sortable: true,
    sortField: 'text',
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: t('customer'),
    minWidth: '180px',
    sortable: true,
    sortField: 'user',
    cell: row => renderClient(getUserInfo(row.user), "user")
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'date',
    cell: row => <span className='text-capitalize'>{row.date ? formatData(row.date) : ''}</span>
  },
  // {
  //   name: 'Заказ',
  //   minWidth: '120px',
  //   sortable: true,
  //   sortField: 'order',
  //   selector: row => row.order,
  //   cell: row => <span className='text-capitalize'>{row.order ? row.order : ''}</span>
  // },
  {
    name: t('store'),
    minWidth: '250px',
    sortable: true,
    omit: userData && userData.type === 2,
    sortField: 'row.business_id',
    cell: row => renderClient(getStoreInfo(row.business_id), "store")
  }
]
}
