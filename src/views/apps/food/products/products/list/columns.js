// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import renderClient from '@components/renderClient'
import { formatNumber, formatNumberInt } from '@utils'
// ** Store & Actions
// import { store } from '@store/store'
// import { getData } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, Button, UncontrolledTooltip, DropdownMenu, DropdownItem } from 'reactstrap'


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


// const renderClient = (image, name) => {
//   if (image) {
//     return <Avatar className='me-1' img={image} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={name}
//       />
//     )
//   }
// }



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

export const columns = (stores, handleEditProduct, handleDelProduct, t) => {

return [
  {
    name: t('Product'),
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    cell: row => renderClient(row, "product")
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '200px',
    sortField: 'category.id',
    cell: row => renderClient(row.category, "productsCategory")
  },
  {
    name: t('price'),
    minWidth: '80px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => formatNumber(row.cost)
  },
  {
    name: t('Discount'),
    minWidth: '130px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => `${formatNumberInt(row.prime_cost)} %`
  },
  {
    name: t('Status'),
    minWidth: '138px',
    sortable: true,
    sortField: 'is_archived',
    selector: row => row.is_archived,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.is_archived]} pill>
        {row.is_archived ? t('productsData.notAvailable') : t('productsData.available')}
      </Badge>
    )
  },
  {
    name: t('action'),
    minWidth: '120px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEditProduct(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelProduct(event, row.id)}>
          <Trash2 size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`del-tooltip-${row.id}`}>
        {t('delete')}
        </UncontrolledTooltip>
      </div>
    )
  }
]
}
