import renderClient from '@components/renderClient'
import InputNumber from "rc-input-number"
import { Plus, Minus } from "react-feather"
import { formatNumber, formatNumberInt } from '@utils'
import '@styles/react/libs/input-number/input-number.scss'

// const renderClient = (image, name) => {
//     if (image) {
//       return <Avatar className='me-1' img={image} width='32' height='32' />
//     } else {
//       return (
//         <Avatar
//           initials
//           className='me-1'
//           color={'light-primary'}
//           content={name}
//         />
//       )
//     }
//   }

  // const numberWithCommas = (x) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // }

  // const format = (num) => {
  //   return `${numberWithCommas(num)} %`
  // }

  // const parser = (num) => {
  //   const cells = num.toString().split(" ")
  //   if (!cells[1]) {
  //     return num
  //   }

  //   const parsed = cells[1].replace(/,*/g, "")

  //   return parsed
  // }

  const price = (row, quantity) => row.cost * (1 - (row.prime_cost / 100)) * quantity

export const columns = (tableData, setTableData, t) => {
  // const getQuantity = id => {
  //   const selectedProduct = productList.find(product => product.product === id)
  //   return selectedProduct ? selectedProduct.quantity : 0
  //   }

  // const productListIds = productList.map((row) => row.product)

  const handleChangeQuantity = (value, row) => {
    // const productListFiltred = productList.filter(list => list.product !== row.id)
    // const selectedProduct = productList.find(list => list.product === row.id)
    // const mewProduct = selectedProduct ? { ...selectedProduct, quantity: value, total_price: price(row, value) } : { product: row.id, quantity: value, total_price: price(row, value), is_visible: true, product_addons: [] }
    // setProductList([...productListFiltred, mewProduct])
    // setSelectedRows(prevSelectedRows => [...prevSelectedRows, row])
    
    // const productListFiltred = tableData.filter(list => list.id !== row.id)
    // setTableData([...productListFiltred, {...row, quantity: value, total_price: price(row, value)}])

    const updatedData = tableData.map(rowData => {
      return { ...rowData, selected: rowData.id === row.id ? (value > 0) : rowData.selected, quantity: rowData.id === row.id ? value : rowData.quantity, total_price: price(row, value)}
    })

    const selectedData = updatedData.filter(row => row.selected && row)
    const unselectedData = updatedData.filter(row => !row.selected && row)
    setTableData([...selectedData, ...unselectedData])
    
    // const findedRow = selectedRows.find(item => item.id === row.id)
    // if (findedRow) setSelectedRows(prevSelectedRows => [...prevSelectedRows, row])
}

  return [  
  {
    name: t('Product'),
    sortable: true,
    width: '25%',
    sortField: 'name',
    cell: row => renderClient(row, "product")
  },
  {
    name: t('Category'),
    sortable: true,
    width: '20%',
    sortField: 'category.id',
    cell: row => renderClient(row.category, "productsCategory")
  },
  {
    name: t('price'),
    width: '15%',
    sortable: true,
    sortField: 'cost',
    cell: row => <span className='width right'>{formatNumber(row.cost)}</span>
  },
  {
    name: t('Discount'),
    width: '15%',
    sortable: true,
    sortField: 'prime_cost',
    cell: row => <span className='width center'>{`${formatNumberInt(row.prime_cost)} %`}</span>
  },
  {
    name: t('Quantity'),
    sortable: false,
    width: '15%',
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

// export const addonСolumns = [

//     {
//         name: 'Добавка',
//         sortable: true,
//         minWidth: '220px',
//         sortField: 'name',
//         selector: row => row.name,
//         cell: row => (
//           <div className='d-flex justify-content-left align-items-center'>
//             {renderClient(row.icon ? row.icon : '', row.name ? row.name : "Добавка")}
//             <div className='d-flex flex-column'>
//                 <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
//             </div>
//           </div>
//         )
//       },
//       {
//         name: 'Цена',
//         sortable: true,
//         minWidth: '70px',
//         sortField: 'price',
//         selector: row => row.price,
//         cell: row => (<span dangerouslySetInnerHTML={{ __html: `${formatNumber(row.price)} &#x0441;&#x332;` }} />)
//       },
//       {
//         name: 'Количество',
//         sortable: false,
//         minWidth: '70px',
//         sortField: 'count',
//         cell:  row => (<InputNumber
//         id="percentService"
//         name="percentService"
//         placeholder=""
//         defaultValue={0}
//         // defaultValue={getQuantity(row.id)}
//         // parser={parser}
//         // formatter={format}
//         upHandler={<Plus />}
//         downHandler={<Minus />}
//         max={100}
//         min={0}
//       />)
//       }
// ]