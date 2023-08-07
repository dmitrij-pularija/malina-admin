// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Label } from 'reactstrap'
import Select from 'react-select'
// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { selectThemeColors } from '@utils'

const storeOptions = [
  { value: '', label: 'Показать все' },
  { value: '189', label: 'MALINA ECO FOOD' },
  { value: '236', label: 'Chicken Crispy' }
] 

const CustomHeader = ({ handleFilter, value, handleStoreValue, store, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Показать</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Input>
          </div>
          <Label for='plan-select'>Заведение</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={store}
                onChange={data => handleStoreValue(data)}
              />
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Поиск</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Invoice'
            />
          </div>
          <Button tag={Link} to='/apps/invoice/add' color='primary'>
            Добавить
          </Button>  
        </Col>
      </Row>
    </div>
  )
}

const TableList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const { data, total } = useSelector(state => state.tables)
  // const store = useSelector(state => state.invoice)

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [store, setStore] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)

  // console.log(data)

  useEffect(() => {
    dispatch(
      getData({
        sort,
        search: value,
        ordering: sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        store: store.value
      })
    )
  }, [dispatch, data.length])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        sort,
        search: val,
        ordering: sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        store: store.value
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        sort,
        search: value,
        ordering: sortColumn,
        page: currentPage,
        store: store.value,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStoreValue = data => {
    setStore(data)
    dispatch(
      getData({
        sort,
        search: value,
        ordering: sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        store: data.value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        search: value,
        ordering: sortColumn,
        store: store.value,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage))
    // const count = Number(total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      search: value,
      store
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
        search: value,
        page: currentPage,
        sort: sortDirection,
        store: store.value,
        perPage: rowsPerPage,
        ordering: column.sortField
      })
    )
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                store={store}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStoreValue={handleStoreValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default TableList
