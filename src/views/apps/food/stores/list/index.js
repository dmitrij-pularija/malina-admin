// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// ** Shop Components
// import Sidebar from './Sidebar'
import StoreList from './StoreList'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux'
// import { getData } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Stores = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Vars
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const stores = useSelector(state => state.stores)

  // useEffect(() => {
  //   dispatch(
  //     getData({
  //       perPage: 100,
  //       page: 1
  //     })
  //   )
  // }, [dispatch])

  const handleAdd = () => navigate('/apps/food/stores/add/') 

  return (
    <Fragment>
      <Breadcrumbs title='Заведения' data={[{ title: 'Структура' }, { title: 'Заведения' }]} onClick={handleAdd} />
      <StoreList
        activeView={activeView}
        setActiveView={setActiveView}
      />
    </Fragment>
  )
}
export default Stores
