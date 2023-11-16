import renderClient from '@components/renderClient'
import { Edit, Trash2 } from 'react-feather'
import { UncontrolledTooltip, Button } from 'reactstrap'
import { formatNumber, formatNumberInt } from '@utils'

export const columns = (categories, handleEditProduct, handleDelProduct, t) => {
  const getCategoryInfo = id => {
    const findedCategory = categories.find(item => item.id === id)
    if (!findedCategory) return {}
    return findedCategory
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
    name: t('BeautyProduct'),
    sortable: true,
    minWidth: '150px',
    sortField: 'name',
    cell: row => renderClient(row, "beautyProduct")
  },
  {
    name: t('price'),
    width: '120px',
    sortable: true,
    sortField: 'cost',
    selector: row => row,
    cell: row => <span>{row.cost ? formatNumber(row.cost) : ''}</span>
  },
  {
    name: t('Discount'),
    width: '140px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row,
    cell: row => <span>{row.prime_cost ? `${formatNumberInt(row.prime_cost)} %` : ''}</span>
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '80px',
    sortField: 'category',
    cell: row => renderClient(getCategoryInfo(row.category), "beautyProductCategory")
  },
  // {
  //   name: 'Заведение',
  //   minWidth: '200px',
  //   sortable: true,
  //   sortField: 'supplier.id',
  //   selector: row => row.supplier,
  //   cell: row => renderStoore(row.supplier)
  // },
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
