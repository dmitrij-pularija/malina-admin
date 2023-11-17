import { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
import UsersListModal from './Modal'

import { columns } from './columns'
import { getData, getAllCount, deleteUser } from '../store'
import { useDispatch, useSelector } from 'react-redux'
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

const UsersList = ({modalOpen, toggleModal, t}) => {
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.users)

  // ** States
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  // const [currentRole, setCurrentRole] = useState({ value: '', label: 'Выберите роль' })
  const [currentType, setCurrentType] = useState("")
  // const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Выбирете статус' })

  // ** Function to toggle sidebar
  // const toggleModal = () => setModalOpen(!modalOpen)
// console.log(data)
  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllCount())
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        user_type: currentType ? currentType.value : ""
      })
    )
  }, [])

  // ** User filter options
   const typeOptions = [
    { value: '', label: t('showAll') },
    { value: 'user', label: t('Users') },
    { value: 'customer', label: t('Customers') },
    { value: 'guest', label: t('Guests') }
  ] 
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

  const handleDelUser = (event, id) => {
    event.preventDefault()
    dispatch(deleteUser(id))
  }
  const handleEditUser = (event, row) => {
    event.preventDefault()
    setSelectedUser(row)
    toggleModal()
  }

  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        user_type: currentType ? currentType.value : ""
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
        user_type: currentType ? currentType.value : ""
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
        user_type: currentType ? currentType.value : ""
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
      user_type: currentType ? currentType.value : "",
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
        user_type: currentType ? currentType.value : ""
      })
    )
  }
 
  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>{t('type')}</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={typeOptions}
                value={currentType}
                placeholder={t('typePlaceholder')}
                onChange={data => {
                  setCurrentType(data)
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      user_type: data.value
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
            columns={columns(handleEditUser, handleDelUser, t)}
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
                toggleModal={toggleModal}
              />
            }
          />
      </Card>
      <UsersListModal open={modalOpen} toggleModal={toggleModal} selectedUser={selectedUser} t={t} />
    </Fragment>
  )
}

export default UsersList
