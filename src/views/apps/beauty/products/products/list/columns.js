// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { formatNumber, formatNumberInt } from '@utils'
// ** Store & Actions
import { store } from '@store/store'
import { getData } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


const getAvatar = data => {
  if (data && data.avatar && data.avatar.includes("http")) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data && data.name ? data.name : 'Malina'}
      />
    )
  }
  }


const renderClient = (image, name) => {
  if (image) {
    return <Avatar className='me-1' img={image} width='32' height='32' />
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



// // ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     1: {
//       role: 'user',
//       class: 'text-primary',
//       icon: User
//     },
//     3: {
//       role: 'superadmin',
//       class: 'text-success',
//       icon: Command
//     },
//     2: {
//       role: 'admin',
//       class: 'text-danger',
//       icon: Slack
//     }
//   }

//   const Icon = roleObj[row.type] ? roleObj[row.type].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.type] ? roleObj[row.type].class : ''} me-50`} />
//       {roleObj[row.type].role}
//     </span>
//   )
// }

const statusObj = {
  true: 'light-warning',
  false: 'light-success'
}
// const typeObj = {
//   user: 'Пользователь',
//   customer: 'Клиент',
//   guest: 'Гость',
//   admin: 'Администратор'
// }

export const columns = (stores, handleEditProduct, handleDelProduct) => {
  
  const renderStoore = (id) => {
    if (!stores.length) return
    const foundStore = stores.find(item => item.id === id)
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {getAvatar(foundStore)}  
      {/* <Logo2 src={foundStore.image} size={"s"}/> */}
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{foundStore && foundStore.name ? foundStore.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{foundStore && foundStore.business_address ? `${foundStore.business_address.city} ${foundStore.business_address.name}` : ""}</small>
    </div>
  </div>
    )
  }

return [
  {
    name: 'Блюдо',
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.images.length ? row.images[0].image : '', row.name ? row.name : "Блюдо")}
          <Link
            to={`/apps/food/products/products/edit/${row.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getData(row.id))}
          >
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Категория',
    sortable: true,
    minWidth: '200px',
    sortField: 'category.id',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient( row.category && row.category.image ? row.category.image : '', row.category ? row.category.name : 'Категория')}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.category && row.category.name ? row.category.name : "" }</span>
        </div>
      </div>
    )
  },
  {
    name: 'Цена',
    minWidth: '80px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => formatNumber(row.cost)
  },
  {
    name: 'Скидка',
    minWidth: '130px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => `${formatNumberInt(row.prime_cost)} %`
  },
  {
    name: 'Заведение',
    minWidth: '200px',
    sortable: true,
    sortField: 'supplier',
    selector: row => row,
    cell: row => renderStoore(parseInt(row.supplier.id))
  },
  {
    name: 'Статус',
    minWidth: '138px',
    sortable: true,
    sortField: 'is_archived',
    selector: row => row.is_archived,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.is_archived]} pill>
        {row.is_archived ? "Не доступно" : "Доступно"}
      </Badge>
    )
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
