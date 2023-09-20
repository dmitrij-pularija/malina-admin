// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, toggleSidebar, handleDelOrder}) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        <Button color='primary' block className='mb-75' onClick={toggleSidebar}>
          Изменить статус
        </Button>
        <Button tag={Link} to={`/apps/food/orders/edit/${id}`} color='success' block className='mb-75'>
          Редактировать
        </Button>
        <Button color='danger' block className='mb-75' onClick={() => handleDelOrder(id)}>
          Удалить
        </Button>
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
          Отмена
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
