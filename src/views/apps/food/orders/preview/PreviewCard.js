// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table, Badge } from 'reactstrap'
import { formatData, formatTime, formatNumber } from '../../../../../utility/Utils'
import { statusObj, paymentType, orderType } from '../../../../../configs/initial'

import Avatar from '@components/avatar'
import Logo2 from '@components/logo2'

const renderClient = client => {
  if (client.avatar) {
    return <Avatar size='xl' className='me-1' img={client.avatar} />
  } else {
    return (
      <Avatar
        initials
        size='xl'
        className='me-1'
        color={'light-primary'}
        content={client.name || 'Гость'}
      />
    )
  }
}
const renderTable = carts => {
 let i = 0
    return (
      <Table responsive hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Блюдо</th>
          <th>Цена</th>
          <th>цена со скидкой</th>
          <th>Количество</th>
          <th>Добавки</th>
          <th>Стоимость добавок</th>
          <th>Итого</th>
        </tr>
      </thead>
      <tbody> 
      {carts.map(({ id, item, quantity, total, total_price, addedadditives, totaladditiveprice }) => (
        <tr key={id}>
        <td className='center'>{++i}</td>
          <td className='text-nowrap'>
            <img className='me-75' src={item.images[0].image} alt={item.name} height='40' width='40' />
            <span className='align-middle fw-bold order-dish-name'>{item.name}</span>
          </td>
          <td className='right'>{item.cost}</td>
          <td className='right'>{total}</td>
          <td className='center'>{quantity}</td>
          <td className='center'>{addedadditives.length}</td>
          <td className='right'>{totaladditiveprice}</td>
          <td className='right'>{total_price}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    )
  
}

const PreviewCard = ({ data }) => {
  if (!data) return 
  const carts = data.cart[0].listitem
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
            <Logo2 src={data.storeId.image} size={"xl"} />  
              <h3 className='text-primary'>{data.storeId.name}</h3>
            </div>
            <CardText className='mb-25'>{data.storeId.storeaddress.city}</CardText>
            <CardText className='mb-25'>{data.storeId.storeaddress.name}</CardText>
            <CardText className='mb-0'>{data.storeId.phone}</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Заказ №<span className='invoice-number'>{data.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Дата заказа:</p>
              <p className='invoice-date'>{formatData(data.date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Время:</p>
              <p className='invoice-date'>{formatTime(data.date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Тип заказа:</p>
              <p className='invoice-date'>{orderType[data.ordertype]}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Статус:</p>
              <p className='invoice-date'>
              <Badge className='text-capitalize' color={statusObj[data.status.toString()].colorName} pill>
              {statusObj[data.status.toString()].label}
              </Badge>  
              </p>
            </div>
          </div>
        </div>
      </CardBody>

      <hr className='invoice-spacing' />

      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <h6 className='mb-2'>Адрес:</h6>
            <CardText className='mb-25'><span className='invoice-date-title'>Город: </span><span className='invoice-date'>{data.address ? data.address.city : ""}</span></CardText>
            <CardText className='mb-25'><span className='invoice-date-title'>Улица: </span><span className='invoice-date'>{data.address ? data.address.street : ""}</span></CardText>
            <CardText className='mb-25'><span className='invoice-date-title'>Название: </span><span className='invoice-date'>{data.address ? data.address.name : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Дом: </span><span className='invoice-date'>{data.address ? data.address.numhouse : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Подьезд: </span><span className='invoice-date'>{data.address ? data.address.entrance : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Этаж: </span><span className='invoice-date'>{data.address ? data.address.floor : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Телефон для контакта: </span><span className='invoice-date'>{data.address ? data.address.phone : ""}</span></CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Клиент:</h6>
            <div className='order-avatar'>
            {renderClient(data.clientId)}
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Имя:</p>
              <p className='invoice-date'>{data.clientId.name} {data.clientId.surname}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Телефон:</p>
              <p className='invoice-date'>{data.clientId.login}</p>
            </div>
          </Col>
        </Row>
        <Row className='invoice-spacing'>
        <Col className='p-0 mt-xl-0 mt-2' xl='8'> 
            <div className='order-comments'>
              <p className='invoice-date-title'>Время доставки:</p>
              <p className='invoice-date'>{data.timedelivery ? formatTime(data.timedelivery) : ""}</p>
            </div>
            <div className='order-comments'>
              <p className='invoice-date-title'>Комментарий:</p>
              <p className='invoice-date'>{data.commen}</p>
            </div>      
        </Col>
        </Row>
      <Row className='invoice-sales-total-wrapper'>
      <h6 className='mb-2'>Состав заказа:</h6>
     {renderTable(carts)}
     </Row>
    </CardBody>
      <hr className='invoice-spacing' />
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
              <div className='mt-md-0 mt-2'>
              <h6 className='mb-2'>Оплата:</h6>
              <div className='invoice-date-wrapper text-nowrap'>
                <p className='invoice-date fw-bold'>Вид оплаты:</p>
                <p className='invoice-date'>{paymentType[data.paymentType]}</p>
              </div>
              <div className='invoice-date-wrapper text-nowrap'>
                <p className='invoice-date fw-bold'>Статус оплаты:</p>
                <p className='invoice-date'>{data.paymentStatus ? "Оплачен" : "Не оплачен"}</p>
              </div>
              </div>
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
          <table>
              <tbody>
              <tr>
                  <td className='pe-1'>Итого (c):</td>
                  <td className='right'>{formatNumber(data.totalprice)}</td>
              </tr>
              <tr>
                  <td className='pe-1'>В том числе:</td>
              </tr>
                <tr>
                  <td className='pe-1'>Стоимость доставки (c):</td>
                  <td className='right'>{formatNumber(data.orderdelivery_cost)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Стоимость обслуживания (c):</td>
                  <td className='right'>{formatNumber(data.totalservice)}</td>
                </tr>

                <tr>
                  <td className='pe-1'>Баллов списано:</td>
                  <td className='right'>{data.scorepaid}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Баллов начислено:</td>
                  <td className='right'>{data.scoregot}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      <CardBody className='invoice-padding pb-0'>
      <Row>
          {/* <Col sm='12'>
            <span className='fw-bold'>Комментарий исполнителя: </span>
            <span>{data.comment}</span>
          </Col> */}
        </Row>
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
