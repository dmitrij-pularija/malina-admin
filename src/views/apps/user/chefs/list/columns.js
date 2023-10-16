import Avatar from '@components/avatar'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

const getAvatar = data => {
  if (data && data.image && data.image.includes("http")) {
    return <Avatar className='me-1' img={data.image} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data && data.name ? data.name : 'Malina'}
      />
    )
  }
  }


const renderClient = row => {
  if (row.icon) {
    return <Avatar className='me-1' img={row.icon} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name ? row.name : 'Повар'}
      />
    )
  }
}

export const columns = (userData, stores, handleEditСhef, handleDelСhef) => {
  const renderStoore = (id) => {
    if (!stores.length) return
    const foundStore = stores.find(item => item.id === id)
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {getAvatar(foundStore)}  
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{foundStore && foundStore.name ? foundStore.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{foundStore && foundStore.business_address ? `${foundStore.business_address.city} ${foundStore.business_address.name}` : ""}</small>
    </div>
  </div>
    )
  }

return [
  {
    name: '№',
    sortable: false,
    width: '100px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Повар',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
            <span className='fw-bolder'>{ row.telegram_id ? row.telegram_id : "" }</span>
        </div>
      </div>
    )
  },
  {
    name: 'Заведение',
    minWidth: '138px',
    omit: userData && userData.type === 2,
    sortable: true,
    sortField: 'supplier',
    selector: row => row,
    cell: row => renderStoore(parseInt(row.business))
  },
  {
    name: 'Действия',
    width: '200px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEditСhef(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelСhef(event, row.id)}>
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