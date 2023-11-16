import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomHeader from '@components/customHeader'
import ServicesModal from './Modal'
import { columns } from './columns'
import { getData, deleteService } from '../store'
import { useDispatch, useSelector } from 'react-redux'
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

const ServicesList = ({store, stores, masters, categories, modalOpen, toggleModal, t }) => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { data, total } = useSelector(state => state.services)

  // ** States
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('beauty_service_name')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  // const [currentRole, setCurrentRole] = useState({ value: '', label: 'Выберите роль' })
  // const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  const [currentSpecialty, setCurrentSpecialty] = useState("")
  const [currentMaster, setCurrentMaster] = useState("")
  // const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Выбирете статус' })
// console.log(data)
  // ** Function to toggle sidebar
  // const toggleModal = () => setModalOpen(!modalOpen)
// console.log(data)
  // ** Get data on mount
  useEffect(() => {
    // if (!stores.length) dispatch(getAllStores())
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: store,
        master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
      })
    )
  }, [])
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') }) 
  
  const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 
  const masterOptions = filtredMasters.map(master => ({
    value: String(master.id),
    label: master.master_name ? `${master.master_name} ${master.surname ? master.surname : ''}` : master.login
  }))
  masterOptions.unshift({ value: '', label: t('showAll') }) 
  
  const filtredSpecialty = categories.filter(category => parseInt(category.business.id) === parseInt(store)) 
  const specialtyOptions = filtredSpecialty.map(category => ({
    value: String(category.id),
    label: category.category_name
  }))
  specialtyOptions.unshift({ value: '', label: t('showAll') }) 
  // ** User filter options
  //  const typeOptions = [
  //   { value: '', label: 'Показать все' },
  //   { value: 'user', label: 'Пользователь' },
  //   { value: 'customer', label: 'Клиент' },
  //   { value: 'guest', label: 'Гость' }
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

  const handleDel = (event, id) => {
    event.preventDefault()
    dispatch(deleteService(id))
  }
  const handleEdit = (event, row) => {
    event.preventDefault()
    setSelectedService(row)
    toggleModal()
    // setSelectedProduct(row)
    // navigate(`/apps/food/products/products/edit/${row.id}/`)
  }

  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        business_id: store,
        master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
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
        business_id: store,
        master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
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
        business_id: store,
        master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
      })
    )
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
      business_id: store,
      master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : "",
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
      // return store.allData.slice(0, rowsPerPage)
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
        business_id: store,
        master_id: currentMaster ? currentMaster.value : "",
        master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
      })
    )
  }
 
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            {/* <Col className='my-md-0 my-1' md='4'>
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
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      business_id: data.value,
                      master_id: currentMaster.value,
                      master_specialty_id: currentSpecialty.value
                    })
                  )
                }}
              />
            </Col> */}
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('Category')}</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={specialtyOptions}
                value={currentSpecialty}
                placeholder={t('categoryPlaceholder')}
                onChange={data => {
                  setCurrentSpecialty(data)
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      business_id: store,
                      master_id: currentMaster ? currentMaster.value : "",
                      master_specialty_id: data.value
                    })
                  )
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('Master')}</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={masterOptions}
                value={currentMaster}
                placeholder={t('masterPlaceholder')}
                onChange={data => {
                  setCurrentMaster(data)
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      business_id: store,
                      master_id: data.value,
                      master_specialty_id: currentSpecialty ? currentSpecialty.value : ""
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
            columns={columns(masters, handleEdit, handleDel, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
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
              />
            }
          />
        </div>
      </Card>
      <ServicesModal masters={masters} store={store} stores={stores} categories={categories} open={modalOpen} toggleModal={toggleModal} selectedService={selectedService} setSelectedService={setSelectedService} t={t}/>
    </Fragment>
  )
}

export default ServicesList
