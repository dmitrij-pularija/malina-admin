// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import  { columns } from './columns'

// ** Store & Actions
import { getCategories, getSubCategories } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus} from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

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

// ** Table Header
const CustomHeader = ({ data, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

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
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>500</option>
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
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
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

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Добавить
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const CategoriesList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { data, subcategories } = useSelector(state => state.categories)
  const total = data.length
  // ** States
  // const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const [currentRole, setCurrentRole] = useState({ value: '', label: 'Выберите роль' })
  // const [currentType, setCurrentType] = useState({ value: '', label: 'Выберите тип' })
  // const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Выбирете статус' })
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
// console.log(data)
  // ** Get data on mount
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSubCategories())

    // dispatch(
    //   getData({
    //     sort,
    //     ordering: sortColumn,
    //     search: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     client_type: currentType.value
    //   })
    // )
  }, [dispatch, data.length, currentPage])

  // console.log(data)
  // console.log(subcategories)

  // ** User filter options
  //  const typeOptions = [
  //   { value: '', label: 'Показать все' },
  //   { value: 'user', label: 'Пользователь' },
  //   { value: 'customer', label: 'Клиент' },
  //   { value: 'guest', label: 'Гость' },
  //   { value: 'admin', label: 'Администратор' }
  // ] 
  // const roleOptions = [
  //   { value: '', label: 'Select Role' },
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'author', label: 'Author' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'maintainer', label: 'Maintainer' },
  //   { value: 'subscriber', label: 'Subscriber' }
  // ]

  // const planOptions = [
  //   { value: '', label: 'Select Plan' },
  //   { value: 'basic', label: 'Basic' },
  //   { value: 'company', label: 'Company' },
  //   { value: 'enterprise', label: 'Enterprise' },
  //   { value: 'team', label: 'Team' }
  // ]

  // const statusOptions = [
  //   { value: '', label: 'Select Status', number: 0 },
  //   { value: 'pending', label: 'Pending', number: 1 },
  //   { value: 'active', label: 'Active', number: 2 },
  //   { value: 'inactive', label: 'Inactive', number: 3 }
  // ]

  // ** Function in get data on page change
  const handlePagination = page => {
    // dispatch(
    //   getData({
    //     sort,
    //     ordering: sortColumn,
    //     search: searchTerm,
    //     perPage: rowsPerPage,
    //     page: page.selected + 1,
    //     client_type: currentType.value
    //   })
    // )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    // dispatch(
    //   getData({
    //     sort,
    //     ordering: sortColumn,
    //     search: searchTerm,
    //     perPage: value,
    //     page: currentPage,
    //     client_type: currentType.value
    //   })
    // )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    // dispatch(
    //   getData({
    //     sort,
    //     search: val,
    //     ordering: sortColumn,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     client_type: currentType.value
    //   })
    // )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage))
// console.log(count, total)
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
      return data.slice(0, rowsPerPage)
    }
  }

  // const handleSort = (column, sortDirection) => {
  //   setSort(sortDirection)
  //   setSortColumn(column.sortField)
  //   // dispatch(
  //   //   getData({
  //   //     sort,
  //   //     ordering: sortColumn,
  //   //     search: searchTerm,
  //   //     page: currentPage,
  //   //     perPage: rowsPerPage,
  //   //     client_type: currentType.value
  //   //   })
  //   // )
  // }
  const ExpandableTable = ({data: { id }}) => {
    const subcategory = subcategories.filter(({ category }) => category === id)
    const subcategoryСolumns = columns.filter((item, index) => index !== 2)
    return <DataTable 
    responsive
    title={
      <Button size='sm' color='flat-secondary' onClick={toggleSidebar}>
      <Plus size={14} className='me-25' />
      <span className='align-middle'>Добавить cубкатегорию</span>
      </Button>}
    noDataComponent={<h6 className='text-capitalize'>Субкатегории отсутствуют</h6>}
    noTableHead={true}
    data={subcategory}
    columns={subcategoryСolumns}
    sortIcon={<ChevronDown />}
    className='react-dataTable ml-50'
    />
  }

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Тип</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={typeOptions}
                value={currentType}
                onChange={data => {
                  setCurrentType(data)
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      sort,
                      ordering: sortColumn,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      client_type: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
        <DataTable
            dataKey="id"
            noHeader
            subHeader
            pagination
            responsive
            expandableRows
            expandOnRowClicked
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            expandableRowsComponent={ExpandableTable}
            data={dataToRender()}
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

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default CategoriesList