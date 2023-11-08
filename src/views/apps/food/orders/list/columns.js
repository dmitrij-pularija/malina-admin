// ** React Imports
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import i18next from 'i18next'
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

export const columns = (userData, handleDel) => {

  return [ 
  {
    name: '№',
    sortable: true,
    width: '100px',
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
    // name: i18next.t('Date'),
    name: 'Дата',
    width: '120px',
    sortable: true,
    sortField: 'order_date',
    selector: row => row.order_date,
    cell: row => <span className='text-capitalize'>{formatData(row.order_date)}</span>
  },
  {
    name: 'Сумма',
    width: '120px',
    sortable: true,
    sortField: 'total_order_price',
    selector: row => row.total_order_price,
    cell: row => <span className='text-capitalize'>{formatNumber(row.total_order_price)}</span>
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    omit: userData && userData.type === 2,
    sortField: 'business_id.id',
    selector: row => row.business_id.id,
     cell: row => (
      <Link
            to={row.business_id ? `/apps/food/stores/store-detail/${row.business_id.id}` : `/apps/food/stores/list/`}
            className='user_name text-truncate text-body d-flex justify-content-left align-items-center'
            // onClick={() => { if (row.user_id) store.dispatch(getUser(row.user_id.id)) } }
          >
        {renderClient(row.business_id && row.business_id.name ? row.business_id.name : 'Заведение', row.business_id ? row.business_id.image : '')}
          {/* <Logo2 src={row.business_id.image} size={"s"}/> */}
        <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{row.business_id.name}</span>
          {/* <small className='text-truncate text-muted mb-0'>{row.business_id.business_address ? `${row.business_id.business_address.city}, ${row.business_id.business_address.name}` : ''}</small> */}
        </div>
      </Link>
    )
  },
  {
    name: 'Адрес заказа',
    minWidth: '180px',
    sortable: false,
    sortField: 'delivery_address',
    selector: row => row.delivery_address,
    cell: row => <span className='text-capitalize'>{row.delivery_address ? (row.delivery_address.location ? row.delivery_address.location : row.delivery_address.name) : "Внутри заведения"}</span>
  },
  {
    name: 'Стол',
    width: '80px',
    sortable: false,
    sortField: 'table',
    selector: row => row.table,
    cell: row => <span className='text-capitalize'>{row.table ? row.table : ""}</span>
  },
  {
    name: 'Клиент',
    sortable: true,
    minWidth: '200px',
    sortField: 'user_id.id',
    selector: row => row.user_id.id,
    cell: row => (
      // <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={row.user_id ? `/apps/user/view/${row.user_id.id}` : `/apps/user/list/`}
            className='user_name text-truncate text-body d-flex justify-content-left align-items-center'
            onClick={() => { if (row.user_id) store.dispatch(getUser(row.user_id.id)) } }
          >
            {renderClient(row.user_id && row.user_id.name ? `${row.user_id.name ? row.user_id.name : ''} ${row.user_id.surname ? row.user_id.surname : ''}` : 'Клиент', row.user_id ? row.user_id.avatar : '')}
            <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{ row.user_id ? `${row.user_id.name ? row.user_id.name : ''} ${row.user_id.surname ? row.user_id.surname : ''}` : "" }</span>
            <small className='text-truncate text-muted mb-0'>{row.user_id ? row.user_id.login : ''}</small>
            </div>
          </Link>
      // </div>
    )
  },
  // {
  //   name: 'Официант',
  //   minWidth: '150px',
  //   sortable: true,
  //   sortField: 'waiter',
  //   selector: row => row.waiter,
  //   cell: row => <span className='text-capitalize'>{getWaiterInfo(row.waiter)}</span>
  // },
  {
    name: 'Рейтинг',
    width: '142px',
    sortable: true,
    sortField: 'order_waiter_rating',
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
    width: '120px',
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
    name: 'Действия',
    width: '120px',
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
