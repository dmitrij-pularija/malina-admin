import renderClient from '@components/renderClient'
import InputNumber from "rc-input-number"
import { Plus, Minus } from "react-feather"
import { formatNumber, formatNumberInt } from '@utils'

const price = (row, quantity) => row.cost * (1 - (row.prime_cost / 100)) * quantity

export const columns = (categories, tableData, setTableData, t) => {
  const getCategoryInfo = id => {
    const findedCategory = categories.find(item => item.id === id)
    if (!findedCategory) return {}
    return findedCategory
  }  
// const renderCategory = id => {  
//   if (id) {
//     const findedCategory = categories.find(category => parseInt(category.id) === parseInt(id))
//     if (findedCategory) { 
//       return (
//         <div key={id} className='d-flex justify-content-left align-items-center'>
//         {renderClient(findedCategory.image ? findedCategory.image : '', findedCategory.category_name ? findedCategory.category_name : 'Категория')}
//         <div className='d-flex flex-column'>
//             <span className='fw-bolder'>{ findedCategory.category_name ? findedCategory.category_name : "" }</span>
//         </div>
//       </div>
//     ) 
//     } else return ''
//   } else return ''
// }

  const handleChangeQuantity = (value, row) => {
    const updatedData = tableData.map(rowData => {
      return { ...rowData, selected: rowData.id === row.id ? (value > 0) : rowData.selected, quantity: rowData.id === row.id ? value : rowData.quantity, total_price: price(row, value)}
    })

    const selectedData = updatedData.filter(row => row.selected && row)
    const unselectedData = updatedData.filter(row => !row.selected && row)
    setTableData([...selectedData, ...unselectedData])
}

  return [  
  {
    name: t('BeautyProduct'),
    sortable: true,
    minWidth: '80px',
    sortField: 'name',
    cell: row => renderClient(row, "beautyProduct")
  },
  {
    name: t('Category'),
    sortable: true,
    minWidth: '80px',
    sortField: 'category',
    cell: row => renderClient(getCategoryInfo(row.category), "beautyProductCategory")
  },
  {
    name: t('price'),
    width: '120px',
    sortable: true,
    sortField: 'cost',
    cell: row => <span className='width right'>{formatNumber(row.cost)}</span>
  },
  {
    name: t('Discount'),
    width: '140px',
    sortable: true,
    sortField: 'prime_cost',
    cell: row => <span className='width center'>{`${formatNumberInt(row.prime_cost)} %`}</span>
  },
  {
    name: t('Quantity'),
    sortable: false,
    width: '140px',
    sortField: 'quantity',
    cell: row => (<InputNumber
    id={`quantity-${row.id}`}
    name="quantity"
    placeholder=""
    defaultValue={row.quantity}
    value={row.quantity}
    upHandler={<Plus />}
    downHandler={<Minus />}
    max={100}
    min={0}
    onChange={(value) => handleChangeQuantity(value, row)}
  />)
  }
]
}