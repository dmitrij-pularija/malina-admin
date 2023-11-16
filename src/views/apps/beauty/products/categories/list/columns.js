import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

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


// const renderClient = row => {
//   if (row.icon) {
//     return <Avatar className='me-1' img={row.icon} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={row.category_name}
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


export const columns = (handleEditCategory, handleDelCategory, t) => {

return [
  {
    name: '№',
    sortable: false,
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '150px',
    sortField: 'category_name',
    cell: row => renderClient(row, "beautyProductCategory")
  },
  {
    name: t('descriptionLabel'),
    sortable: true,
    minWidth: '150px',
    sortField: 'category_description',
    cell: row => <span className='fw-bolder'>{ row.category_description ? row.category_description : "" }</span>
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
        onClick={event => handleEditCategory(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelCategory(event, row.id)}>
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