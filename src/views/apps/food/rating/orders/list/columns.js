import { Link } from 'react-router-dom'
// ** React Imports
import Avatar from '@components/avatar'
import Logo2 from '@components/logo2'

// ** Icons Imports
import { Star } from 'react-feather'

// ** Reactstrap Imports
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

import { getOrder } from '../../../orders/store'
import { getUser } from '../../../../user/store'


const renderClient = (avatar, name) => {
  if (avatar) {
    return <Avatar className='me-1' img={avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={name}
      />
    )
  }
}

export const columns = [
  {
    name: '№',
    sortable: false,
    width: '50px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Заказ',
    sortable: true,
    minWidth: '110px',
    sortField: 'order.id',
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/apps/food/orders/preview/${row.order ? row.order.id : ''}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getOrder(row.order.id))}
          >
            <span className='fw-bolder'>{row.order ? row.order.id : ''}</span>
            <span className='text-capitalize'>{formatData(row.order ? row.order.order_date : '')}</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Клиент',
    sortable: true,
    minWidth: '200px',
    sortField: 'user.login',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.user.avatar, row.user.name ? `${row.user.name} ${row.user.surname}` : 'User')}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.user.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getUser(row.user.id))}
          >
            <span className='fw-bolder'>{ row.user.name ? `${row.user.name} ${row.user.surname}` : "" }</span>
          <small className='text-truncate text-muted mb-0'>{row.user.login}</small>
          </Link>
        </div>
      </div>
    )
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
    name: 'Дата',
    minWidth: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    sortField: 'business.name',
    selector: row => row,
     cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          {/* <Logo2 src={row.business.image} size={"s"}/> */}
          {renderClient(row.business.image, row.business.name ? row.business.name : "Заведение")}
        <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{row.business.name}</span>
          <small className='text-truncate text-muted mb-0'>{`${row.business.business_address.city} ${row.business.business_address.name}`}</small>
        </div>
      </div>
    )
  }
]
