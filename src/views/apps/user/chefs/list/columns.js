import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { Badge, UncontrolledTooltip, Button, DropdownMenu, DropdownItem } from 'reactstrap'

// const getAvatar = data => {
//   if (data && data.image && data.image.includes("http")) {
//     return <Avatar className='me-1' img={data.image} width='32' height='32' />
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
//         content={row.name ? row.name : 'Повар'}
//       />
//     )
//   }
// }

export const columns = (userData, stores, handleEditСhef, handleDelСhef, t) => {
  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }

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
    name: t('сhefsData.Chef'),
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    cell: row => renderClient(row, "chef")
  },
  {
    name: t('store'),
    minWidth: '138px',
    omit: userData && userData.type === 2,
    sortable: true,
    sortField: 'supplier',
    cell: row => renderClient(getStoreInfo(row.business), "store")
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
        onClick={event => handleEditСhef(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelСhef(event, row.id)}>
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