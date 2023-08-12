import { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import  { columns } from './columns'
import { getCategories, getSubCategories, deleteCategory, deleteSubCategory } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus} from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ data, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
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
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
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
  const dispatch = useDispatch()
  const { data, subcategories } = useSelector(state => state.categories)
  const total = data.length
  const [selectedId, setSelectedId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const handleClose = () => {
    setSelectedCategory('')
    setSelectedSubCategory('')
    setSidebarOpen(false)
   }
   const handleDelCategory = (event, id) => {
    event.preventDefault()
    dispatch(deleteCategory(id))
  }

  const handleDelSubCategory = (event, id) => {
    event.preventDefault()
    dispatch(deleteSubCategory(id))
  }
  const handleEditCategory = (event, row) => {
    event.preventDefault()
    setSelectedCategory(row)
    toggleSidebar()
  }

  const handleEditSubCategory = (event, row) => {
    event.preventDefault()
    setSelectedSubCategory(row)
    toggleSidebar()
  }

  useEffect(() => {
    dispatch(getCategories({
      search: searchTerm,
      page: currentPage,
      perPage: rowsPerPage
    }))
    dispatch(getSubCategories())
  }, [dispatch, data.length, currentPage])

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getCategories({
        search: val,
        page: currentPage,
        perPage: rowsPerPage
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

  const ExpandableTable = ({data: { id }}) => {
    const subcategory = subcategories.filter(({ category }) => category === id)
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
    columns={columns("subcategory", handleEditCategory, handleEditSubCategory, handleDelCategory, handleDelSubCategory)}
    sortIcon={<ChevronDown />}
    className='react-dataTable ml-50'
    />
  }

  return (
    <Fragment>
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
            columns={columns("category", handleEditCategory, handleEditSubCategory, handleDelCategory, handleDelSubCategory)}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            expandableRowsComponent={ExpandableTable}
            onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
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
      <Sidebar selectedId={selectedId} open={sidebarOpen} toggleSidebar={handleClose} categories={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedSubCategory={selectedSubCategory} setSelectedSubCategory={setSelectedSubCategory}/>
    </Fragment>
  )
}

export default CategoriesList