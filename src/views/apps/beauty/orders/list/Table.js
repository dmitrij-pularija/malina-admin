import React, { Fragment, useState, useEffect } from 'react'
import CustomHeader from '@components/customHeader'
import { columns } from './columns'
import { getData, deleteOrder } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { selectThemeColors, initSelect } from '@utils'
import { Row, Col, Card, Label, CardBody } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/app-ecommerce.scss'

const OrdersList = ({users, userData, stores, status, t}) => {
const dispatch = useDispatch()
const store = useSelector(state => state.beautyOrders)
const [sort, setSort] = useState('+')
const [searchTerm, setSearchTerm] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [sortColumn, setSortColumn] = useState('-order_date')
const [rowsPerPage, setRowsPerPage] = useState(20)
const [currentStore, setCurrentStore] = useState("")
const [currentStatus, setCurrentStatus] = useState("")
  
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
        perPage: rowsPerPage,
        page: currentPage,
        status: currentStatus ? currentStatus.value : "",
        business_id: userData.type === 2 ? userData.id : currentStore ? currentStore.value : ""
      })
    )
  }, [stores])

  const statusOptions = status.map((stat) => ({
    value: String(stat.id),
    label: stat.statusName
  }))
  statusOptions.unshift({ value: '', label: t('showAll') })

  const handleDel = (event, id) => {
    event.preventDefault()
    dispatch(deleteOrder(id))
  }
  
  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
        page: 1,
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
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
        page: 1,
        perPage: rowsPerPage,
        status: currentStatus ? currentStatus.value : "",
        business_id: currentStore ? currentStore.value : ""
      })
    )
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

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
      status: currentStatus ? currentStatus.value : "",
      business_id: currentStore ? currentStore.value : "",
      search: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data && store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allOrders.slice(0, rowsPerPage)
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
        status: currentStatus.value,
        business_id: currentStore.value
      })
    )
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>{t('Status')}</Label>
              <Select
                isClearable={false}
                value={currentStatus}
                options={statusOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                placeholder={t('statusPlaceholder')}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      status: data.value,
                      business_id: currentStore ? currentStore.value : ""
                    })
                  )
                }}
              />
            </Col>
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
                      page: 1,
                      perPage: rowsPerPage,
                      status: currentStatus ? currentStatus.value : "",
                      business_id: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card id="beauty-orders-list" className='overflow-hidden'>
          <DataTable
            dataKey="id"
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns(stores, users, userData, status, handleDel, t)}
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
    </Fragment>
  )
}

export default OrdersList