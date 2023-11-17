// ** React Imports
import renderClient from '@components/renderClient'
// import Logo2 from '@components/logo2'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

export const columns = (users, stores, userData, t) => {
  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }
  const getUserInfo = id => {
    const foundUser = users.find(item => item.id === id)
    if (!foundUser) return {}
    return foundUser
  }
  // const getMasterInfo = id => {
  //   const foundMaster = waiters.find(item => item.id === id)
  //   if (!foundMaster) return {name: "", avatar: ""}
  //   return {name: foundMaster.master_name ? `${foundMaster.master_name} ${foundMaster.surname ? foundMaster.surname : ''}` : '', avatar: foundMaster.master_profile_picture}
  //   }
    
  //   const getUserInfo = id => {
  //     const foundUser = users.find(item => item.id === id)
  //     if (!foundUser) return {name: "User", avatar: ""}
  //     return {name: `${foundUser.name ? foundUser.name : 'Customer'} ${foundUser.surname ? foundUser.surname : foundUser.id}`, avatar: foundUser.avatar }
  //   }

  // const renderClient = (id, type) => {
  //   let data = {}
  //   if (type === "master") data = getMasterInfo(id)
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
    width: '50px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('store'),
    minWidth: '250px',
    sortable: true,
    sortField: 'business.id',
    cell: row => renderClient(getStoreInfo(row.business.id), "store")
  },
  {
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'star',
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.star}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: t('review'),
    minWidth: '180px',
    sortable: true,
    sortField: 'text',
    selector: row => row.text,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: t('customer'),
    minWidth: '180px',
    sortable: true,
    sortField: 'user.id',
    cell: row => renderClient(getUserInfo(row.user.id), "user")
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'date',
    cell: row => <span className='text-capitalize'>{row.date ? formatData(row.date) : ''}</span>
  }
  // {
  //   name: 'Заказ',
  //   minWidth: '120px',
  //   sortable: true,
  //   sortField: 'order',
  //   selector: row => row.order,
  //   cell: row => <span className='text-capitalize'>{row.order ? row.order : ''}</span>
  // },

]
}
