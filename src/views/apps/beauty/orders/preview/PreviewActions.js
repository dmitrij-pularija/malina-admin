import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, toggleSidebar, handleDelOrder}) => {
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
      setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])

  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        {userData && userData.type === 2 && 
        <Button color='primary' block className='mb-75' onClick={toggleSidebar}>
          Изменить статус
        </Button>}
        {userData && userData.type === 2 && 
        <Button tag={Link} to={`/apps/beauty/orders/edit/${id}`} color='success' block className='mb-75'>
          Редактировать
        </Button>}
        {userData && userData.type === 2 && 
        <Button color='danger' block className='mb-75' onClick={() => handleDelOrder(id)}>
          Удалить
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
        <Button color='secondary' tag={Link} to='/apps/beauty/orders/list' block outline className='mb-75'>
          Отмена
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
