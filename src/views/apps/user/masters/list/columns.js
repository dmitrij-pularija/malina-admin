import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
// import Logo2 from '@components/logo2'
import Rating from 'react-rating'
import { store } from '@store/store'
import { getMaster } from '../store'
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


 
export const columns = (stores, handleEdit, handleDel) => {

const renderStore = id => {
  const store = stores.find(store => parseInt(store.id) === parseInt(id))
// console.log(stores)
  return (
    <div className='d-flex justify-content-left align-items-center'>
      {renderClient(store ? store.image : '', store ? store.name : 'Заведение')}
      <div className='d-flex flex-column ml3'>
          <span className='fw-bolder'>{store ? store.name : ''}</span>
          <span className='fw-bolder'>{store && store.business_address ? `${store.business_address.city}, ${store.business_address.name}` : ''}</span>
      </div>
    </div>
  )
}

return [
  {
    name: 'Специалист',
    sortable: true,
    minWidth: '250px',
    sortField: 'master_name',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.master_profile_picture, `${row.master_name ? row.master_name : "Специалист"} ${row.surname ? row.surname : ''}`)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/masters/view/${row.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getMaster(row.id))}
          >
            <span className='fw-bolder'>{`${row.master_name ? row.master_name : ''} ${row.surname ? row.surname : ''}`}</span>
          <small className='text-truncate text-muted mb-0'>{row.phone ? row.phone : ''}</small>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Специальность',
    sortable: true,
    minWidth: '220px',
    sortField: 'master_specialty',
     cell: row => row.master_specialty.specialty_name
  },
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '220px',
    sortField: 'master_business',
     cell: row => renderStore(row.master_business)
  },
  {
    name: 'Рейтинг',
    minWidth: '142px',
    sortable: true,
    sortField: 'average_rating',
    selector: row => row.average_rating,
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.average_rating}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: 'Действия',
    minWidth: '100px',
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
              to={`/apps/user/masters/view/${row.id}`}
              onClick={() => store.dispatch(getMaster(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Подробнее</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEdit(event, row)}>
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
