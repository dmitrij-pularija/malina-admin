// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table, Badge } from 'reactstrap'
import { statusObj, paymentType, orderType } from '../../../../../configs/initial'
import { formatData, formatTime, formatNumber, formatStringTime } from '@utils'
import Avatar from '@components/avatar'
import TableCards from './TableCards'

// const renderClient = () => {
//   if (client.avatar) {
//     return <Avatar size='xl' className='me-1' img={client.avatar} />
//   } else {
//     return (
//       <Avatar
//         initials
//         size='xl'
//         className='me-1'
//         color={'light-primary'}
//         content={client.name || 'Гость'}
//       />
//     )
//   }
// }

const renderImg = (avatar, name) => {
  if (avatar && avatar.includes("http")) {
    return (
      <img
        height=''
        width='100'
        alt='user-avatar'
        src={avatar}
        className='img-fluid rounded'
        style={{
          height: '100px',
          width: '100px'
        }}
      />
    )
  } else {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded'
        content={name ? name : "Malina"}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(42px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '100px',
          width: '100px'
        }}
      />
    )
  }
}


// const renderTable = carts => {
//  let i = 0
//     return (
//       <Table responsive hover>
//       <thead>
//         <tr>
//           <th>№</th>
//           <th>Блюдо</th>
//           <th>Цена</th>
//           <th>цена со скидкой</th>
//           <th>Количество</th>
//           <th>Добавки</th>
//           <th>Стоимость добавок</th>
//           <th>Итого</th>
//         </tr>
//       </thead>
//       <tbody> 
//       {carts.map(({ id, product, quantity, total_price, product_addons, total_addon_price }) => (
//         <tr key={id}>
//         <td className='center'>{++i}</td>
//           <td className='text-nowrap'>
//             {product.images.length ? <img className='me-75' src={product.images[0].image} alt={product.name} height='40' width='40' /> : ''}
//             <span className='align-middle fw-bold order-dish-name'>{product.name}</span>
//           </td>
//           <td className='right'>{product.cost}</td>
//           <td className='right'>{product.sale_cost}</td>
//           <td className='center'>{quantity}</td>
//           <td className='center'>{product_addons.length}</td>
//           <td className='right'>{total_addon_price}</td>
//           <td className='right'>{total_price}</td>
//         </tr>
//       ))}
//       </tbody>
//     </Table>
//     )
  
// }

