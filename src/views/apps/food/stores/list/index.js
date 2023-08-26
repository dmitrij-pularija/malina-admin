import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreList from './StoreList'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-ecommerce.scss'

const Stores = () => {
  const [activeView, setActiveView] = useState('grid')
  const navigate = useNavigate()
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