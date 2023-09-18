import { useState, forwardRef } from 'react'
import DataTable from 'react-data-table-component'
import { Input } from 'reactstrap'
import { ChevronDown, Plus, Minus } from 'react-feather'
import Avatar from '@components/avatar'
import InputNumber from "rc-input-number"
import { formatNumber, formatNumberInt } from '@utils'
// import  { addonСolumns } from './columns'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const checkbox = forwardRef((props, ref) => (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  ))

const price = row => row.cost * (1 - (row.prime_cost / 100))

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

const addonСolumns = [

    {
        name: 'Добавка',
        sortable: true,
        minWidth: '220px',
        sortField: 'name',
        selector: row => row.name,
        cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row.icon ? row.icon : '', row.name ? row.name : "Добавка")}
            <div className='d-flex flex-column'>
                <span className='fw-bolder'>{ row.name ? row.name : "" }</span>
            </div>
          </div>
        )
      },
      {
        name: 'Цена',
        sortable: true,
        minWidth: '70px',
        sortField: 'price',
        selector: row => row.price,
        cell: row => (<span dangerouslySetInnerHTML={{ __html: `${formatNumber(row.price)} &#x0441;&#x332;` }} />)
      },
      {
        name: 'Количество',
        sortable: false,
        minWidth: '70px',
        sortField: 'count',
        cell:  row => (<InputNumber
        id="percentService"
        name="percentService"
        placeholder=""
        defaultValue={0}
        upHandler={<Plus />}
        downHandler={<Minus />}
        max={100}
        min={0}
      />)
      }
]

const ExpandableTable = ({data: { id, addons }}, products, productList, setProductList) => {

    const [selected, setSelected] = useState([])
    // const selectedProductIds = productList.map(product => product.addons)
    // const rowSelectCritera = row => selectedProductIds.includes(row.id)

    // const rowSelectCritera = row => {
    //     // console.log(row)
    //     // const addons = productList.map(product => product.addons)
    //     // const addonIds = addons.length ? addons.map(addon => addon) : []
    //     // return addonIds.includes(row.id)
    // }

    const handleChangeAddons = (data, id) => {
        // console.log(data)
        // console.log("selectedId")
        // console.log(id)
        const productListFiltred = productList.filter(product => product.product !== id)
        const selectedProduct = productList.find(product => product.product === id)
        const newProduct = products.find(product => product.id === id)
        const addons = data.map(row => row.id)
        const newproductList = selectedProduct ? { ...selectedProduct, product_addons: addons } : { product: newProduct.id, quantity: 1, total_price: price(newProduct), is_visible: true, product_addons: addons }
        setProductList([...productListFiltred, newproductList])
        setSelected(data.id)
        }

    return <DataTable 
    dataKey="id"
    responsive
    selectableRows
    noDataComponent={<h6 className='text-capitalize'>Добавки отсутствуют</h6>}
    noTableHead={true}
    data={addons}
    columns={addonСolumns}
    sortIcon={<ChevronDown />}
    className='react-dataTable ml-50 justify-content-start'
    selectableRowsComponent={checkbox}
    // onSelectedRowsChange={({ selectedRows }) => handleChangeAddons(selectedRows, id)}
    // selectableRowSelected={rowSelectCritera}
    // selectableRowSelected={row => false}
    // selectedRows={selected}
    />
  }

  export default ExpandableTable