// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomHeader from '@components/customHeader'
// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getData } from '../store'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors, initSelect } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
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

const RatingOrdersList = ({userData, users, stores, t}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { data, total} = useSelector(state => state.ratingBeautyOrders)

  // ** States
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('date')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [currentStore, setCurrentStore] = useState("")
 
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') })

  useEffect(() => {
    if (userData.type === 2 && stores.length) setCurrentStore(userData.type === 2 && initSelect(storeOptions, userData.id))
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: userData.type === 2 ? userData.id : currentStore ? currentStore.value : ""
      })
    )
  }, [stores.length])


  // const mastersOptions = masters.map(master => ({
  //   value: String(master.id),
  //   label: `${master.master_name ? master.master_name : ''} ${master.surname ? master.surname : ''}`
  // }))
  // mastersOptions.unshift({ value: '', label: 'Показать все' })

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        business_id: currentStore ? currentStore.value : ""
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
        page: currentPage,
        business_id: currentStore ? currentStore.value : ""
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
        page: currentPage,
        perPage: rowsPerPage,
        business_id: currentStore ? currentStore.value : ""
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
      business_id: currentStore ? currentStore.value : "",
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
        ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        business_id: currentStore ? currentStore.value : ""
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
                value={currentStore}
                placeholder={t('selectStore')}
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
      </Card>

      <Card className='overflow-hidden'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(users, stores, userData, t)}
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
      </Card>
    </Fragment>
  )
}

export default RatingOrdersList