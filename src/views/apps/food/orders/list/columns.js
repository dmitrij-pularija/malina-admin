// ** React Imports
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ** Custom Components
import Logo2 from '@components/logo2'
import classnames from 'classnames'
// ** Store & Actions
import { store } from '@store/store'
import { getOrder, deleteUser } from '../store'


// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData, formatNumber, getRate } from '../../../../../utility/Utils'
import { statusObj } from '../../../../../configs/initial'

const getWaiterInfo = id => {
const waiters = useSelector(state => state.waiters.data)
const foundWaiter = waiters.find(waiter => waiter.id === id) || null
return foundWaiter ? foundWaiter.full_name : ""
}
// ** Renders Client Columns
// const renderClient = row => {
//   // if (row.storeId) {
//     return <Avatar className='me-1' img={row.storeId.image} width='32' height='32' />
//   // } else {
//   //   return (
//   //     <Avatar
//   //       initials
//   //       className='me-1'
//   //       color={'light-primary'}
//   //       content={row.storeId.name || 'Malina'}
//   //     />
//   //   )
//   // }
// }

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     subscriber: {
//       class: 'text-primary',
//       icon: User
//     },
//     maintainer: {
//       class: 'text-success',
//       icon: Database
//     },
//     editor: {
//       class: 'text-info',
//       icon: Edit2
//     },
//     author: {
//       class: 'text-warning',
//       icon: Settings
//     },
//     admin: {
//       class: 'text-danger',
//       icon: Slack
//     }
//   }

//   const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
//       {row.role}
//     </span>
//   )
// }

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

// const statusObj = [
//   {status: '1', label: 'Новый', className: 'light-warning'},
//   {status: '3', label: 'Отменен', className: 'light-secondary'},
//   {status: '8', label: 'Доставлен', className: 'light-success'}
// ]
// const statusObj = {
//   1: { label: 'Новый',  colorName: 'light-warning' },
//   2: { label: '2',  colorName: 'light-warning' },
//   3: { label: 'Отменен', colorName: 'light-secondary' },
//   4: { label: '4', colorName: 'light-secondary' },
//   5: { label: '5', colorName: 'light-secondary' },
//   6: { label: '6', colorName: 'light-secondary' },
//   7: { label: '7', colorName: 'light-secondary' },
//   8: { label: 'Доставлен', colorName: 'light-success' },
//   9: { label: '9', colorName: 'light-success' },
//   10: { label: 'Выполнен', colorName: 'light-success' }
// }

export const columns = [
  {
    name: '№',
    sortable: true,
    minWidth: '30px',
    sortField: 'id',
    selector: row => row.id,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/apps/food/orders/preview/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getOrder(row.id))}
          >
            <span className='fw-bolder'>{row.id}</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    sortField: 'storeId',
    selector: row => row.storeId,
     cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Logo2 src={row.storeId.image} size={"s"}/>
        <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{row.storeId.name}</span>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Адрес заказа',
    minWidth: '180px',
    sortable: true,
    sortField: 'city, street',
    selector: row => row.address,
    cell: row => <span className='text-capitalize'>{row.address ? `${row.address.city}, ${row.address.name}` : "Внутри заведения"}</span>
  },
  {
    name: 'Статус',
    minWidth: '120px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status.toString()].colorName} pill>
        {statusObj[row.status.toString()].label}
      </Badge>
    )
  },
  {
    name: 'Официант',
    minWidth: '150px',
    sortable: true,
    sortField: 'waiter',
    selector: row => row.waiter,
    cell: row => <span className='text-capitalize'>{getWaiterInfo(row.waiter)}</span>
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
    name: 'Рейтинг',
    minWidth: '142px',
    sortable: true,
    sortField: 'order_waiter_rating',
    selector: row => row.rate,
    cell: row => (
      <Rating
        fractions={2}
        direction={'ltr'}
        initialRating={getRate(row.rate)}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: 'Сумма',
    minWidth: '120px',
    sortable: false,
    sortField: 'totalprice',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{formatNumber(row.totalprice)}</span>
  },
  {
    name: 'Действия',
    minWidth: '120px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/food/orders/preview/${row.id}`}
              onClick={() => store.dispatch(getOrder(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Просмотр</span>
            </DropdownItem>
            <DropdownItem tag='a' href={`/apps/food/orders/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
