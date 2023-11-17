import renderClient from '@components/renderClient'
import { formatNumber, formatNumberInt } from '@utils'
import { Edit, Trash2 } from 'react-feather'
import { UncontrolledTooltip, Button } from 'reactstrap'

export const columns = (masters, handleEditProduct, handleDelProduct, t) => {
const renderMasters = masterList => {
  if (masterList && masterList.length) {
  return <div className='d-flex flex-column'>{masterList.map(master => renderClient(master, "master"))}</div>
  } else return ''
}

return [
  {
    name: t('service'),
    sortable: true,
    minWidth: '230px',
    sortField: 'beauty_service_name',
    selector: row => row.beauty_service_name,
    cell: row => renderClient(row, "beautyService")
  },
  {
    name: t('Price'),
    width: '120px',
    sortable: true,
    sortField: 'beauty_service_price',
    cell: row => formatNumber(row.beauty_service_price)
  },
  {
    name: t('servicesData.durationLabel'),
    width: '180px',
    sortable: true,
    sortField: 'beauty_service_duration_minutes',
    cell: row => `${formatNumberInt(row.beauty_service_duration_minutes)} ${t('servicesData.minutes')}`
  },
  {
    name: t('Masters'),
    minWidth: '150px',
    sortable: true,
    sortField: 'beauty_service_masters',
    cell: row => renderMasters(row.beauty_service_masters)
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '250px',
    sortField: 'beauty_service_category.id',
    cell: row => renderClient(row.beauty_service_category, "beautyServiceCategory")
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
        onClick={event => handleEditProduct(event, row)}>
        <Edit size={17} className='mx-1' />
        </Button.Ripple>
        <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
        {t('edit')}
        </UncontrolledTooltip>
        <Button.Ripple 
        className='btn-icon cursor-pointer p-0' 
        color='transparent' 
        id={`del-tooltip-${row.id}`} 
        onClick={event => handleDelProduct(event, row.id)}>
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
