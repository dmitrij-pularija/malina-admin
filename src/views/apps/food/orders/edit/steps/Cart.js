import { Fragment, useState, useEffect, forwardRef } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import  { columns } from './columns'
import  ExpandableTable from './expandableTable'
import { createProductCart, addProductList, editProductList } from "../../store"
import Select from 'react-select'
import { selectThemeColors, checkIsValid, initSelect, arraysAreEqual } from '@utils'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const defaultValues = {
  orderCart: ''
  }
const requiredFields = ["orderCart"]

const price = row => row.cost * (1 - (row.prime_cost / 100))

// const BootstrapCheckbox = forwardRef((props, ref) => (
//   <div className='form-check'>
//     <Input 
//     type='checkbox' 
//     ref={ref}
//     {...props} 
//     />
//   </div>
// ))



const CustomHeader = ({ data, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Показать</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Input>
            <label htmlFor='rows-per-page'>записей</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Поиск:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            {/* <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Добавить
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Cart = ({ stepper, orderData, handleUpdate, products, selectedOrder }) => {

  // { product: row.id, quantity: value, total_price: price(row, value), is_visible: true, product_addons: [] }
  // const [selectedRows, setSelectedRows] = useState([])
  const [tableData, setTableData] = useState([])

//   const initProductList = () => {
// if (selectedOrder) { 
//   const prevList = selectedOrder.order_cart[0].products_list.map(product => ({ product: product.product.id, quantity: product.quantity, total_price: product.total_price, is_visible: true, product_addons: [] }))
//   const prevListIds = prevList.map(product => product.product)
//   const prevSelectedList = products.filter(product => prevListIds.includes(product.id))
// if (prevSelectedList && prevSelectedList.length && !selectedRows.length) setSelectedRows(prevSelectedList)
//     return prevList
//   } else return []
//   // return selectedOrder ? selectedOrder.order_cart[0].products_list.map(product => ({ product: product.product.id, quantity: product.quantity, total_price: product.total_price, is_visible: true, product_addons: [] })) : []
//   }

  // const [productList, setProductList] = useState(initProductList())
  
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [selectedId, setSelectedId] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const getAddonsQuantity = (addonId, productId) => {
    if (selectedOrder) {
      const findProduct = selectedOrder.order_cart[0].products_list.find(product => product.product.id === productId)
      if (!findProduct) return 0
      const findAddon = findProduct.product_addons.find(addon => addon.addon.id === addonId)
      return findAddon ? findAddon.quantity : 0
    } else return 0
  }

  const initAddons = (array, ids, productId) => {
    // let selectedIds = []
    const idsFiltred = ids.find(product => product.id === productId)
    // console.log(idsFiltred)
    const selectedIds = idsFiltred ? idsFiltred.addons : []
    // if (idsFiltred) selectedIds = idsFiltred.addons
    if (array && array.length) {
    const productAddons = array.map(addon => ({...addon, selected: selectedOrder ? selectedIds.includes(addon.id) : false, quantity: getAddonsQuantity(addon.id, productId)}))
    const selectedProductAddons = productAddons.filter(row => row.selected && row)
    const unselectProductAddons = productAddons.filter(row => !row.selected && row)
    return [...selectedProductAddons, ...unselectProductAddons]
    } else return []
  }
  const getQuantity = id => {
    if (selectedOrder) {
      const findQuantity = selectedOrder.order_cart[0].products_list.find(product => product.product.id === id)
      return findQuantity ? findQuantity.quantity : 0
    } else return 0
  }
  const initTableData = (array) => {
    let selectedProductsIds = []
    let selectedAddonsIds = []

    if (selectedOrder) {
      selectedProductsIds = selectedOrder.order_cart[0].products_list.map(product => product.product.id)
      selectedAddonsIds = selectedOrder.order_cart[0].products_list.map(product => ({id: product.product.id, addons: product.product_addons.length ? product.product_addons.map(addon => addon.addon.id) : []}))
      // console.log(selectedAddonsIds)
    }
    const initdata = array.map(row => ({...row, selected: selectedOrder ? selectedProductsIds.includes(row.id) : false, quantity: getQuantity(row.id), product_addons: initAddons(row.addons, selectedAddonsIds, row.id) }))
    const selectedProducts = initdata.filter(row => row.selected && row)
    const unselectProducts = initdata.filter(row => !row.selected && row)
    setTableData([...selectedProducts, ...unselectProducts])
  }


  useEffect(() => {
    if (products.length) initTableData(products)
  }, [products])

// console.log(productList)
// console.log(selectedRows)
// console.log(selectedOrder)
// console.log(tableData)
  const values = orderData ? {
    orderCart: orderData.order_cart ? orderData.order_cart : ''
  } : {}

  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const dataToRender = () => {
    const filters = {
      search: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (products.length > 0) {
      return products
    } else if (products.length === 0 && isFiltered) {
      return []
    } else {
      return []
    }
  }

  const handleFilter = val => setSearchTerm(val)

  // const handleChangeAddons = (selectedRows, id) => {
  // const productListFiltred = productList.filter(product => product.product !== id)
  // const selectedProduct = productList.find(product => product.product === id)
  // const newProduct = products.find(product => product.id === id)
  // const addons = selectedRows.map(row => row.id)
  // const newproductList = selectedProduct ? { ...selectedProduct, product_addons: addons } : { product: newProduct.id, quantity: 1, total_price: price(newProduct), is_visible: true, product_addons: addons }
  // setProductList([...productListFiltred, newproductList])
  // }

  const CustomPagination = () => {
    const data = dataToRender()
    const total = data.length ? data.length : 0
    const count = Number(Math.ceil(total / rowsPerPage))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }
  // const selectedProductIds = productList.map(product => product.product)
  // const rowSelectCritera = row => orderData.order_cart.includes(row.id)

  // const rowSelectCritera = row => selectedProductIds.includes(row.id)

  // const getSelected = id => {
  //   const productListIds = productList.map((row) => row.product)
  //   return productListIds.includes(id)
  // }
  const handleNext = () => stepper.next()

  const onSubmit = (data) => {
    const isSelected = tableData.filter(row => row.selected && row.selected).length > 0
    if (selectedOrder) {
    const newDataFiltred = tableData.filter(product => product.selected && product)
    const newDataIDs = newDataFiltred.map(product => parseInt(product.id))
    const orderCartIDs = selectedOrder.order_cart[0].products_list.map(product => parseInt(product.product.id))
    if (arraysAreEqual(newDataIDs, orderCartIDs)) return handleNext()
    } else {
      
    if (orderData.order_cart && orderData.order_cart.length) return handleNext()
    }
    // const requestBody = {}
    const cart = {}
      if (isSelected) {
      const makeAddons = (array, id) => {
        if (array && array.length) {
          const selectedAddons = array.filter(addon => addon.selected && addon)
          return selectedAddons.map(addon => addon.id)
          // return selectedAddons.map(addon => ({ addon: parseInt(addon.id), quantity: parseInt(addon.quantity), product: id }))
          // return selectedAddons.map(addon => ({ addon: parseInt(addon.id), quantity: parseInt(addon.quantity)}))
        } else return []
      }
      const selectedDatd = tableData.filter(product => product.selected && product)
      const productList = selectedDatd.map(product => ({ product: product.id, quantity: product.quantity, total_price: product.total_price, is_visible: true, product_addons: makeAddons(product.product_addons, product.id) }))
      // console.log(productList)
      cart.products_list = []  
      cart.business_id = orderData.business_id
      cart.is_visible = true
      if (orderData.table_id) cart.table_id = orderData.table_id
      createProductCart(productList, cart).then(({order_cart,  status})  => {
        if (status === 201) {
          handleUpdate({ order_cart }) 
          handleNext()
        }
      })

      // if (orderData.table_id) cart.table_id = orderData.table_id
      //   createProductCart(productList[0], cart).then(response => {
      //     handleUpdate(response) 
      //     handleNext()
      //   })

    } else {
             setError('orderCart', {
            type: "manual"
          })
      // for (const key in data) {
      //   if (data[key].length === 0) {
      //     setError(key, {
      //       type: "manual"
      //     })
      //   }
      // }
    }  
  }

  // const ExpandableTable = ({data: { id }}) => {
  //   const filtredProducts = products.filter(product => product.id === id)
  //   return <DataTable 
  //   dataKey="id"
  //   responsive
  //   selectableRows
  //   noDataComponent={<h6 className='text-capitalize'>Добавки отсутствуют</h6>}
  //   noTableHead={true}
  //   data={filtredProducts[0].addons}
  //   columns={addonСolumns}
  //   sortIcon={<ChevronDown />}
  //   className='react-dataTable ml-50 justify-content-start'
  //   selectableRowsComponent={BootstrapCheckbox}
  //   onSelectedRowsChange={({ selectedRows }) => handleChangeAddons(selectedRows, id)}
  //   />
  // }

  // const customSort = (rows, field, direction) => {
  //   const selectedRows = rows.filter(row => row.selected)
  //   const unselectedRows = rows.filter(row => !row.selected)
  //   const sortedRows = [...selectedRows, ...unselectedRows]
  //   return direction === 'asc' ? sortedRows : sortedRows.reverse()
  // }

  const handleRowSelected = (id, newStatus) => {
        const updatedData = tableData.map((rowData) => {
          if (rowData.id === id) {
            return { ...rowData, selected: newStatus, quantity: newStatus ? rowData.quantity === 0 ? 1 : rowData.quantity : 0}
          } else return rowData
        })
     
    const selectedData = updatedData.filter(row => row.selected && row)
    const unselectedData = updatedData.filter(row => !row.selected && row)
    setTableData([...selectedData, ...unselectedData])

    // console.log(selectedRows)
      // const selectedProductIds = selectedRows.map((row) => row.id)
      // const productListIds = productList.map((row) => row.product)
      // const productListFiltred = productList.filter(product => selectedProductIds.includes(product.product))
      // const newRows = selectedRows.filter(product => !productListIds.includes(product.id))
      // const newproductList = newRows.map((row) => ({ product: row.id, quantity: 1, total_price: price(row), is_visible: true, product_addons: [] }))
      // setProductList([...productListFiltred, ...newproductList])
      // setSelectedRows(selectedRows)

      // setSelectedRows(selectedRows)

    // const updatedData = tableData.map(rowData => {
    //   const isSelected = selectedRows.find(row => row.id === rowData.id)
    //   return { ...rowData, selected: !!isSelected, quantity: !!isSelected && rowData.quantity > 0  ? rowData.quantity : 1, total_price: price(rowData)}
    // })

    // const selectedData = updatedData.filter(row => row.selected && row)
    // const unselectedData = updatedData.filter(row => !row.selected && row)
    // setTableData([...selectedData, ...unselectedData])

  }

  // const selectedRows = tableData.reduce((acc, row) => {
  //   if (row.selected) {
  //     acc[row.id] = true
  //   }
  //   return acc
  // }, {})

  const BootstrapCheckbox = forwardRef(({ onChange, ...rest }, ref) => (
    <div className='form-check'>
      <Input
        type='checkbox' 
        ref={ref}
        {...rest}
        onChange={(e) => {
          const id = parseInt(e.target.name.replace('select-row-', ''))
          handleRowSelected(id, e.target.checked)
          onChange(e.target.checked)
        }}
      />
    </div>
  ))

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Состав заказа</h5>
        {errors && errors.orderCart ? <small className='text-danger'>Пожалуйста выбирите блюда</small> : <small className='text-muted'>Выберите блюда.</small> } 
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <div className='react-dataTable'>
        <DataTable
            dataKey="id"
            noHeader
            subHeader
            pagination
            responsive
            fixedHeader={true}
            highlightOnHover
            selectableRows
            selectableRowsNoSelectAll
            expandableRows
            expandOnRowClicked
            paginationServer
            // defaultSortFieldId={"selected"}
            // sortFunction={customSort}
            // selectableRowsVisibleOnly={false}
            columns={columns(tableData, setTableData)}
            // selectedRows
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            // selectedRows={selectedRows}
            paginationComponent={CustomPagination}
            expandableRowsComponent={(data) => ExpandableTable(data, tableData, setTableData)}
            selectableRowsComponent={BootstrapCheckbox}
            // onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
            data={tableData}
            // onRowClicked={handleRowSelected}
            // onSelectedRowsChange={handleRowSelected}
            selectableRowSelected={row => row.selected}
            // selectableRowsComponentProps={{ onChange: (newValue, id) => {
            //   console.log(newValue, id)
            // //   const updatedData = tableData.map((rowData) => {
            // //     if (parseInt(rowData.id) === parseInt(id)) {
            // //       return { ...rowData, selected: newValue }
            // //     }
            // //     return rowData
            // //   })
            // // setTableData(updatedData)
            // } }}

            // selectableRowsComponentProps={{ onChange: (newValue, context) => {
              
            //   const updatedData = tableData.map((rowData) => {
            //     if (rowData.id === context.id) {
            //       return { ...rowData, selected: newValue }
            //     }
            //     return rowData
            //   })
      
            //   setTableData(updatedData)
            // } }}
            // onSelectedRowsChange={({ selectedRows }) => {
            //   const selectedProductIds = selectedRows.map((row) => row.id)
            //   const productListIds = productList.map((row) => row.product)
            //   const productListFiltred = productList.filter(product => selectedProductIds.includes(product.product))
            //   const newRows = selectedRows.filter(product => !productListIds.includes(product.id))
            //   const newproductList = newRows.map((row) => ({ product: row.id, quantity: 1, total_price: price(row), is_visible: true, product_addons: [] }))
            //   setProductList([...productListFiltred, ...newproductList])
            //   setSelectedRows([...selectedRows])
            // }}
            // selectableRowSelected={row => row.id === 98}
            // selectableRowSelected={selectedRows}
            noDataComponent={<h6 className='text-capitalize'>Блюда не найдены</h6>}
            subHeaderComponent={
              <CustomHeader
                data={products}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Назад</span>
          </Button>
          <Button  type='submit' color='primary' className='btn-next' >
            <span className='align-middle d-sm-inline-block d-none'>Далее</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Cart
