// ** React Imports
import renderClient from '@components/renderClient'
import { formatNumber } from '@utils'
import { Button, UncontrolledTooltip } from 'reactstrap'
import { Trash2 } from 'react-feather'

export const columns = (handleDelAddon, t) => {

  return [
  {
    name: '№',
    sortable: false,
    width: '50px',
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
    minWidth: '70px',
    sortField: 'price',
    selector: row => row.price,
    cell: row => formatNumber(row.price)
  },
  {
    name: t('action'),
    width: '120px',
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
        {t('delete')}
        </UncontrolledTooltip>
      </>  
    )
  }
]
}
