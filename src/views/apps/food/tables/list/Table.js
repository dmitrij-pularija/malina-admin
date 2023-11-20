import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columns } from './columns'
import Sidebar from './Sidebar'
import { deleteTable, getData } from '../store'
import CustomHeader from '@components/customHeader'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { selectThemeColors } from '@utils'
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
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-ecommerce.scss'

const TablesList = ({waiters, store, sidebarOpen, toggleSidebar, t }) => {
  const dispatch = useDispatch()
  const { data, total} = useSelector(state => state.tables)
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [qrcodeUrl, setQqrcodeUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('date')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [currentStore, setCurrentStore] = useState({ value: '', label: t('selectStore') })
  const [selectedTable, setSelectedTable] = useState('')

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleModal = () => setModalShow(!modalShow)
  const handleClose = () => {
    setSelectedTable('')  
    toggleSidebar()
   }
  const handleDel = (event, id) => {
    event.preventDefault()
    dispatch(deleteTable(id))
  }
  const handleEdit = (event, row) => {
    event.preventDefault()
    setSelectedTable(row)
    toggleSidebar()
  }
   
  useEffect(() => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: store
      })
    )
  }, [])

  // const filtredStore = stores.filter(store => parseInt(store.business_type) === 1) 
  // const storeOptions = filtredStore.map((store) => ({
  //   value: String(store.id),
  //   label: store.name
  // }))
  // storeOptions.unshift({ value: '', label: 'Показать все' })

  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        business_id: store
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: value,
        page: currentPage,
        business_id: store
      })
    )
    setRowsPerPage(value)
  }

  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        search: val,
        ordering: `${sort}${sortColumn}`,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: store
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
      business_id: store,
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
      getData({
        ordering: `${sort}${column.sortField}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: store
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
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      business_id: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className='overflow-hidden'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(downloadImg, setQqrcodeUrl, toggleModal, handleDel, handleEdit, t)}
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
              />
            }
          />
      </Card>
      <Sidebar store={store} open={sidebarOpen} toggleSidebar={handleClose} waiters={waiters} selectedTable={selectedTable} setSelectedTable={setSelectedTable} t={t} />
      <Modal isOpen={modalShow} toggle={toggleModal} className='modal-dialog-centered'>
      <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center'>
            <h1 className='mb-1'>{t('tablesData.qr')}</h1>
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
            {t('download')}
            </Button>
            </Col>
            </Row>
          </ ModalBody>
      </Modal>
    </Fragment>
  )
}

export default TablesList