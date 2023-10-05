// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, formatNumberInt } from '@utils'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import { Trash2 } from 'react-feather'

const renderClient = (image, name) => {
  if (image) {
    return <Avatar className='me-1' img={image} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={name}
      />
    )
  }
}

export const relatesProductColumns = (handleDelAddon) => {

  return [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Блюдо',
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    selector: row => row,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.images.length ? row.images[0].image : '', row.name ? row.name : "Блюдо")}
          <Link
            to={`/apps/food/products/products/edit/${row.id}`}
            className='user_name text-truncate text-body d-flex flex-column'
            onClick={() => store.dispatch(getData(row.id))}
          >
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Цена',
    minWidth: '80px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => formatNumber(row.cost)
  },
  {
    name: 'Скидка',
    minWidth: '130px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => `${formatNumberInt(row.prime_cost)} %`
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
