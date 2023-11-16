import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Table from './Table'
import Loading from '../../../../../../@core/components/spinner/Loading'
import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/apps/app-users.scss'

const ProductsList = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  // const stores = useSelector(state => state.stores.allStores)

  // useEffect(() => {
  //   if (!stores.length) dispatch(getAllStores())
  // }, [])

  const handleAdd = () => navigate('/apps/beauty/products/products/add/') 

  return (
    <div className='app-user-list'>
      <Breadcrumbs title={t('Goods')} data={[{ title: t('Goods') }]} onClick={handleAdd} />
      <Table t={t} />
      <Loading />  
    </div>
  )
}

export default ProductsList