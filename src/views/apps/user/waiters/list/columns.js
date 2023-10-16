import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import Logo2 from '@components/logo2'
import Rating from 'react-rating'
import { store } from '@store/store'
import { getWaiter } from '../store'
import { Edit, MoreVertical, FileText, Trash2, Star } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const renderClient = (picture, name) => {
  if (picture) {
    return <Avatar className='me-1' img={picture} width='32' height='32' />
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
 
export const columns = (userData, stores, handleEditWaiter, handleDelWaiter) => {

const getSrc = id => {
  const storeSrc = stores.find(store => store.id === parseInt(id))
  return storeSrc ? storeSrc.image : ""
}

return [
  {
    name: 'Официант',
    sortable: true,
    minWidth: '300px',
    sortField: 'full_name',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.profile_picture, row.full_name)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/waiters/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getWaiter(row.id))}
          >
            <span className='fw-bolder'>{row.full_name}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.telegram}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    omit: userData && userData.type === 2,
    sortField: 'business_id.name',
    selector: row => row.storeid,
     cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(getSrc(row.business_id.id), row.business_id.name)}
        <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{row.business_id.name}</span>
            <span className='fw-bolder'>{row.business_id.phone}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Смена',
    sortable: true,
    minWidth: '250px',
    sortField: 'shift.id',
    selector: row => row,
     cell: row => (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <span className='fw-bolder'>{row.shift ? row.shift.description : ''}</span>
        <span className='fw-bolder'>{row.shift ? `${row.shift.start_time.slice(0, -3)} - ${row.shift.end_time.slice(0, -3)}` : ''}</span>
      </div>
    )
  },
  {
    name: 'Рейтинг',
    minWidth: '142px',
    sortable: true,
    sortField: 'order_waiter_rating',
    selector: row => row.avg_rating,
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.avg_rating}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: 'Действия',
    width: '200px',
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
              to={`/apps/user/waiters/view/${row.id}`}
              onClick={() => store.dispatch(getWaiter(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Подробнее</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEditWaiter(event, row)}>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDelWaiter(event, row.id)}
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
