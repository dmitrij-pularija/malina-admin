import renderClient from '@components/renderClient'
import { Link } from 'react-router-dom'
import { formatNumber, formatNumberInt } from '@utils'
import { Button, UncontrolledTooltip } from 'reactstrap'
import { Trash2 } from 'react-feather'


export const relatesProductColumns = (handleDelAddon, t) => {

  return [
  {
    name: '№',
    sortable: false,
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Product'),
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    cell: row => renderClient(row, "product")
  },
  {
    name: t('price'),
    minWidth: '80px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => formatNumber(row.cost)
  },
  {
    name: t('Discount'),
    minWidth: '130px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => `${formatNumberInt(row.prime_cost)} %`
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
