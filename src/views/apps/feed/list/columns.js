import Avatar from '@components/avatar'
import { Edit, Trash2 } from 'react-feather'
import { formatData } from '@utils'
import { feedsType } from "../../../../configs/initial"
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

const getAvatar = data => {
  if (data && data.avatar) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data && data.title ? data.title : 'Malina'}
      />
    )
  }
  }


const renderClient = row => {
  if (row && row.images.length) {
    return <Avatar className='me-1' img={row.images[0].link} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name ? row.name : 'Публикация'}
      />
    )
  }
}
// const availableObj = {
//   false: 'light-danger',
//   true: 'light-success'
// }
// const statusObj = {
//   2: 'light-primary',
//   1: 'light-success'
// }


export const columns = (userData, handleEdit, handleDel) => {
  const renderStoore = (row) => {
 
    return (
      <div className='d-flex justify-content-left align-items-center'>
      {getAvatar(row.business)}  
    <div className='d-flex flex-column ml3'>
        <span className='fw-bolder'>{row.business && row.business.name ? row.business.name : ''}</span>
      <small className='text-truncate text-muted mb-0'>{row.business && row.business.business_address ? `${row.business.business_address.city} ${row.business.business_address.name}` : ""}</small>
    </div>
  </div>
    )
  }

return [
  {
    name: '№',
    sortable: false,
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Пубдикация',
    sortable: true,
    width: '350px',
    sortField: 'title',
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.title ? row.title : "" }</span>
            {/* <span className='fw-bolder'>{ row.subtitle ? row.subtitle : "" }</span> */}
        </div>
      </div>
    )
  },
  {
    name: 'Дата',
    sortable: false,
    width: '120px',
    sortField: 'date',
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: 'Тип',
    sortable: false,
    width: '100px',
    sortField: 'type',
    cell: row => <span className='text-capitalize'>{feedsType[row.type]}</span>
  },
  {
    name: 'Заведение',
    width: '320px',
    sortable: true,
    sortField: 'business.id',
    // omit: userData && userData.type === 2,
    cell: row => renderStoore(row)
  },
  {
    name: 'Действия',
    width: '120px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEdit(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDel(event, row.id)}>
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