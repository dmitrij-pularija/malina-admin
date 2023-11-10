import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'
import { Star } from 'react-feather'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

export const columns = (userData, t) => {
return [
  {
    name: '№',
    sortable: false,
    width: '100px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('order'),
    sortable: true,
    width: '120px',
    sortField: 'order.id',
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/apps/food/orders/preview/${row.order ? row.order.id : ''}`}
            className='user_name text-truncate text-body d-flex flex-column'
          >
            <span className='fw-bolder'>{row.order ? row.order.id : ''}</span>
            <span className='text-capitalize'>{formatData(row.order ? row.order.order_date : '')}</span>
          </Link>
      </div>
    )
  },
  {
    name: t('customer'),
    sortable: true,
    minWidth: '200px',
    sortField: 'user.login',
    cell: row => renderClient(row.user, "user")
  },
  {
    name: t('rating'),
    width: '142px',
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
    name: t('review'),
    minWidth: '180px',
    sortable: true,
    sortField: 'text',
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: t('store'),
    sortable: true,
    omit: userData && userData.type === 2,
    minWidth: '250px',
    sortField: 'business.name',
    cell: row => renderClient(row.business, "store")
  }
]
}