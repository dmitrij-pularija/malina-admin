import { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { columns } from './columns'
import CustomHeader from '@components/customHeader'
import { getWaiters, deleteWaiter } from '../store'
import { getAllStores, getShifts } from '../../../food/stores/store'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { selectThemeColors, initSelect } from '@utils'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const WaitersList = ({ sidebarOpen, toggleSidebar, t }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.waiters)
  const stores = useSelector(state => state.stores.allStores)
  const { userData } = useSelector(state => state.auth)
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [shifts, setShifts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('full_name')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedWaiter, setSelectedWaiter] = useState('')
  const [store, setStore] = useState("")
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // const handleClose = () => {
  //   setSelectedWaiter('')
  //   setSidebarOpen(false)
  //  }

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
}))
storeOptions.unshift({ value: '', label: t('showAll') })

   useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    getShifts().then(response => {
      setShifts(response)
    })
  }, []) 
 
  useEffect(() => {
    if (userData.type === 2 && stores.length) setStore(initSelect(storeOptions, userData.id))
    dispatch(
      getWaiters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id__id: userData.type === 2 ? userData.id : store ? store.value : ""
      })
    )
  }, [stores.length])
  

 
const handleDelWaiter = (event, id) => {
  event.preventDefault()
  dispatch(deleteWaiter(id))
}
const handleEditWaiter = (event, row) => {
  event.preventDefault()
  setSelectedWaiter(row)
  toggleSidebar()
}

  const handlePagination = page => {
    dispatch(
      getWaiters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        business_id__id: store ? store.value : ""
      })
    )
    setCurrentPage(page.selected + 1)
  }
 
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getWaiters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: value,
        page: 1,
        business_id__id: store ? store.value : ""
      })
    )
    setRowsPerPage(value)
  }
 
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getWaiters({
        search: val,
        ordering: `${sort}${sortColumn}`,
        page: 1,
        perPage: rowsPerPage,
        business_id__id: store ? store.value : ""
      })
    )
  }
 
  const CustomPagination = () => {
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
 
  const dataToRender = () => {
    const filters = {
      business_id__id: store ? store.value : "",
      search: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (data.length > 0) {
      return data
    } else if (data.length === 0 && isFiltered) {
      return []
    } else {
      return []
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection === "asc" ? "+" : "-")
    setSortColumn(column.sortField)
    dispatch(
      getWaiters({
        ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
        search: searchTerm,
        page: 1,
        perPage: rowsPerPage,
        business_id__id: store ? store.value : ""
      })
    )
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('store')}</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                isDisabled={userData && userData.type === 2}
                placeholder={t('selectStore')}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={store}
                onChange={data => {
                  setStore(data)
                  setCurrentPage(1)
                  dispatch(
                    getWaiters({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      business_id__id: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(userData, stores, handleEditWaiter, handleDelWaiter, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable min-table-height'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<h6 className='text-capitalize'>{t('notFound')}</h6>}
            subHeaderComponent={
              <CustomHeader
                data={data}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar shifts={shifts} open={sidebarOpen} toggleSidebar={toggleSidebar} selectedWaiter={selectedWaiter} setSelectedWaiter={setSelectedWaiter} stores={stores} userData={userData} t={t} />
    </Fragment>
  )
}

export default WaitersList
