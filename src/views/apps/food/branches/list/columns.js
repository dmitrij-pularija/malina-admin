// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch } from 'react-redux'

import { store } from '@store/store'
import { editBranch, deleteBranch } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Button, UncontrolledTooltip, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// const dispatch = useDispatch()

// const handleDel = id => dispatch(deleteBranch(id))

export const columns = (handleDel, handleEdit) => { 
  
  return [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Название филиала',
    minWidth: '150px',
    sortable: true,
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: 'Адрес филиала',
    minWidth: '150px',
    sortable: true,
    sortField: 'address',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.address}</span>
  },
  {
    name: 'Заведение',
    minWidth: '150px',
    sortable: false,
    sortField: 'storeid',
    selector: row => row.storeid,
    cell: row => <span className='text-capitalize'>{row.storeid.name}</span>
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
        onClick={event => {
        event.preventDefault()
        handleEdit(row)}}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => {
          event.preventDefault()
          handleDel(row.id)}}>
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