const PreviewCard = ({ data, t }) => {
  // console.log(data)
  if (!data) return 
  const carts = data.order_cart.length ? data.order_cart[0].products_list : []

  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding mt-1 mb-1'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper gap-10'>
            {renderImg(data.business_id.avatar, data.business_id.name)}  
            {/* <Logo2 src={data.business_id.image} size={"xl"} />   */}
              <h3 className='text-primary'>{data.business_id.name ? data.business_id.name : data.business_id.login}</h3>
            </div>
            <CardText className='mb-25'>{data.business_id.business_address.city}</CardText>
            <CardText className='mb-25'>{data.business_id.business_address.name}</CardText>
            <CardText className='mb-0'>{data.business_id.phone}</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
            {t('ordersData.previewTitle1')}<span className='invoice-number'>{data.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewTitle2')}</p>
              <p className='invoice-date'>{formatData(data.order_date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewTitle3')}</p>
              <p className='invoice-date'>{formatTime(data.order_date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewTitle4')}</p>
              <p className='invoice-date'>{orderType[data.order_type]}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewTitle5')}</p>
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
            <h6 className='mb-2'>{t('ordersData.previewDeliveryAddress')}</h6>
            <CardText className='mb-1'><span className='invoice-date'>{data.delivery_address ? data.delivery_address.location ? data.delivery_address.location : data.delivery_address.name : "В нутри заведения" }</span></CardText>
            <div className='order-comments'>
              {data.time_delivery ? <p className='invoice-date-title'>{t('ordersData.previewDeliveryRequestedTime')}</p> : ''}
              <p className='invoice-date'>{data.time_delivery ? `${data.time_delivery} ${t('ordersData.previewDeliveryTime1')}` : ""}</p>
            </div>
            <div className='order-comments'>
              {data.requested_delivery_time ? <p className='invoice-date-title'>{t('ordersData.previewDeliveryTime')}</p> : ''}
              <p className='invoice-date'>{data.requested_delivery_time ? formatStringTime(data.requested_delivery_time) : ""}</p>
            </div>
            <div className='order-comments'>
              {data.comment ? <p className='invoice-date-title'>{t('ordersData.previewComment')}</p> : ''}
              <p className='invoice-date'>{data.comment ? data.comment : ''}</p>
            </div>  
            {/* <CardText className='mb-25'><span className='invoice-date-title'>Город: </span><span className='invoice-date'>{data.address ? data.address.city : ""}</span></CardText>
            <CardText className='mb-25'><span className='invoice-date-title'>Улица: </span><span className='invoice-date'>{data.address ? data.address.street : ""}</span></CardText>
            <CardText className='mb-25'><span className='invoice-date-title'>Название: </span><span className='invoice-date'>{data.address ? data.address.name : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Дом: </span><span className='invoice-date'>{data.address ? data.address.numhouse : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Подьезд: </span><span className='invoice-date'>{data.address ? data.address.entrance : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Этаж: </span><span className='invoice-date'>{data.address ? data.address.floor : ""}</span></CardText>
            <CardText className='mb-0'><span className='invoice-date-title'>Телефон для контакта: </span><span className='invoice-date'>{data.address ? data.address.phone : ""}</span></CardText> */}
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>  
            <h6 className='mb-2'>{t('ordersData.previewCustomer')}</h6>
            <div className='order-avatar'>
            {renderImg(data.user_id ? data.user_id.avatar : "", data.user_id && data.user_id.name ? `${data.user_id.name} ${data.user_id.surname}` : 'Клиент')}
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewCustomerName')}</p>
              <p className='invoice-date'>{data.user_id && data.user_id.name ? `${data.user_id.name ? data.user_id.name : ''} ${data.user_id.surname ? data.user_id.surname : ''}` : t('notSpecified')}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>{t('ordersData.previewCustomerPhone')}</p>
              <p className='invoice-date'>{data.user_id && data.user_id.login ? data.user_id.login : t('notSpecified') }</p>
            </div>
          </Col>
        </Row>
        <Row className='invoice-spacing'>
        {/* <Col className='p-0 mt-xl-0 mt-2' xl='8'> 
            <div className='order-comments'>
              <p className='invoice-date-title'>Время доставки:</p>
              <p className='invoice-date'>{data.time_delivery ? formatTime(data.time_delivery) : ""}</p>
            </div>
            <div className='order-comments'>
              <p className='invoice-date-title'>Комментарий:</p>
              <p className='invoice-date'>{data.comment ? data.comment : ''}</p>
            </div>      
        </Col> */}
        </Row>
      <Row className='invoice-sales-total-wrapper'>
      <h6 className='mb-2'>{t('ordersData.previewOrder')}</h6>
     {/* {renderTable(carts)} */}
     <TableCards data={carts} t={t} />
     </Row>
    </CardBody>
      <hr className='invoice-spacing' />
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
              <div className='mt-md-0 mt-2'>
              <h6 className='mb-2'>{t('ordersData.previewPayment')}</h6>
              <div className='invoice-date-wrapper text-nowrap'>
                <p className='invoice-date fw-bold'>{t('ordersData.previewPaymentType')}</p>
                <p className='invoice-date'>{paymentType[data.payment_type]}</p>
              </div>
              <div className='invoice-date-wrapper text-nowrap'>
                <p className='invoice-date fw-bold'>{t('ordersData.previewPaymentStatus')}</p>
                <p className='invoice-date'>{data.payment_status ? t('paymentPaid') : t('paymentNotPaid')}</p>
              </div>
              </div>
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
          <table>
              <tbody>
              <tr>
                  <td className='pe-1'>{t('ordersData.previewTotalPrice')}&#x0441;&#x332;:</td>
                  <td className='right'>{formatNumber(data.total_order_price)}</td>
              </tr>
              <tr>
                  <td className='pe-1'>{t('ordersData.previewDetailPrice')}</td>
              </tr>
              <tr>
                  <td className='pe-1'>{t('ordersData.previewProductPrice')}&#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.product_total_price)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>{t('ordersData.previewDeliveryPrice')}&#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.delivery_price)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>{t('ordersData.previewServicePrice')}&#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.total_with_service)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>{t('ordersData.previewTips')}&#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.tips)}</td>
                </tr>

                <tr>
                  <td className='pe-1'>{t('ordersData.previewUsedPoints')}</td>
                  <td className='right'>{data.used_points}</td>
                </tr>
                <tr>
                  <td className='pe-1'>{t('ordersData.previewEarnedPoints')}</td>
                  <td className='right'>{data.earned_points}</td>
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
