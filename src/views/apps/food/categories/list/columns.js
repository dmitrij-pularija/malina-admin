// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { editCategory, deleteCategory } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledTooltip, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.icon) {
    return <Avatar className='me-1' img={row.icon} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name}
      />
    )
  }
}

// export const ExpandableTable = ({data}) => {
//   console.log(data.id)
//   return (
//     <div>{data.name}</div>
//   )
// }

// ** Renders Role Columns
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

  // const Icon = roleObj[row.type] ? roleObj[row.type].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.type] ? roleObj[row.type].class : ''} me-50`} />
//       {roleObj[row.type].role}
//     </span>
//   )
// }

const statusObj = {
  0: 'light-secondary',
  1: 'light-success'
}
// const typeObj = {
//   user: 'Пользователь',
//   customer: 'Клиент',
//   guest: 'Гость',
//   admin: 'Администратор'
// }

export const columns = [
  {
    name: 'Категория',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.login}</small>
        </div>
      </div>
    )
  },
  {
    name: 'id',
    minWidth: '30px',
    sortable: true,
    omit: true,
    sortField: 'id',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.id}</span>
  },
  {
    name: 'Статус',
    minWidth: '138px',
    sortable: true,
    sortField: 'available',
    selector: row => row.available,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.available]} pill>
        {row.available === 1 ? "Активная" : row.available === 0 ? "Не активная" : ""}
      </Badge>
    )
  },
  {
    name: 'Действия',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Edit className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Trash2 size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Удалить
        </UncontrolledTooltip>
      </div>
    )
    // cell: row => (
    //   <div className='column-action'>
    //     <UncontrolledDropdown>
    //       <DropdownToggle tag='div' className='btn btn-sm'>
    //         <MoreVertical size={14} className='cursor-pointer' />
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem
    //           tag={Link}
    //           className='w-100'
    //           to={`/apps/user/view/${row.id}`}
    //           onClick={() => store.dispatch(getUser(row.id))}
    //         >
    //           <FileText size={14} className='me-50' />
    //           <span className='align-middle'>Подробнее</span>
    //         </DropdownItem>
    //         <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
    //           <Edit size={14} className='me-50' />
    //           <span className='align-middle'>Редактировать</span>
    //         </DropdownItem>
    //         <DropdownItem
    //           tag='a'
    //           href='/'
    //           className='w-100'
    //           onClick={e => {
    //             e.preventDefault()
    //             store.dispatch(deleteUser(row.id))
    //           }}
    //         >
    //           <Trash2 size={14} className='me-50' />
    //           <span className='align-middle'>Удалить</span>
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   </div>
    // )
  }
]

