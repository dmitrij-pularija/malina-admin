import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

const availableObj = {
  false: 'light-danger',
  true: 'light-success'
}
const statusObj = {
  2: 'light-primary',
  1: 'light-success'
}

export const columns = (type, handleEditCategory, handleEditSubCategory, handleDelCategory, handleDelSubCategory, t) => {
return [
  {
    name: type === "subcategory" ? t('subcategoryLabel') : t('Category'),
    sortable: true,
    minWidth: '150px',
    sortField: 'name',
    cell: row => renderClient(row, "storeCategory")
  },
  {
    name: 'id',
    width: '30px',
    sortable: true,
    omit: true,
    sortField: 'id',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.id}</span>
  },
  {
    name: t('status'),
    width: '200px',
    sortable: true,
    omit: !!(type === "subcategory"),
    sortField: 'available',
    selector: row => row.available,
    cell: row => (
      <Badge className='text-capitalize' color={availableObj[row.available]} pill>
        {row.available ? t('categoryData.Active') : t('categoryData.Inactive')}
      </Badge>
    )
  },
  {
    name: t('type'),
    width: '150px',
    sortable: true,
    omit: !!(type === "subcategory"),
    sortField: 'category_type',
    selector: row => row.category_type,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.category_type]} pill>
        {row.category_type === 1 ? "Food" : "Beauty"}
      </Badge>
    )
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
        onClick={event => (type === "subcategory" ? handleEditSubCategory(event, row) : handleEditCategory(event, row))}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => (type === "subcategory" ? handleDelSubCategory(event, row.id) : handleDelCategory(event, row.id))}>
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