import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { UncontrolledTooltip, Button } from 'reactstrap'
import { formatNumber } from '@utils'

export const columns = (stores, handleEditAddon, handleDelAddon, t) => {

return [
  {
    name: '№',
    sortable: false,
    width: '100px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Addon'),
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    cell: row => renderClient(row, "addons")
  },
  {
    name: t('price'),
    sortable: true,
    width: '200px',
    sortField: 'price',
    cell: row => formatNumber(row.price)
  },
  {
    name: t('action'),
    width: '200px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`edit-tooltip-${row.id}`}  
        onClick={event => handleEditAddon(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelAddon(event, row.id)}>
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