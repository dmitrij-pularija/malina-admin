import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

export const columns = (handleEditCategory, handleDelCategory, t) => {

return [
  {
    name: '№',
    sortable: false,
    width: '100px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '300px',
    sortField: 'category_name',
    cell: row => renderClient(row, "beautyServiceCategory")
  },
  // {
  //   name: 'Заведение',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'business.id',
  //   selector: row => row,
  //   cell: row => renderStoore(parseInt(row.business.id))
  // },
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