// ** React Imports
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ** Custom Components
import Logo2 from '@components/logo2'
import Avatar from '@components/avatar'
import classnames from 'classnames'
// ** Store & Actions
import { store } from '@store/store'
import { getOrder } from '../store'


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
const renderClient = (name, avatar) => {
  if (avatar && avatar.includes("http")) {
    return <Avatar className='me-1' img={avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={name || 'Malina'}
      />
    )
  }
}



export const columns = (stores, users, status, handleDel) => {
  const getStatus = id => {
    if (id) {
    const findedStatus = status.find(stat => parseInt(stat.id) === parseInt(id))
      return findedStatus ? findedStatus.statusName : ''
    } else return ''
  }
  const renderStoore = id => {
    if (id) {
    const findedStore = stores.find(store => parseInt(store.id) === parseInt(id))
    if (findedStore) {
    return (
      <Link
      to={id ? `/apps/food/stores/store-detail/${id}` : `/apps/food/stores/list/`}
      className='user_name text-truncate text-body d-flex justify-content-left align-items-center'
    >
    {renderClient(findedStore.name ? findedStore.name : 'Заведение', findedStore.image ? findedStore.image : '')}
      <div className='d-flex flex-column ml3'>
      <span className='fw-bolder'>{findedStore.name ? findedStore.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{findedStore.business_address ? `${findedStore.business_address.city ? findedStore.business_address.city : ''}, ${findedStore.business_address.name ? findedStore.business_address.name : ''}` : ''}</small>
     </div>
    </Link>
    )
    } else return '' 
    } else return ''
  }

  const renderCustomer = id => {
    if (id) {
    const findedUser = users.find(user => parseInt(user.id) === parseInt(id))
    if (findedUser) {
    return (
      <Link
      to={id ? `/apps/user/view/${id}` : `/apps/user/list/`}
      className='user_name text-truncate text-body d-flex justify-content-left align-items-center'
    >
    {renderClient(findedUser.name ? `${findedUser.name} ${findedUser.surname ? findedUser.surname : ''}` : 'Клиент', findedUser.avatar ? findedUser.avatar : '')}
      <div className='d-flex flex-column ml3'>
      <span className='fw-bolder'>{findedUser.name ? `${findedUser.name} ${findedUser.surname ? findedUser.surname : ''}` : ''}</span>
      <small className='text-truncate text-muted mb-0'>{findedUser.login ? findedUser.login : ''}</small>
     </div>
    </Link>
    )
    } else return '' 
    } else return ''
  }

  return [ 
    {
      name: '№',
      sortable: false,
      width: '80px',
      selector: row => row,
      cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
  {
    name: 'Заказ',
    sortable: true,
    width: '150px',
    sortField: 'order_date',
    selector: row => row.id,
    cell: row => (
      // <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/apps/beauty/orders/preview/${row.id}`}
            className='text-truncate text-body d-flex flex-column gap-10'
            onClick={() => store.dispatch(getOrder(row.id))}
          >
            <span className='fw-bolder'>{`№ ${row.id}`}</span>
            <span className='text-capitalize'>{formatData(row.order_date)}</span>
          </Link>
      // </div>
    )
  },
  // {
  //   name: 'Дата',
  //   minWidth: '120px',
  //   sortable: true,
  //   sortField: 'order_date',
  //   selector: row => row.order_date,
  //   cell: row => <span className='text-capitalize'>{formatData(row.order_date)}</span>
  // },
  {
    name: 'Сумма',
    minWidth: '120px',
    sortable: true,
    sortField: 'total_price',
    selector: row => row.total_order_price,
    cell: row => <span className='text-capitalize'>{formatNumber(row.total_price)}</span>
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    sortField: 'order_business',
     cell: row => renderStoore(row.order_business)
  },
  {
    name: 'Адрес доставки',
    minWidth: '180px',
    sortable: false,
    sortField: 'delivery_address.name',
    selector: row => row.delivery_address,
    cell: row => <span className='text-capitalize'>{row.delivery_address ? (row.delivery_address.location ? row.delivery_address.location : row.delivery_address.name) : "Внутри заведения"}</span>
  },
  {
    name: 'Клиент',
    sortable: true,
    minWidth: '200px',
    sortField: 'user_account',
    cell: row => renderCustomer(row.user_account)
  },
  {
    name: 'Рейтинг',
    minWidth: '142px',
    sortable: true,
    sortField: 'rate',
    selector: row => row.rate,
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={getRate(row.rate)}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: 'Статус',
    minWidth: '120px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status.toString()].colorName} pill>
        {getStatus(row.status)}
      </Badge>
    )
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
              to={`/apps/beauty/orders/preview/${row.id}`}
              onClick={() => store.dispatch(getOrder(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Просмотр</span>
            </DropdownItem>
            <DropdownItem tag='a' href={`/apps/beauty/orders/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDel(event, row.id)}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Удалить</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
}
