import { Fragment, useState, useEffect, forwardRef } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import  { columns } from './columns'
// import  ExpandableTable from './expandableTable'
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



const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  
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
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Cart = ({ categories, stepper, orderData, handleUpdate, products, selectedOrder }) => {

  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [filteredData, setFilteredData] = useState([])
// console.log(products)
  const getQuantity = id => {
    if (selectedOrder && selectedOrder.carts[0].products_list.length > 0) {
      const findQuantity = selectedOrder.carts[0].products_list.find(product => product.beauty_product.id === id)
      return findQuantity ? findQuantity.quantity : 0
    } else return 0
  }
  const initTableData = (array) => {
    let selectedProductsIds = []

    if (selectedOrder && selectedOrder.carts[0].products_list.length > 0) {
      selectedProductsIds = selectedOrder.carts[0].products_list.map(product => product.beauty_product.id)
    }
    const initdata = array.map(row => ({...row, selected: selectedOrder ? selectedProductsIds.includes(row.id) : false, quantity: getQuantity(row.id) }))
    const selectedProducts = initdata.filter(row => row.selected && row)
    const unselectProducts = initdata.filter(row => !row.selected && row)
    setTableData([...selectedProducts, ...unselectProducts])
  }

  useEffect(() => {
    if (products && products.length && orderData) {
      const filtredProducts = products.filter(product => parseInt(product.supplier.id) === parseInt(orderData.order_business))    
      initTableData(filtredProducts)
    }
  }, [products, orderData])

  const values = orderData ? {
    orderCart: orderData.carts ? orderData.carts : ''
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
  
  const handleNext = () => stepper.next()

  const onSubmit = (data) => {
    const isSelected = tableData.filter(row => row.selected && row.selected).length > 0
    if (selectedOrder) {
    const newDataFiltred = tableData.filter(product => product.selected && product)
    const newDataIDs = newDataFiltred.map(product => parseInt(product.id))
    const orderCartIDs = selectedOrder.carts[0].products_list.map(product => parseInt(product.beauty_product.id))
    if (arraysAreEqual(newDataIDs, orderCartIDs)) return handleNext()
    } else {
      
    if (orderData.carts && orderData.carts.length) return handleNext()
    }
    const cart = {}
      if (isSelected) {
      const selectedDatd = tableData.filter(product => product.selected && product)
      const productList = selectedDatd.map(product => ({ beauty_product: product.id, quantity: product.quantity, user: orderData.user_account}))
      cart.products_list = []  
      cart.cart_business = orderData.order_business
      cart.user_account = orderData.user_account
      cart.is_visible = true
      createProductCart(productList, cart).then(({carts,  status})  => {
        if (status === 201) {
          handleUpdate({ carts }) 
          handleNext()
        }
      })

    } else {
             setError('orderCart', {
            type: "manual"
          })
    }  
  }

  const handleRowSelected = (id, newStatus) => {
        const updatedData = tableData.map((rowData) => {
          if (rowData.id === id) {
            return { ...rowData, selected: newStatus, quantity: newStatus ? rowData.quantity === 0 ? 1 : rowData.quantity : 0}
          } else return rowData
        })
     
    const selectedData = updatedData.filter(row => row.selected && row)
    const unselectedData = updatedData.filter(row => !row.selected && row)
    setTableData([...selectedData, ...unselectedData])
  }

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
        {errors && errors.orderCart ? <small className='text-danger'>Пожалуйста выбирите товары</small> : <small className='text-muted'>Выберите товары</small> } 
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
            paginationServer
            columns={columns(categories, tableData, setTableData)}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            selectableRowsComponent={BootstrapCheckbox}
            data={tableData}
            selectableRowSelected={row => row.selected}
            noDataComponent={<h6 className='text-capitalize'>Товары не найдены</h6>}
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
