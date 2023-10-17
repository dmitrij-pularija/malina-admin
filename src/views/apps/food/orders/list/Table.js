// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getData, getOrderStatus, deleteOrder } from '../store'
// import { getWaiters } from '../../../user/waiters/store'
import { getAllStores } from '../../stores/store'

import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'
import { statusObj } from '../../../../../configs/initial'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-ecommerce.scss'

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
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
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Экспорт</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Add New User
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const OrdersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.orders)
  const status = useSelector(state => state.orders.status)
  const stores = useSelector(state => state.stores.allStores)
  // ** States
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('-order_date')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Выбирите статус' })
  
// console.log(searchTerm)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: currentPage,
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
    // dispatch(getData())
    // dispatch(getAllData())
    if (!stores.length) dispatch(getAllStores())
    if (!status.length) dispatch(getOrderStatus())  
    // dispatch(getAllData())
    // dispatch(getWaiters())
    // sort,
    // dispatch(
    //   getData({
    //     ordering: `${sort}${sortColumn}`,
    //     search: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     status: currentStatus.value,
    //     business_id: currentStore.value
    //   })
    // )
  }, [dispatch])
// console.log(store.data)
  // ** User filter options
  // const roleOptions = [
  //   { value: '', label: 'Выберете статус' },
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'author', label: 'Author' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'maintainer', label: 'Maintainer' },
  //   { value: 'subscriber', label: 'Subscriber' }
  // ]

  // const storeOptions = [
  //   { value: '', label: 'Показать все' },
  //   { value: '189', label: 'MALINA ECO FOOD' },
  //   { value: '236', label: 'Chicken Crispy' }
  // ]

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)  
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
}))
storeOptions.unshift({ value: '', label: 'Показать все' })

  // const statusOptions = Object.entries(statusObj).map(([number, status]) => ({
  //   value: number,
  //   label: status.label
  // }))
  // statusOptions.unshift({ value: '', label: 'Показать все' })

  const statusOptions = status.map((stat) => ({
    value: String(stat.id),
    label: stat.statusName
  }))
  statusOptions.unshift({ value: '', label: 'Показать все' })

  // const statusOptions = [
  //   { value: '', label: 'Select Status', number: 0 },
  //   { value: 'pending', label: 'Pending', number: 1 },
  //   { value: 'active', label: 'Active', number: 2 },
  //   { value: 'inactive', label: 'Inactive', number: 3 }
  // ]

  const handleDel = (event, id) => {
    event.preventDefault()
    dispatch(deleteOrder(id))
  }
  
  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: value,
        page: 1,
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        search: val,
        ordering: `${sort}${sortColumn}`,
        page: 1,
        perPage: rowsPerPage,
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      business_id: currentStore.value,
      status: currentStatus.value,
      search: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data && store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allOrders.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection === "asc" ? "+" : "-")
    setSortColumn(column.sortField)
    dispatch(
      getData({
        ordering: `${sortDirection === "asc" ? "+" : "-"}${column.sortField}`,
        search: searchTerm,
        page: 1,
        perPage: rowsPerPage,
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
  }

  return (
    <Fragment>
      <Card>
        {/* <CardHeader>
          <CardTitle tag='h4'>Фильтры</CardTitle>
        </CardHeader> */}
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Статус</Label>
              <Select
                isClearable={false}
                value={currentStatus}
                options={statusOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      status: data.value,
                      business_id: currentStore.value
                    })
                  )
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Заведение</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={currentStore}
                onChange={data => {
                  setCurrentStore(data)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      business_id: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
          <DataTable
            dataKey="id"
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(handleDel)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable min-table-height'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<h6 className='text-capitalize'>Заказы не найдены</h6>}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default OrdersList