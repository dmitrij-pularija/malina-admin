// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import StoreList from './StoreList'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Stores = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores)


  // ** Get products
  useEffect(() => {
    dispatch(
      getData({
        perPage: 20,
        page: 1
      })
    )
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='Заведения' data={[{ title: 'Структура' }, { title: 'Заведения' }]} />
      <StoreList
        stores={stores}
        dispatch={dispatch}
        activeView={activeView}
        sidebarOpen={sidebarOpen}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
      />
      {/* <Sidebar sidebarOpen={sidebarOpen} /> */}
    </Fragment>
  )
}
export default Stores
