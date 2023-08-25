import Avatar from '@components/avatar'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

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

const statusObj = {
  0: 'light-secondary',
  1: 'light-success'
}

export const columns = (type, handleEditCategory, handleEditSubCategory, handleDelCategory, handleDelSubCategory) => {
return [
  {
    name: type === "subcategory" ? 'Субкатегория' : 'Категория',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
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
    omit: !!(type === "subcategory"),
    sortField: 'available',
    selector: row => row.available,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[2]} pill>
        {row.available}
      </Badge>
    )
  },
  {
    name: 'Тип',
    minWidth: '138px',
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
    name: 'Действия',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => (type === "subcategory" ? handleEditSubCategory(event, row) : handleEditCategory(event, row))}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => (type === "subcategory" ? handleDelSubCategory(event, row.id) : handleDelCategory(event, row.id))}>
          <Trash2 size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`del-tooltip-${row.id}`}>
          Удалить
        </UncontrolledTooltip>
      </div>
    )
  }
]
}