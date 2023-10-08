import { useState, forwardRef } from 'react'
import DataTable from 'react-data-table-component'
import { Input } from 'reactstrap'
import { ChevronDown, Plus, Minus } from 'react-feather'
import Avatar from '@components/avatar'
import InputNumber from "rc-input-number"
import { formatNumber, formatNumberInt } from '@utils'
// import  { addonСolumns } from './columns'
import '@styles/react/libs/tables/react-dataTable-component.scss'



const price = (row, value) => row.cost * (1 - (row.prime_cost / 100)) * value

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


  const setAddons = (value, status, id, array) => {
    if (array && array.length) {
    const updateAddons = array.map(addon => {
       if (addon.id === id) {
         return {...addon, selected: value > 0 ? status : false, quantity: value} 
       } else return addon
      })
      const selectedAddon = updateAddons.filter(row => row.selected && row)
      const unselectedAddons = updateAddons.filter(row => !row.selected && row)
      return [...selectedAddon, ...unselectedAddons]         
    } else return []
  } 

const ExpandableTable = ({data: { id, product_addons }}, tableData, setTableData) => {

  const handleChangeQuantity = (value, row) => {
    const updatedData = tableData.map(rowData => {
      if (rowData.id === id) {
      return { ...rowData, selected: true, quantity: rowData.quantity > 0 ? rowData.quantity : 1, total_price: price(rowData, rowData.quantity > 0 ? rowData.quantity : 1), product_addons: setAddons(value, true, row.id, rowData.product_addons)}
      } else return rowData
    })

    const selectedData = updatedData.filter(row => row.selected && row)
    const unselectedData = updatedData.filter(row => !row.selected && row)
    setTableData([...selectedData, ...unselectedData])
    
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
      cell: row => (<span className='width right' dangerouslySetInnerHTML={{ __html: `${formatNumber(row.price)} &#x0441;&#x332;` }} />)
    },
    {
      name: 'Кол',
      sortable: false,
      minWidth: '70px',
      sortField: 'quantity',
      cell:  row => (<InputNumber
      id="quantity"
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

// console.log(addons)
    // const [selected, setSelected] = useState([])
    // const selectedProductIds = productList.map(product => product.addons)
    // const rowSelectCritera = row => selectedProductIds.includes(row.id)

    // const rowSelectCritera = row => {
    //     // console.log(row)
    //     // const addons = productList.map(product => product.addons)
    //     // const addonIds = addons.length ? addons.map(addon => addon) : []
    //     // return addonIds.includes(row.id)
    // }

    const handleChangeAddons = (addonId, newStatus) => {
      const updatedData = tableData.map(rowData => {
        if (rowData.id === id) {
        return { ...rowData, selected: newStatus, quantity: rowData.quantity > 0 ? rowData.quantity : 1, total_price: price(rowData, rowData.quantity > 0 ? rowData.quantity : 1), product_addons: setAddons(1, newStatus, addonId, rowData.product_addons)}
        } else return rowData
      })
  
      const selectedData = updatedData.filter(row => row.selected && row)
      const unselectedData = updatedData.filter(row => !row.selected && row)
      setTableData([...selectedData, ...unselectedData])


        // console.log("selectedId")
        // console.log(id)
        // const productListFiltred = productList.filter(product => product.product !== id)
        // const selectedProduct = productList.find(product => product.product === id)
        // const newProduct = products.find(product => product.id === id)
        // const addons = data.map(row => row.id)
        // const newproductList = selectedProduct ? { ...selectedProduct, product_addons: addons } : { product: newProduct.id, quantity: 1, total_price: price(newProduct), is_visible: true, product_addons: addons }
        // setProductList([...productListFiltred, newproductList])
        // setSelected(data.id)
        }

        const checkbox = forwardRef(({ onChange, ...rest }, ref) => (
          <div className='form-check'>
            <Input
              type='checkbox' 
              ref={ref}
              {...rest}
              onChange={(e) => {
                const id = parseInt(e.target.name.replace('select-row-', ''))
                handleChangeAddons(id, e.target.checked)
                onChange(e.target.checked)
              }}
            />
          </div>
        ))

    return <DataTable 
    dataKey="id"
    responsive
    selectableRows
    noDataComponent={<h6 className='text-capitalize'>Добавки отсутствуют</h6>}
    noTableHead={true}
    data={product_addons}
    columns={addonСolumns}
    sortIcon={<ChevronDown />}
    className='react-dataTable ml-50 justify-content-start'
    selectableRowsComponent={checkbox}
    selectableRowSelected={row => row.selected}
    // onSelectedRowsChange={({ selectedRows }) => handleChangeAddons(selectedRows, id)}
    // selectableRowSelected={rowSelectCritera}
    // selectableRowSelected={row => false}
    // selectedRows={selected}
    />
  }

  export default ExpandableTable