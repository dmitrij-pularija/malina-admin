import { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import  { columns } from './columns'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getAddons, deleteAddon } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import CustomHeader from '@components/customHeader'
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

const CategoriesList = ({ stores, sidebarOpen, setSidebarOpen, toggleSidebar, t }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.addons)
  const store = useSelector(state => state.auth.userData.id)
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [selectedAddon, setSelectedAddon] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  // const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') })

  const handleClose = () => {
    setSelectedAddon('')
    setSidebarOpen(false)
   }
   const handleDelAddon = (event, id) => {
    event.preventDefault()
    dispatch(deleteAddon(id))
  }

  // const handleDelSubCategory = (event, id) => {
  //   event.preventDefault()
  //   dispatch(deleteSubCategory(id))
  // }
  const handleEditAddon = (event, row) => {
    event.preventDefault()
    setSelectedAddon(row)
    toggleSidebar()
  }

  // const handleEditSubCategory = (event, row) => {
  //   event.preventDefault()
  //   setSelectedSubCategory(row)
  //   toggleSidebar()
  // }

  useEffect(() => {
    dispatch(getAddons({
      ordering: `${sort}${sortColumn}`,
      supplier__id: store,
      search: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }))
  }, [])

  const handlePagination = page => {
    dispatch(getAddons({
      ordering: `${sort}${sortColumn}`,
      supplier__id: store,
      search: searchTerm,
      page: page.selected + 1,
      perPage: rowsPerPage
    }))
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    dispatch(getAddons({
      ordering: `${sort}${sortColumn}`,
      supplier__id: store,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(getAddons({
      ordering: `${sort}${sortColumn}`,
      supplier__id: store,
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
      supplier__id: store,
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
    dispatch(getAddons({
      ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
      supplier__id: store,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  return (
    <Fragment>
          {/* <Card>
        <CardBody>
          <Row>
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
                  dispatch(getAddons({
                    ordering: `${sort}${sortColumn}`,
                    supplier__id: store,
                    search: searchTerm,
                    page: 1,
                    perPage: rowsPerPage
                  }))
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>   */}
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
            columns={columns(stores, handleEditAddon, handleDelAddon, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            // expandableRowsComponent={ExpandableTable}
            // onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
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
      <Sidebar open={sidebarOpen} toggleSidebar={handleClose} selectedAddon={selectedAddon} setSelectedAddon={setSelectedAddon} t={t} />
    </Fragment>
  )
}

export default CategoriesList