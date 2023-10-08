import Avatar from '@components/avatar'
import InputNumber from "rc-input-number"
import { Plus, Minus } from "react-feather"
import { formatNumber, formatNumberInt } from '@utils'

const renderClient = (image, name) => {
    if (image) {
      return <Avatar className='me-1' img={image} width='32' height='32' />
    } else {
      return (
        <Avatar
          initials
          className='me-1'
          color={'light-primary'}
          content={name}
        />
      )
    }
  }

  const price = (row, quantity) => row.cost * (1 - (row.prime_cost / 100)) * quantity

export const columns = (categories, tableData, setTableData) => {
const renderCategory = id => {  
  if (id) {
    const findedCategory = categories.find(category => parseInt(category.id) === parseInt(id))
    if (findedCategory) { 
      return (
        <div key={id} className='d-flex justify-content-left align-items-center'>
        {renderClient(findedCategory.image ? findedCategory.image : '', findedCategory.category_name ? findedCategory.category_name : 'Категория')}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ findedCategory.category_name ? findedCategory.category_name : "" }</span>
        </div>
      </div>
    ) 
    } else return ''
  } else return ''
}

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
    name: 'Товар',
    sortable: true,
    width: '25%',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.beauty_product_images && row.beauty_product_images.length ? row.beauty_product_images[0].image : '', row.name ? row.name : "Товар")}
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
      </div>
    )
  },
  {
    name: 'Категория',
    sortable: true,
    width: '20%',
    sortField: 'category',
    selector: row => row.category,
    cell: row => renderCategory(row.category)
  },
  {
    name: 'Цена',
    width: '15%',
    sortable: true,
    sortField: 'cost',
    selector: row => row.cost,
    cell: row => <span className='width right'>{formatNumber(row.cost)}</span>
  },
  {
    name: 'Скидка',
    width: '15%',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row.prime_cost,
    cell: row => <span className='width center'>{`${formatNumberInt(row.prime_cost)} %`}</span>
  },
  {
    name: 'Кол-во',
    sortable: false,
    width: '13%',
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