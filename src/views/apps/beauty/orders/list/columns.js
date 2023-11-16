import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'
import { MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData, formatNumber, getRate } from '../../../../../utility/Utils'
import { statusObj } from '../../../../../configs/initial'

export const columns = (stores, users, userData, status, handleDel, t) => {
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

  const getStatus = id => {
    if (id) {
    const findedStatus = status.find(stat => parseInt(stat.id) === parseInt(id))
      return findedStatus ? findedStatus.statusName : ''
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
    name: t('order'),
    sortable: true,
    width: '120px',
    sortField: 'order_date',
    cell: row => (
          <Link
            to={`/apps/beauty/orders/preview/${row.id}`}
            className='text-truncate text-body d-flex flex-column gap-10'
          >
            <span className='fw-bolder'>{`№ ${row.id}`}</span>
            <span className='text-capitalize'>{formatData(row.order_date)}</span>
          </Link>
    )
  },
  {
    name: t('Price'),
    width: '120px',
    sortable: true,
    sortField: 'total_price',
    selector: row => row.total_order_price,
    cell: row => <span className='text-capitalize'>{formatNumber(row.total_price)}</span>
  },
  {
    name: t('store'),
    sortable: true,
    minWidth: '250px',
    sortField: 'order_business',
    omit: userData && userData.type === 2,
     cell: row => renderClient(getStoreInfo(row.order_business), "store")
  },
  {
    name: t('deliveryAddress'),
    minWidth: '180px',
    sortable: false,
    sortField: 'delivery_address.name',
    cell: row => <span className='text-capitalize'>{row.delivery_address ? (row.delivery_address.location ? row.delivery_address.location : row.delivery_address.name) : "Внутри заведения"}</span>
  },
  {
    name: t('customer'),
    sortable: true,
    minWidth: '200px',
    sortField: 'user_account',
    cell: row => renderClient(getUserInfo(row.user_account), "user")
  },
  {
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'rate',
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
        {getStatus(row.status)}
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
              to={`/apps/beauty/orders/preview/${row.id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{t('View')}</span>
            </DropdownItem>
            <DropdownItem tag='a' href={`/apps/beauty/orders/edit/${row.id}`} className='w-100'>
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
