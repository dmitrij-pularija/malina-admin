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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const format = (num) => {
    return `${numberWithCommas(num)} %`
  }

  const parser = (num) => {
    const cells = num.toString().split(" ")
    if (!cells[1]) {
      return num
    }

    const parsed = cells[1].replace(/,*/g, "")

    return parsed
  }

  const price = (row, quantity) => row.cost * (1 - (row.prime_cost / 100)) * quantity

export const columns = (productList, setProductList, setSelectedRows) => {
  const getQuantity = id => {
    const selectedProduct = productList.find(product => product.product === id)
    return selectedProduct ? selectedProduct.quantity : 0
    }

  // const productListIds = productList.map((row) => row.product)

  const handleChangeQuantity = (value, row) => {
    const productListFiltred = productList.filter(list => list.product !== row.id)
    const selectedProduct = productList.find(list => list.product === row.id)
    const mewProduct = selectedProduct ? { ...selectedProduct, quantity: value, total_price: price(row, value) } : { product: row.id, quantity: value, total_price: price(row, value), is_visible: true, product_addons: [] }
    setProductList([...productListFiltred, mewProduct])
    setSelectedRows(prevSelectedRows => [...prevSelectedRows, row])
}

  return [
    // {
    //   name: 'selected',
    //   sortable: true,
    //   omit: true,
    //   selector: row => row.id,
    //   cell: row => productListIds.includes(row.id)
    // },   
  {
    name: 'Блюдо',
    sortable: true,
    minWidth: '230px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.images.length ? row.images[0].image : '', row.name ? row.name : "Блюдо")}
            <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
      </div>
    )
  },
  {
    name: 'Категория',
    sortable: true,
    minWidth: '200px',
    sortField: 'category.id',
    selector: row => row.category.id,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient( row.category && row.category.image ? row.category.image : '', row.category ? row.category.name : 'Категория')}
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{ row.category && row.category.name ? row.category.name : "" }</span>
        </div>
      </div>
    )
  },
  {
    name: 'Цена',
    minWidth: '80px',
    sortable: true,
    sortField: 'cost',
    selector: row => row.cost,
    cell: row => formatNumber(row.cost)
  },
  {
    name: 'Скидка',
    minWidth: '130px',
    sortable: true,
    sortField: 'prime_cost',
    selector: row => row.prime_cost,
    cell: row => `${formatNumberInt(row.prime_cost)} %`
  },
  {
    name: 'Кол-во',
    sortable: false,
    minWidth: '80px',
    sortField: 'count',
    cell: row => (<InputNumber
    id={`quantity-${row.id}`}
    name="quantity"
    placeholder=""
    // defaultValue={getQuantity(row.id)}
    value={getQuantity(row.id)}
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