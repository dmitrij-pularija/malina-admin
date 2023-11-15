import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData, formatNumber, getRate } from '../../../../../utility/Utils'
import { statusObj } from '../../../../../configs/initial'

export const columns = (userData, handleDel, t) => {

  return [ 
  {
    name: '№',
    sortable: true,
    width: '100px',
    sortField: 'id',
    cell: row => (
          <Link
            to={`/apps/food/orders/preview/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.id}</span>
          </Link>
    )
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'order_date',
    cell: row => <span className='text-capitalize'>{formatData(row.order_date)}</span>
  },
  {
    name: t('Price'),
    width: '120px',
    sortable: true,
    sortField: 'total_order_price',
    cell: row => <span className='text-capitalize'>{formatNumber(row.total_order_price)}</span>
  },
  {
    name: t('store'),
    sortable: true,
    minWidth: '250px',
    omit: userData && userData.type === 2,
    sortField: 'business_id.id',
    cell: row => renderClient(row.business_id, "store")
  },
  {
    name: t('deliveryAddress'),
    minWidth: '180px',
    sortable: false,
    sortField: 'delivery_address.location',
    cell: row => <span className='text-capitalize'>{row.delivery_address ? (row.delivery_address.location ? row.delivery_address.location : row.delivery_address.name) : "Внутри заведения"}</span>
  },
  {
    name: t('Table'),
    width: '90px',
    sortable: false,
    sortField: 'table',
    cell: row => <span className='text-capitalize'>{row.table ? row.table : ""}</span>
  },
  {
    name: t('customer'),
    sortable: true,
    minWidth: '200px',
    sortField: 'user_id.name ',
    selector: row => row.user_id.id,
    cell: row => renderClient(row.user_id, "user")
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
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'order_waiter_rating',
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
    name: t('Status'),
    width: '120px',
    sortable: true,
    sortField: 'status',
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status.toString()].colorName} pill>
        {statusObj[row.status.toString()].label}
      </Badge>
    )
  },
  {
    name: t('action'),
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
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{t('View')}</span>
            </DropdownItem>
            <DropdownItem tag='a' href={`/apps/food/orders/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>{t('edit')}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDel(event, row.id)}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>{t('delete')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
}
