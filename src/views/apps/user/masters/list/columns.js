import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'
import Rating from 'react-rating'
import { Edit, MoreVertical, FileText, Trash2, Star } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
 
export const columns = (stores, handleEdit, handleDel, userData, t) => {
  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }
// const renderStore = id => {
//   const store = stores.find(store => parseInt(store.id) === parseInt(id))
// // console.log(stores)
//   return (
//     <div className='d-flex justify-content-left align-items-center'>
//       {renderClient(store ? store.image : '', store ? store.name : 'Заведение')}
//       <div className='d-flex flex-column ml3'>
//           <span className='fw-bolder'>{store ? store.name : ''}</span>
//           <span>{store && store.business_address ? `${store.business_address.city}, ${store.business_address.name}` : ''}</span>
//       </div>
//     </div>
//   )
// }

return [
  {
    name: t('Master'),
    sortable: true,
    minWidth: '250px',
    sortField: 'master_name',
    selector: row => row,
    cell: row => renderClient(row, "master")
  },
  {
    name: t('Specialty'),
    sortable: true,
    width: '200px',
    sortField: 'master_specialty',
     cell: row => (<span>{row.master_specialty && row.master_specialty.specialty_name ? row.master_specialty.specialty_name : ""}</span>)
  },
  {
    name: t('store'),
    sortable: true,
    minWidth: '250px',
    sortField: 'master_business',
    omit: userData && userData.type === 2,
    cell: row => renderClient(getStoreInfo(row.master_business), "store")
  },
  {
    name: t('rating'),
    width: '142px',
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
              to={`/apps/user/masters/view/${row.id}`}
              onClick={() => store.dispatch(getMaster(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{t('View')}</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEdit(event, row)}>
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
