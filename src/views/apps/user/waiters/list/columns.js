import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'
import Rating from 'react-rating'
import { store } from '@store/store'
import { getWaiter } from '../store'
import { Edit, MoreVertical, FileText, Trash2, Star } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
 
export const columns = (userData, stores, handleEditWaiter, handleDelWaiter, t) => {

  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }

return [
  {
    name: t('waiter'),
    sortable: true,
    minWidth: '150px',
    sortField: 'full_name',
    cell: row => renderClient(row, "waiter")
  },
  {
    name: t('store'),
    sortable: true,
    width: '300px',
    omit: userData && userData.type === 2,
    sortField: 'business_id.name',
    cell: row => renderClient(getStoreInfo(row.business_id.id), "store")
  },
  {
    name: t('shift'),
    sortable: true,
    minWidth: '150px',
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
    name: t('rating'),
    width: '142px',
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
              to={`/apps/user/waiters/view/${row.id}`}
              onClick={() => store.dispatch(getWaiter(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{t('View')}</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEditWaiter(event, row)}>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>{t('edit')}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDelWaiter(event, row.id)}
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
