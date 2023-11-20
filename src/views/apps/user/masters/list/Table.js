import { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
import { columns } from './columns'
import { getMasters, deleteMaster } from '../store'
import { getAllStores } from '../../../food/stores/store'
import { getAllSpecialties } from '../../../beauty/specialties/store'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { selectThemeColors } from '@utils'
import MasterModal from '../view/Modal'
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

const initStore = (value, stores) => {
if (value && stores) {
  const filtredStore = stores.find(store => parseInt(store.id) === parseInt(value)) || ''
return { value, label: filtredStore.name }
} else return { value: '', label: 'Выберите заведение' }
}

const MastersList = ({ modalOpen, toggleModal, t }) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.masters)
  const stores = useSelector(state => state.stores.allStores)
  const { userData } = useSelector(state => state.auth)
  const specialties = useSelector(state => state.specialties.allSpecialties)
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  // const [shifts, setShifts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('master_name')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedMaster, setSelectedMaster] = useState('')
  const [store, setStore] = useState("")
  const [specialty, setSpecialty] = useState("")
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // const handleClose = () => {
  //   setSelectedWaiter('')
  //   setSidebarOpen(false)
  //  }
// console.log(store.value) 

   useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!specialties.length) dispatch(getAllSpecialties())
    if (stores.length && userData) {
    if (userData.type === 2) setStore(userData.type === 2 && initStore(userData.id, stores))
    dispatch(
      getMasters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        master_specialty_id: specialty ? specialty.value : "",
        master_business: userData.type === 2 ? userData.id : store ? store.value : ""
      })
    )
    }
  }, [stores.length]) 
 
  // useEffect(() => {
  //   dispatch(
  //     getWaiters({
  //       ordering: `${sort}${sortColumn}`,
  //       search: searchTerm,
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       business_id__id: store.value
  //     })
  //   )
  // }, [dispatch, data.length, sort, sortColumn, currentPage])
  
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
}))
storeOptions.unshift({ value: '', label: t('showAll') })

const specialtyOptions = specialties.map(specialty => ({
  value: String(specialty.id),
  label: specialty.specialty_name
}))
specialtyOptions.unshift({ value: '', label: t('showAll') })
 
const handleDel = (event, id) => {
  event.preventDefault()
  dispatch(deleteMaster(id))
}
const handleEdit = (event, row) => {
  event.preventDefault()
  setSelectedMaster(row)
  toggleModal()
}

  const handlePagination = page => {
    dispatch(
      getMasters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        master_specialty_id: specialty ? specialty.value : "",
        master_business: store ? store.value : ""
      })
    )
    setCurrentPage(page.selected + 1)
  }
 
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getMasters({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: value,
        page: 1,
        master_specialty_id: specialty ? specialty.value : "",
        master_business: store ? store.value : ""
      })
    )
    setRowsPerPage(value)
  }
 
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getMasters({
        search: val,
        ordering: `${sort}${sortColumn}`,
        page: 1,
        perPage: rowsPerPage,
        master_specialty_id: specialty ? specialty.value : "",
        master_business: store ? store.value : ""
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
      master_specialty_id: specialty ? specialty.value : "",
      master_business: store ? store.value : "",
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
      getMasters({
        ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
        search: searchTerm,
        page: 1,
        perPage: rowsPerPage,
        master_specialty_id: specialty ? specialty.value : "",
        master_business: store ? store.value : ""
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
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={store}
                placeholder={t('selectStore')}
                onChange={data => {
                  setStore(data)
                  setCurrentPage(1)
                  dispatch(
                    getMasters({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      master_specialty_id: specialty ? specialty.value : "",
                      master_business: data.value
                    })
                  )
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('Specialty')}</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={specialtyOptions}
                value={specialty}
                placeholder={t('SpecialtyPlaceholder')}
                onChange={data => {
                  setSpecialty(data)
                  setCurrentPage(1)
                  dispatch(
                    getMasters({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      master_specialty_id: data.value,
                      master_business: store ? store.value : ""
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(stores, handleEdit, handleDel, userData, t)}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable min-table-height'
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
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} stores={stores} specialties={specialties} /> */}
      <MasterModal userData={userData} specialties={specialties} stores={stores} open={modalOpen} toggleModal={toggleModal} selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} t={t} />
    </Fragment>
  )
}

export default MastersList
