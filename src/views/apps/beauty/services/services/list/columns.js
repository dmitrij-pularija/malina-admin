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

// const statusObj = {
//   true: 'light-warning',
//   false: 'light-success'
// }
// const typeObj = {
//   user: 'Пользователь',
//   customer: 'Клиент',
//   guest: 'Гость',
//   admin: 'Администратор'
// }

export const columns = (masters, handleEditProduct, handleDelProduct) => {
  // console.log(masters)
  const renderStoore = (row) => {
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {renderClient(row.avatar ? row.avatar : '', row.name ? row.name : "Заведение")}
     <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{row.name ? row.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{row.business_address ? `${row.business_address.city} ${row.business_address.name}` : ""}</small>
    </div>
  </div>
    )
  }

  const renderMaster = id => {   
  const findedMaster = masters.find(master => parseInt(master.id) === parseInt(id))
  if (findedMaster) { 
    return (
  <div key={findedMaster.id} className='d-flex justify-content-left align-items-center'>
  {renderClient(findedMaster.master_profile_picture, `${findedMaster.master_name ? findedMaster.master_name : "Специалист"} ${findedMaster.surname ? findedMaster.surname : ''}`)}
  <div className='d-flex flex-column'>
    <Link
      to={`/apps/user/masters/view/${id}`}
      className='user_name text-truncate text-body d-flex flex-column'
    >
      <span className='fw-bolder'>{`${findedMaster.master_name ? findedMaster.master_name : ''} ${findedMaster.surname ? findedMaster.surname : ''}`}</span>
    <small className='text-truncate text-muted mb-0'>{findedMaster.phone ? findedMaster.phone : ''}</small>
    </Link>
  </div>
</div>
 ) 
} else return ''
}

const renderMasters = masterList => {
  if (masterList && masterList.length) {
  return <div className='d-flex flex-column'>{masterList.map(master => renderMaster(master.id))}</div>
  } else return ''
}

return [
  {
    name: 'Услуга',
    sortable: true,
    minWidth: '230px',
    sortField: 'beauty_service_name',
    selector: row => row.beauty_service_name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.beauty_service_image ? row.beauty_service_image : '', row.beauty_service_name ? row.beauty_service_name : "Услуга")}
          {/* <Link
            to={`/apps/food/products/products/edit/${row.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getData(row.id))}
          > */}
          <div className='text-body d-flex flex-column' >
            <span className='fw-bolder'>{row.beauty_service_name ? row.beauty_service_name : "" }</span>
            <span >{row.beauty_service_description ? row.beauty_service_description : "" }</span>
          </div>  
          {/* </Link> */}
      </div>
    )
  },
  {
    name: 'Цена',
    width: '120px',
    sortable: true,
    sortField: 'beauty_service_price',
    cell: row => formatNumber(row.beauty_service_price)
  },
  {
    name: 'Длительность',
    width: '180px',
    sortable: true,
    sortField: 'beauty_service_duration_minutes',
    cell: row => `${formatNumberInt(row.beauty_service_duration_minutes)} минут`
  },
  {
    name: 'Специалист',
    minWidth: '200px',
    sortable: true,
    sortField: 'beauty_service_masters',
    cell: row => renderMasters(row.beauty_service_masters)
  },
  {
    name: 'Категория',
    sortable: true,
    minWidth: '250px',
    sortField: 'beauty_service_category.id',
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient( row.beauty_service_category && row.beauty_service_category.image ? row.beauty_service_category.image : '', row.beauty_service_category ? row.beauty_service_category.category_name : 'Категория')}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.beauty_service_category && row.beauty_service_category.category_name ? row.beauty_service_category.category_name : "" }</span>
        </div>
      </div>
    )
  },
  {
    name: 'Заведение',
    minWidth: '200px',
    sortable: true,
    sortField: 'beauty_service_business',
    cell: row => renderStoore(row.beauty_service_business)
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
