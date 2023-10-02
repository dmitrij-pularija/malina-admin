import { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import  { columns } from './columns'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getSpecialty, getAllSpecialties, deleteSpecialty } from '../store'
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

const CustomHeader = ({ data, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
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
          </div>
        </Col>
      </Row>
    </div>
  )
}

const SpecialtiesList = ({ sidebarOpen, setSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.specialties)
  const [sort, setSort] = useState('+')
  // const [selectedId, setSelectedId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  // const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [sortColumn, setSortColumn] = useState('specialty_name')
  // const [currentType, setCurrentType] = useState({ value: '', label: 'Выбирите тип' })

  // const typeOptions = [
  //   { value: '', label: 'Показать все' },
  //   { value: '1', label: 'Food' },
  //   { value: '2', label: 'Beauty' }
  // ]

  // const storeOptions = stores.map((store) => ({
  //   value: String(store.id),
  //   label: store.name
  // }))
  // storeOptions.unshift({ value: '', label: 'Показать все' })

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleClose = () => {
    setSelectedSpecialty('')
    setSidebarOpen(false)
   }
   const handleDel = (event, id) => {
    event.preventDefault()
    dispatch(deleteSpecialty(id))
  }

  // const handleDelSubCategory = (event, id) => {
  //   event.preventDefault()
  //   dispatch(deleteSubCategory(id))
  // }
  const handleEdit = (event, row) => {
    event.preventDefault()
    setSelectedSpecialty(row)
    toggleSidebar()
  }

  // const handleEditSubCategory = (event, row) => {
  //   event.preventDefault()
  //   setSelectedSubCategory(row)
  //   toggleSidebar()
  // }

  useEffect(() => {
    dispatch(getSpecialty({
      ordering: `${sort}${sortColumn}`,
      search: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }))
  }, [])

  const handlePagination = page => {
    dispatch(getSpecialty({
      ordering: `${sort}${sortColumn}`,
      search: searchTerm,
      page: page.selected + 1,
      perPage: rowsPerPage
    }))
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
    dispatch(getSpecialty({
      ordering: `${sort}${sortColumn}`,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(getSpecialty({
      ordering: `${sort}${sortColumn}`,
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
    dispatch(getSpecialty({
      ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
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
        <div className='react-dataTable'>
        <DataTable
            dataKey="id"
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(handleEdit, handleDel)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<h6 className='text-capitalize'>Специальности не найдены</h6>}
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
      <Sidebar open={sidebarOpen} toggleSidebar={handleClose} selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty} />
    </Fragment>
  )
}

export default SpecialtiesList