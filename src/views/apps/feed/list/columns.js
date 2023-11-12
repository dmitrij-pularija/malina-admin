import Avatar from '@components/avatar'
import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { formatData } from '@utils'
import { feedsType } from "../../../../configs/initial"
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

// const getAvatar = data => {
//   if (data && data.avatar) {
//     return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={data && data.title ? data.title : 'Malina'}
//       />
//     )
//   }
//   }


// const renderClient = row => {
//   if (row && row.images.length) {
//     return <Avatar className='me-1' img={row.images[0].link} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={row.name ? row.name : 'Публикация'}
//       />
//     )
//   }
// }
// const availableObj = {
//   false: 'light-danger',
//   true: 'light-success'
// }
// const statusObj = {
//   2: 'light-primary',
//   1: 'light-success'
// }


export const columns = (userData, handleEdit, handleDel, t) => {

return [
  {
    name: '№',
    sortable: false,
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Feeds'),
    sortable: true,
    minWidth: '150px',
    sortField: 'title',
    cell: row => renderClient(row, "feed")
  },
  {
    name: t('Date'),
    sortable: false,
    width: '120px',
    sortField: 'date',
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: t('type'),
    sortable: false,
    width: '100px',
    sortField: 'type',
    cell: row => <span className='text-capitalize'>{feedsType[row.type]}</span>
  },
  {
    name: t('store'),
    width: '300px',
    sortable: true,
    sortField: 'business.id',
    omit: userData && userData.type === 2,
    cell: row => renderClient(row.business, "store")
  },
  {
    name: t('action'),
    width: '120px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEdit(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDel(event, row.id)}>
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