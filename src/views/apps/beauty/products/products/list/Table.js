import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomHeader from '@components/customHeader'
import { columns } from './columns'
import { getData, deleteProduct } from '../store'
import { getAllStores } from '../../../../food/stores/store'
import { getAllCategories } from '../../categories/store'
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

const ProductsList = ({t}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector(state => state.auth.userData.id)
  const stores = useSelector(state => state.stores.allStores)
  const categories = useSelector(state => state.beautyProductsCategories.allCategories)
  const { data, total } = useSelector(state => state.productsBeauty)

  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [currentStore, setCurrentStore] = useState({ value: '', label: 'Выбирите заведение' })
  const [currentCategory, setCurrentCategory] = useState("")

  useEffect(() => {
    if (!stores.length) dispatch(getAllStores())
    if (!categories.length) dispatch(getAllCategories())
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        category_id: currentCategory ? currentCategory.value : "",
        supplier_id: store
      })
    )
  }, [])
  
  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))
  storeOptions.unshift({ value: '', label: t('showAll') }) 
  
  const categoryOptions = categories.map(category => ({
    value: String(category.id),
    label: category.category_name
  }))
  categoryOptions.unshift({ value: '', label: t('showAll') }) 

  const handleDelProduct = (event, id) => {
    event.preventDefault()
    dispatch(deleteProduct(id))
  }
  const handleEditProduct = (event, row) => {
    event.preventDefault()
    navigate(`/apps/beauty/products/products/edit/${row.id}/`)
  }

  const handlePagination = page => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        search: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        category_id: currentCategory ? currentCategory.value : "",
        supplier_id: store
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
        category_id: currentCategory ? currentCategory.value : "",
        supplier_id: store
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
        category_id: currentCategory ? currentCategory.value : "",
        supplier_id: store
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
      category_id: currentCategory ? currentCategory.value : "",
      supplier_id: store,
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
        ordering: `${sortDirection === "asc" ? "+" : "-"}${column.sortField}`,
        search: searchTerm,
        page: 1,
        perPage: rowsPerPage,
        category_id: currentCategory ? currentCategory.value : "",
        supplier_id: store
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
                      category_id: currentCategory.value,
                      supplier_id: data.value
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
                options={categoryOptions}
                value={currentCategory}
                placeholder={t('categoryPlaceholder')}
                onChange={data => {
                  setCurrentCategory(data)
                  setCurrentPage(1)
                  dispatch(
                    getData({
                      ordering: `${sort}${sortColumn}`,
                      search: searchTerm,
                      page: 1,
                      perPage: rowsPerPage,
                      category_id: data.value,
                      supplier_id: store
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
            columns={columns(categories, handleEditProduct, handleDelProduct, t)}
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

export default ProductsList
