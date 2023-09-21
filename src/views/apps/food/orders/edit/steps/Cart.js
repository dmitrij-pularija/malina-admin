import { Fragment, useState, forwardRef } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import  { columns } from './columns'
import  ExpandableTable from './expandableTable'
import { createProductCart, addProductList, editProductList } from "../../store"
import Select from 'react-select'
import { selectThemeColors, checkIsValid, initSelect } from '@utils'
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

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

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

  const [productList, setProductList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [selectedId, setSelectedId] = useState('')
  const [filteredData, setFilteredData] = useState([])

// console.log(productList)
// console.log("selectedRows")
// console.log(selectedRows)
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
  const rowSelectCritera = row => orderData.order_cart.includes(row.id)

  // const rowSelectCritera = row => selectedProductIds.includes(row.id)

  // const getSelected = id => {
  //   const productListIds = productList.map((row) => row.product)
  //   return productListIds.includes(id)
  // }
  const handleNext = () => stepper.next()

  const onSubmit = (data) => {
    // const newDataIDs = productList.map(product => parseInt(product.product))
    if (selectedOrder) return handleNext()
    // const requestBody = {}
    const cart = {}
    // if (checkIsValid(data, requiredFields)) {
      if (true) {
      //   const requestBody = { data: productList };
      // console.log(requestBody)
      // const productListIds = productList.map((row) => parseInt(row.product))
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
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
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
            selectableRows
            expandableRows
            expandOnRowClicked
            paginationServer
            columns={columns(productList, setProductList, setSelectedRows)}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            selectedRows={selectedRows}
            paginationComponent={CustomPagination}
            expandableRowsComponent={(data) => ExpandableTable(data, products, productList, setProductList)}
            selectableRowsComponent={BootstrapCheckbox}
            // onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
            data={dataToRender()}
            onSelectedRowsChange={({ selectedRows }) => {
              const selectedProductIds = selectedRows.map((row) => row.id)
              const productListIds = productList.map((row) => row.product)
              const productListFiltred = productList.filter(product => selectedProductIds.includes(product.product))
              const newRows = selectedRows.filter(product => !productListIds.includes(product.id))
              const newproductList = newRows.map((row) => ({ product: row.id, quantity: 1, total_price: price(row), is_visible: true, product_addons: [] }))
              setProductList([...productListFiltred, ...newproductList])
            }}
            // selectableRowSelected={row => row.id === 98}
            noDataComponent={<h6 className='text-capitalize'>Категории не найдены</h6>}
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
