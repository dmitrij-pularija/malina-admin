import { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
import Sidebar from './Sidebar'
import  { columns } from './columns'
import Select from 'react-select'
import { selectThemeColors, initSelect } from '@utils'
import { getСhefs, deleteСhefs } from '../store'
import { getAllStores } from '../../../food/stores/store'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus} from 'react-feather'
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

const CategoriesList = ({ sidebarOpen, setSidebarOpen, toggleSidebar, t }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.chefs)
  const { userData } = useSelector(state => state.auth)
  const stores = useSelector(state => state.stores.allStores)
  const [sort, setSort] = useState('+')
  // const [selectedId, setSelectedId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedСhef, setSelectedСhef] = useState('')
  // const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [currentStore, setCurrentStore] = useState("")

  // const typeOptions = [
  //   { value: '', label: 'Показать все' },
  //   { value: '1', label: 'Food' },
  //   { value: '2', label: 'Beauty' }
  // ]
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') })

  const handleClose = () => {
    setSelectedСhef('')
    setSidebarOpen(false)
   }
   const handleDelСhef = (event, id) => {
    event.preventDefault()
    dispatch(deleteСhefs(id))
  }

  const handleEditСhef = (event, row) => {
    event.preventDefault()
    setSelectedСhef(row)
    toggleSidebar()
  }

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (userData.type === 2 && stores.length) setCurrentStore(initSelect(storeOptions, userData.id))
    dispatch(getСhefs({
      ordering: `${sort}${sortColumn}`,
      business__id: userData.type === 2 ? userData.id : currentStore ? currentStore.value : "",
      search: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }))
  }, [stores.length])

  const handlePagination = page => {
    dispatch(getСhefs({
      ordering: `${sort}${sortColumn}`,
      business__id: currentStore ? currentStore.value : "",
      search: searchTerm,
      page: page.selected + 1,
      perPage: rowsPerPage
    }))
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    dispatch(getСhefs({
      ordering: `${sort}${sortColumn}`,
      business__id: currentStore ? currentStore.value : "",
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(getСhefs({
      ordering: `${sort}${sortColumn}`,
      business__id: currentStore ? currentStore.value : "",
      search: val,
      page: 1,
      perPage: rowsPerPage
    }))
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
      business__id: currentStore ? currentStore.value : "",
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
    dispatch(getСhefs({
      ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
      business__id: currentStore ? currentStore.value : "",
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
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
                value={currentStore}
                onChange={data => {
                  setCurrentStore(data)
                  dispatch(getСhefs({
                    ordering: `${sort}${sortColumn}`,
                    business__id: data.value,
                    search: searchTerm,
                    page: 1,
                    perPage: rowsPerPage
                  }))
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>  
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
        <DataTable
            dataKey="id"
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(userData, stores, handleEditСhef, handleDelСhef, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
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
      <Sidebar stores={stores} userData={userData} open={sidebarOpen} toggleSidebar={handleClose} selectedСhef={selectedСhef} setSelectedСhef={setSelectedСhef} t={t} />
    </Fragment>
  )
}

export default CategoriesList