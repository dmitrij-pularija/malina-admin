// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name ? `${row.name} ${row.surname}` : 'User'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    1: {
      role: 'user',
      class: 'text-primary',
      icon: User
    },
    3: {
      role: 'superadmin',
      class: 'text-success',
      icon: Command
    },
    2: {
      role: 'admin',
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.type] ? roleObj[row.type].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.type] ? roleObj[row.type].class : ''} me-50`} />
      {roleObj[row.type].role}
    </span>
  )
}

const statusObj = {
  true: 'light-warning',
  false: 'light-success'
}
const typeObj = {
  user: 'Пользователь',
  customer: 'Клиент',
  guest: 'Гость',
  admin: 'Администратор'
}

export const columns = [
  {
    name: 'Пользователь',
    sortable: true,
    minWidth: '300px',
    sortField: 'login',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{ row.name ? `${row.name} ${row.surname}` : "" }</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.login}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Тип',
    minWidth: '138px',
    sortable: true,
    sortField: 'client_type',
    selector: row => row,
    cell: row => <span className='text-capitalize'>{typeObj[row.client_type]}</span>
  },
  {
    name: 'Роль',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.type,
    cell: row => renderRole(row)
  },
  {
    name: 'Статус',
    minWidth: '138px',
    sortable: true,
    sortField: 'is_archive',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.is_archive]} pill>
        {row.is_archive ? "Не активный" : "Активный"}
      </Badge>
    )
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
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Подробнее</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
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
