import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { formatNumber, formatNumberInt } from '@utils'
import { store } from '@store/store'
import { getData } from '../store'
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


// const getAvatar = data => {
//   if (data && data.avatar && data.avatar.includes("http")) {
//     return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={data && data.name ? data.name : 'Malina'}
//       />
//     )
//   }
//   }


const renderClient = (image, name) => {
  if (image) {
    return <Avatar className='me-1' img={image} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={name ? name : "Malina"}
      />
    )
  }
}
export const columns = (categories, handleEditProduct, handleDelProduct) => {
  
  const renderCategory = id => {
  if (!id || !categories.length) return '' 
  const foundCategory = categories.find(item => parseInt(item.id) === parseInt(id))

    if (foundCategory) {
    
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {renderClient(foundCategory.avatar, foundCategory.category_name ? foundCategory.category_name : "Категория")}  
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{foundCategory.category_name ? foundCategory.category_name : ''}</span>
    </div>
  </div>
    )
    } else return ''
  }
  
  const renderStoore = store => {
    if (store) {
    
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {renderClient(store.image ? store.image : '', store.name ? store.name : "Заведение")}  
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{store.name ? store.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{store.business_address ? `${store.business_address.city ? store.business_address.city : ''} ${store.business_address.name ? store.business_address.name : ''}` : ""}</small>
    </div>
  </div>
    )
    } else return ''
  }

return [
  {
    name: 'Товар',
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.beauty_product_images && row.beauty_product_images.length ? row.beauty_product_images[0].image : '', row.name ? row.name : "Товар")}
          <Link
            to={`/apps/beauty/products/products/edit/${row.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getData(row.id))}
          >
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
            <span>{ row.description ? row.description : "" }</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Цена',
    width: '150px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => <span>{`${row.cost ? formatNumber(row.cost) : ''} / ${row.sale_cost ? formatNumber(row.sale_cost) : ''}`}</span>
  },
  {
    name: 'Себистоимость',
    width: '200px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => formatNumberInt(row.prime_cost)
  },
  {
    name: 'Категория',
    sortable: true,
    minWidth: '200px',
    sortField: 'category',
    cell: row => renderCategory(row.category)
  },
  {
    name: 'Заведение',
    minWidth: '200px',
    sortable: true,
    sortField: 'supplier.id',
    selector: row => row.supplier,
    cell: row => renderStoore(row.supplier)
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
            {/* <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Подробнее</span>
            </DropdownItem> */}
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEditProduct(event, row)}>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDelProduct(event, row.id)}
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
