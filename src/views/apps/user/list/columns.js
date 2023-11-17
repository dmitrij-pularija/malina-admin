import { Link } from 'react-router-dom'
import renderClient from '@components/renderClient'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// // ** Renders Client Columns
// const renderClient = row => {
//   if (row.avatar && row.avatar.includes("http")) {
//     return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={row.name ? `${row.name} ${row.surname}` : row.user_type}
//       />
//     )
//   }
// }

// ** Renders Role Columns


const statusObj = {
  true: 'light-warning',
  false: 'light-success'
}


export const columns = (handleEditUser, handleDelUser, t) => {
  const typeObj = {
    user: t('User'),
    customer: t('customer'),
    guest: t('guest'),
    admin: t('superadmin')
  }

  const renderRole = row => {
    const roleObj = {
      1: {
        role: t('User'),
        class: 'text-primary',
        icon: User
      },
      3: {
        role: t('superadmin'),
        class: 'text-success',
        icon: Command
      },
      2: {
        role: t('StoreDataю.businessLabel'),
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

return [
  {
    name: t('User'),
    sortable: true,
    minWidth: '180px',
    sortField: 'login',
    cell: row => renderClient(row, "user")
  },
  {
    name: t('type'),
    width: '150px',
    sortable: true,
    sortField: 'user_type',
    cell: row => <span className='text-capitalize'>{typeObj[row.user_type]}</span>
  },
  {
    name: t('Role'),
    sortable: true,
    width: '180px',
    sortField: 'type',
    cell: row => renderRole(row)
  },
  {
    name: t('Status'),
    width: '120px',
    sortable: true,
    sortField: 'is_archive',
    selector: row => row.is_archive,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.is_archive]} pill>
        {row.is_archive ? t('NotActive') : t('Active')}
      </Badge>
    )
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
              to={`/apps/user/view/${row.id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{t('View')}</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={event => handleEditUser(event, row)}>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>{t('edit')}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDelUser(event, row.id)}
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
