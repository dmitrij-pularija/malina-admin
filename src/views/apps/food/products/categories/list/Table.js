import { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
import Sidebar from './Sidebar'
import  { columns } from './columns'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getCategories, getAllCategories, deleteCategory } from '../store'
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

const CategoriesList = ({ stores, sidebarOpen, setSidebarOpen, toggleSidebar, t }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.productsCategories)
  const store = useSelector(state => state.auth.userData.id)
  // const store = 27
  const [sort, setSort] = useState('+')
  // const [selectedId, setSelectedId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  // const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  // const [currentType, setCurrentType] = useState("")

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') })

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleClose = () => {
    setSelectedCategory('')
    setSidebarOpen(false)
   }
   const handleDelCategory = (event, id) => {
    event.preventDefault()
    dispatch(deleteCategory(id))
  }

  // const handleDelSubCategory = (event, id) => {
  //   event.preventDefault()
  //   dispatch(deleteSubCategory(id))
  // }
  const handleEditCategory = (event, row) => {
    event.preventDefault()
    setSelectedCategory(row)
    toggleSidebar()
  }

  // const handleEditSubCategory = (event, row) => {
  //   event.preventDefault()
  //   setSelectedSubCategory(row)
  //   toggleSidebar()
  // }

  useEffect(() => {
    dispatch(getCategories({
      ordering: `${sort}${sortColumn}`,
      supplier_id: store,
      search: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }))
  }, [])

  const handlePagination = page => {
    dispatch(getCategories({
      ordering: `${sort}${sortColumn}`,
      supplier_id: store,
      search: searchTerm,
      page: page.selected + 1,
      perPage: rowsPerPage
    }))
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    dispatch(getCategories({
      ordering: `${sort}${sortColumn}`,
      supplier_id: store,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(getCategories({
      ordering: `${sort}${sortColumn}`,
      supplier_id: store,
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
      supplier_id: store,
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
    dispatch(getCategories({
      ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
      supplier_id: store,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  // const ExpandableTable = ({data: { id }}) => {
  //   const subcategory = subcategories.filter(({ category }) => category === id)
  //   return <DataTable 
  //   responsive
  //   title={
  //     <Button size='sm' color='flat-secondary' onClick={toggleSidebar}>
  //     <Plus size={14} className='me-25' />
  //     <span className='align-middle'>Добавить cубкатегорию</span>
  //     </Button>}
  //   noDataComponent={<h6 className='text-capitalize'>Субкатегории отсутствуют</h6>}
  //   noTableHead={true}
  //   data={subcategory}
  //   columns={columns("subcategory", handleEditCategory, handleEditSubCategory, handleDelCategory, handleDelSubCategory)}
  //   sortIcon={<ChevronDown />}
  //   className='react-dataTable ml-50'
  //   />
  // }

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
                value={currentType}
                onChange={data => {
                  setCurrentType(data)
                  dispatch(getCategories({
                    ordering: `${sort}${sortColumn}`,
                    supplier_id: data.value,
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
        <DataTable
            dataKey="id"
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(stores, handleEditCategory, handleDelCategory, t)}
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
         
      </Card>
      <Sidebar store={store} open={sidebarOpen} toggleSidebar={handleClose} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} t={t} />
    </Fragment>
  )
}

export default CategoriesList