// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'
import Sidebar from './Sidebar'
// ** Store & Actions
import { getData } from '../store'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

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
  Modal,
  ModalBody, 
  ModalHeader,
  CardBody,
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
            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Добавить
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const TablesList = ({waiters, stores, branches}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { data, total} = useSelector(state => state.tables)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [qrcodeUrl, setQqrcodeUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('date')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleModal = () => setModalShow(!modalShow)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        sort,
        ordering: sortColumn,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        store: currentStore.value
      })
    )
  }, [dispatch, data.length, sort, sortColumn, currentPage])

  const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: 'Показать все' })

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        ordering: sortColumn,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        store: currentStore.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        ordering: sortColumn,
        search: searchTerm,
        perPage: value,
        page: currentPage,
        store: currentStore.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        search: val,
        ordering: sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        store: currentStore.value
      })
    )
  }

  // ** Custom Pagination
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
  
  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      store: currentStore.value,
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
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        ordering: column.sortField,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        store: currentStore.value
      })
    )
  }

  function downloadImg(url) {
    const link = document.createElement('a')
    const filename = url.split('/').pop()
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.setAttribute('target', '_blank')
    link.click()
  }

  return (
    <Fragment>
      <Card>
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
                  dispatch(
                    getData({
                      sort,
                      ordering: sortColumn,
                      search: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      store: data.value
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
            columns={columns(setQqrcodeUrl, toggleModal)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<h6 className='text-capitalize'>Отзывы не найдены</h6>}
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
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} waiters={waiters} branches={branches} />
      <Modal isOpen={modalShow} toggle={toggleModal} className='modal-dialog-centered'>
      <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center'>
            <h1 className='mb-1'>QR-код стола</h1>
          </div>
          <Row>
          <Col>
          <img
          height='400'
          width='400'
          alt='user-avatar'
          src={qrcodeUrl}
          className='img-fluid rounded mb-2'
         />
          </Col>
          </Row>
          <Row>
          <Col className='d-flex justify-content-center align-items-center'> 
            <Button type='button' className='me-1' color='success' onClick={() => downloadImg(qrcodeUrl)}>
            Скачать
            </Button>
            </Col>
            </Row>
          </ ModalBody>
      </Modal>
    </Fragment>
  )
}

export default TablesList