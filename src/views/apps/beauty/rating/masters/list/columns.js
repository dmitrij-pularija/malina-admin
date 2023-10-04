// ** React Imports
import Avatar from '@components/avatar'
// import Logo2 from '@components/logo2'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

  const getAvatar = data => {
  if (data.avatar && data.avatar.includes("http")) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data.name}
      />
    )
  }
  }

// ** Renders Client Columns


export const columns = (users, waiters, stores) => {

  const getMasterInfo = id => {
    const foundMaster = waiters.find(item => item.id === id)
    if (!foundMaster) return {name: "", avatar: ""}
    return {name: foundMaster.master_name ? `${foundMaster.master_name} ${foundMaster.surname ? foundMaster.surname : ''}` : '', avatar: foundMaster.master_profile_picture}
    }
    
    const getUserInfo = id => {
      const foundUser = users.find(item => item.id === id)
      if (!foundUser) return {name: "User", avatar: ""}
      return {name: `${foundUser.name ? foundUser.name : 'Customer'} ${foundUser.surname ? foundUser.surname : foundUser.id}`, avatar: foundUser.avatar }
    }

  const renderClient = (id, type) => {
    let data = {}
    if (type === "master") data = getMasterInfo(id)
    if (type === "user") data = getUserInfo(id)
   
    return (
    <div className='d-flex justify-content-left align-items-center'>
    {getAvatar(data)}
    <div className='d-flex flex-column'>
        <span className='fw-bolder'>{data.name}</span>
    </div>
  </div>
    )
  }

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
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Специалист',
    minWidth: '150px',
    sortable: true,
    sortField: 'master',
    selector: row => row.master,
    cell: row => renderClient(row.master, "master")
  },
  {
    name: 'Рейтинг',
    width: '142px',
    sortable: true,
    sortField: 'master_stars',
    selector: row => row.master_stars,
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.master_stars}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: 'Отзыв',
    minWidth: '300px',
    sortable: true,
    sortField: 'master_review',
    selector: row => row.master_review,
    cell: row => <span className='text-capitalize'>{row.master_review}</span>
  },
  {
    name: 'Клиент',
    minWidth: '150px',
    sortable: true,
    sortField: 'master_rating_user',
    selector: row => row.master_rating_user,
    cell: row => renderClient(row.master_rating_user, "user")
  },
  {
    name: 'Дата',
    width: '120px',
    sortable: true,
    sortField: 'created_at',
    cell: row => <span className='text-capitalize'>{row.created_at ? formatData(row.created_at) : ''}</span>
  }
  // {
  //   name: 'Заказ',
  //   minWidth: '120px',
  //   sortable: true,
  //   sortField: 'order',
  //   selector: row => row.order,
  //   cell: row => <span className='text-capitalize'>{row.order ? row.order : ''}</span>
  // },
  // {
  //   name: 'Заведение',
  //   minWidth: '250px',
  //   sortable: true,
  //   sortField: 'row.business_id',
  //   selector: row => row.business_id,
  //   cell: row => renderStoore(row.business_id)
  // }
]
}
