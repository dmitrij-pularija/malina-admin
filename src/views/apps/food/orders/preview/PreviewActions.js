import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, toggleSidebar, handleDelOrder, t }) => {
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
      setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
      {userData && userData.type === 2 &&  
        <Button color='primary' block className='mb-75' onClick={toggleSidebar}>
          {t('changeStatus')}
        </Button>}
      {userData && userData.type === 2 &&  
        <Button tag={Link} to={`/apps/food/orders/edit/${id}`} color='success' block className='mb-75'>
          {t('edit')}
        </Button>}
      {userData && userData.type === 2 &&  
        <Button color='danger' block className='mb-75' onClick={() => handleDelOrder(id)}>
          {t('delete')}
        </Button>}
        {/* <Button color='secondary' tag={Link} to={`/apps/food/orders/rev/${id}`} target='_blank' block outline className='mb-75'>
          Отзывы
        </Button>
        <Button color='secondary' tag={Link} to={`/apps/food/orders/hist/${id}`} target='_blank' block outline className='mb-75'>
          История заказа
        </Button>
        <Button color='secondary' tag={Link} to={`/apps/food/orders/map/${id}`} target='_blank' block outline className='mb-75'>
          Посмотреть на карте
        </Button>
        <Button color='secondary' block outline className='mb-75'>
          Загрузить
        </Button>
        <Button color='secondary' tag={Link} to='/apps/food/orders/print' target='_blank' block outline className='mb-75'>
          Распечатать
        </Button> */}
        <Button color='secondary' tag={Link} to='/apps/food/orders/list' block outline className='mb-75'>
        {t('cancel')}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
