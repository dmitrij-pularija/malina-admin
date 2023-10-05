// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '@utils'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import { Trash2 } from 'react-feather'

const renderClient = row => {
  if (row.icon) {
    return <Avatar className='me-1' img={row.icon} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name ? row.name : 'Добавка'}
      />
    )
  }
}

export const columns = (handleDelAddon) => {

  return [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Добавка',
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
    name: 'Цена',
    sortable: true,
    minWidth: '70px',
    sortField: 'price',
    selector: row => row.price,
    cell: row => formatNumber(row.price)
  },
  {
    name: 'Действия',
    minWidth: '100px',
    cell: row => (
      <>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelAddon(event, row.id)}>
          <Trash2 size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`del-tooltip-${row.id}`}>
          Удалить
        </UncontrolledTooltip>
      </>  
    )
  }
]
}
