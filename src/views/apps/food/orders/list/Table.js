
import { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
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
import { selectThemeColors, initSelect } from '@utils'
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

const OrdersList = ({ userData, t }) => {
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
  // const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  // const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Выбирите статус' })
  const [currentStore, setCurrentStore] = useState("")
  const [currentStatus, setCurrentStatus] = useState("")
  
// console.log(searchTerm)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)  
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
}))
storeOptions.unshift({ value: '', label: t('showAll') })
   
  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!status.length) dispatch(getOrderStatus())  
    if (userData.type === 2 && stores.length) setCurrentStore(userData.type === 2 && initSelect(storeOptions, userData.id))
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: currentPage,
        status: currentStatus ? currentStatus.value : "",
        business_id: userData.type === 2 ? userData.id : currentStore ? currentStore.value : ""
      })
    )
  }, [stores.length, store.messages.length])
 
  const statusOptions = status.map((stat) => ({
    value: String(stat.id),
    label: stat.statusName
  }))
  statusOptions.unshift({ value: '', label: t('showAll') })
 
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
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
      status: currentStatus ? currentStatus.value : "",
      business_id: currentStore ? currentStore.value : "",
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
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
              <Label for='role-select'>{t('Status')}</Label>
              <Select
                isClearable={false}
                value={currentStatus}
                options={statusOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                placeholder={t('statusPlaceholder')}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      status: data.value,
                      business_id: currentStore ? currentStore.value : ""
                    })
                  )
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('store')}</Label>
              <Select
                theme={selectThemeColors}
                isDisabled={userData && userData.type === 2}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={currentStore}
                placeholder={t('selectStore')}
                onChange={data => {
                  setCurrentStore(data)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      status: currentStatus ? currentStatus.value : "",
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
            columns={columns( userData, handleDel, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable min-table-height'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<h6 className='text-capitalize'>{t('notFound')}</h6>}
            subHeaderComponent={
              <CustomHeader
                data={dataToRender()}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  )
}

export default OrdersList