import Avatar from '@components/avatar'
import { Edit, Trash2 } from 'react-feather'
import { UncontrolledTooltip, Button } from 'reactstrap'
import { formatNumber } from '@utils'

const getAvatar = data => {
  if (data && data.avatar && data.avatar.includes("http")) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
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
  if (row.image) {
    return <Avatar className='me-1' img={row.image} width='32' height='32' />
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

export const columns = (stores, handleEditAddon, handleDelAddon) => {
  // const renderStoore = (id) => {
  //   if (!stores.length) return
  //   const foundStore = stores.find(item => item.id === id)
  //   return (
  //     <div className='d-flex justify-content-left align-items-center'>
  //     {getAvatar(foundStore)}  
  //   <div className='d-flex flex-column ml3'>
  //       <span className='fw-bolder'>{foundStore && foundStore.name ? foundStore.name : ''}</span>
  //     <small className='text-truncate text-muted mb-0'>{foundStore && foundStore.business_address ? `${foundStore.business_address.city} ${foundStore.business_address.name}` : ""}</small>
  //   </div>
  // </div>
  //   )
  // }

return [
  {
    name: '№',
    sortable: false,
    width: '100px',
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
    width: '200px',
    sortField: 'price',
    selector: row => row.price,
    cell: row => formatNumber(row.price)
  },
  // {
  //   name: 'Заведение',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'supplier',
  //   selector: row => row,
  //   cell: row => renderStoore(parseInt(row.supplier.id))
  // },
  {
    name: 'Действия',
    width: '200px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEditAddon(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
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
      </div>
    )
  }
]
}