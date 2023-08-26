import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, deleteStore } from '../store'
import StoreCard from './StoreCard'
import StoresHeader from './StoresHeader'
import StoresSearchbar from './StoresSearchbar'
import StoresFilter from './StoresFilter'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const MySwal = withReactContent(Swal)

const StoreList = props => {
  const { activeView, setActiveView } = props
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores)
  const [sort, setSort] = useState('+')
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [sortColumn, setSortColumn] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [businessType, setBusinessType] = useState({ value: '', label: 'Выбирите бизнес' })

  useEffect(() => {
    dispatch(
      getData({
        ordering: `${sort}${sortColumn}`,
        business_type: businessType.value,
        search: searchTerm, 
        perPage: rowsPerPage, 
        page: currentPage 
      }))
  }, [])

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)
    setRowsPerPage(value)
    dispatch(getData({
      ordering: `${sort}${sortColumn}`,
      business_type: businessType.value,
      search: searchTerm,
      page: 1,
      perPage: value
    }))
  }

  const handleDel = id => {
    return MySwal.fire({
      title: 'Удаление заведения',
      text: "Вы не сможете востановить заведение!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'удалить',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
      
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteStore(id)).then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Удаление заведения',
            text: 'Заведение было удалено',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Отмена удаления',
          text: 'Удаление отменено',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }


  const handleFilter = val => {
    setCurrentPage(1)
    setSearchTerm(val)
    dispatch(getData({
      ordering: `${sort}${sortColumn}`,
      business_type: businessType.value,
      search: val,
      page: currentPage,
      perPage: rowsPerPage
    })) 
  }

  const dataToRender = () => {
    const filters = {
      business_type: businessType.value,
      search: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (stores.data.length > 0) {
      return stores.data
    } else if (stores.data.length === 0 && isFiltered) {
      return []
    } else {
      return []
    }
  }

  // const handleSort = (column, sortDirection) => {
  //   setSort(sortDirection === "asc" ? "+" : "-")
  //   setSortColumn(column.sortField)
  //   dispatch(getData({
  //     ordering: `${sortDirection === "asc" ? "+" : "-"}${sortColumn}`,
  //     business_type: businessType.value,
  //     search: searchTerm,
  //     page: currentPage,
  //     perPage: rowsPerPage
  //   }))
  // }

  const handleChangeBuseness = data => {
    setCurrentPage(1)
    setBusinessType(data)
    dispatch(getData({
      ordering: `${sort}${sortColumn}`,
      business_type: data.value,
      search: searchTerm,
      page: 1,
      perPage: rowsPerPage
    }))
  }
  
  const handlePageChange = val => {
    if (val === 'next' && stores.params.page <= Math.ceil(Number(stores.total) / stores.data.length)) {
      dispatch(getData({ ...stores.params, page: stores.params.page + 1 }))
      setCurrentPage(stores.params.page + 1)
    } else if (val === 'prev' && stores.params.page >= 1) {
      dispatch(getData({ ...stores.params, page: stores.params.page - 1 }))
      setCurrentPage(stores.params.page - 1)
    } else {
      if (val === 'prev' || val === 'next') return
      dispatch(getData({ ...stores.params, page: val }))
      setCurrentPage(val)
    }
  }

  const renderPageItems = () => {
    const arrLength =
      stores.total !== 0 && stores.data.length !== 0 ? Math.ceil(Number(stores.total) / rowsPerPage) : 3

    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href='/' onClick={e => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  const handleNext = () => {
    if (currentPage !== Math.ceil(Number(stores.total) / rowsPerPage)) {
      handlePageChange('next')
    }
  }

  return (
    <div className='content-detached'>
      <div className='content-body'>
      <div className='d-flex align-items-center justify-content-between gap-10'>
        <StoresFilter businessType={businessType} rowsPerPage={rowsPerPage} handlePerPage={handlePerPage} handleChangeBuseness={handleChangeBuseness} />
        <StoresSearchbar handleFilter={handleFilter} />
        <StoresHeader
          activeView={activeView}
          setActiveView={setActiveView}
        />
       </div>
        {stores.data.length ? (
          <Fragment>
            <StoreCard
              handleDel={handleDel}
              activeView={activeView}
              data={dataToRender()}
            />
            <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              <PaginationItem
                disabled={stores.params.page === 1}
                className='prev-item'
                onClick={() => (stores.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                disabled={currentPage === Math.ceil(stores.total / rowsPerPage)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>Информация не найдена</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreList