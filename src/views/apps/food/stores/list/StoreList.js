// ** React Imports
import { Fragment } from 'react'

// ** Product components
import StoreCard from './StoreCard'
// import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const StoreList = props => {
  // ** Props
  const {
    stores,
    dispatch,
    activeView,
    sidebarOpen,
    setActiveView,
    setSidebarOpen
  } = props

  // ** Handles pagination
  const handlePageChange = val => {
    // if (val === 'next') {
    //   dispatch(getProducts({ ...stores.params, page: stores.params.page + 1 }))
    // } else if (val === 'prev') {
    //   dispatch(getProducts({ ...stores.params, page: stores.params.page - 1 }))
    // } else {
    //   dispatch(getProducts({ ...stores.params, page: val }))
    // }
  }

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      stores.total !== 0 && stores.data.length !== 0 ? Number(stores.total) / stores.data.length : 3

    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={stores.params.page === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href='/' onClick={e => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  // ** handle next page click
  const handleNext = () => {
    if (stores.params.page !== Number(stores.total) / stores.data.length) {
      handlePageChange('next')
    }
  }

  return (
    <div className='content-detached'>
      <div className='content-body'>
        {/* <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        /> */}
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar dispatch={dispatch} stores={stores} />
        {stores.data.length ? (
          <Fragment>
            <StoreCard
              stores={stores}
              dispatch={dispatch}
              activeView={activeView}
              data={stores.data}
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
                disabled={stores.params.page === Number(stores.total) / stores.data.length}
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
