// ** React Imports
import Avatar from '@components/avatar'
import Logo2 from '@components/logo2'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

  const getAvatar = data => {
  if (data.avatar) {
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

  const getWaiterInfo = id => {
    const foundWaiter = waiters.find(item => item.id === id)
    if (!foundWaiter) return {name: "", avatar: ""}
    return {name: foundWaiter.full_name, avatar: foundWaiter.profile_picture}
    }
    
    const getUserInfo = id => {
      const foundUser = users.find(item => item.id === id)
      if (!foundUser) return {name: "", avatar: ""}
      return {name: `${foundUser.name} ${foundUser.surname}`, avatar: foundUser.avatar }
    }

  const renderClient = (id, type) => {
    let data = {}
    if (type === "waiter") data = getWaiterInfo(id)
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

  const renderStoore = (id) => {
    if (!stores.length || !waiters.length) return
    const foundWaiter = waiters.find(item => item.id === id)
    const foundStore = stores.find(item => item.id === foundWaiter.storeid.id)
    return (
      <div className='d-flex justify-content-left align-items-center'>
      <Logo2 src={foundStore.image} size={"s"}/>
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{foundStore.name}</span>
      <small className='text-truncate text-muted mb-0'>{foundStore.storeaddress.name}</small>
    </div>
  </div>
    )
  }

  return [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Официант',
    minWidth: '180px',
    sortable: true,
    sortField: 'waiter',
    selector: row => row.waiter,
    cell: row => renderClient(row.waiter, "waiter")
  },
  {
    name: 'Рейтинг',
    minWidth: '142px',
    sortable: true,
    sortField: 'star.value',
    selector: row => row.star.value,
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
    name: 'Отзыв',
    minWidth: '180px',
    sortable: true,
    sortField: 'text',
    selector: row => row.text,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: 'Клиент',
    minWidth: '180px',
    sortable: true,
    sortField: 'user',
    selector: row => row.user,
    cell: row => renderClient(row.user, "user")
  },
  {
    name: 'Дата',
    minWidth: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: 'Заведение',
    minWidth: '250px',
    sortable: false,
    selector: row => row.waiter,
    cell: row => renderStoore(row.waiter)
  }
]
}
