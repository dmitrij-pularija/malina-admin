// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Repeater from '@components/repeater'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import { formatData, formatTime, formatNumber } from '../../../../../utility/Utils'
import { statusObj, paymentType, orderType } from '../../../../../configs/initial'

// ** Reactstrap Imports
import { Row, Col, Card, Input, Label, Button, CardBody, CardText, InputGroup, InputGroupText, Badge, Table } from 'reactstrap'
import Logo2 from '@components/logo2'
import Avatar from '@components/avatar'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

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

const renderImg = (avatar, name) => {
  if (avatar && avatar.includes("http")) {
    return (
      <img
        height=''
        width='100'
        alt='user-avatar'
        src={avatar}
        className='img-fluid rounded'
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
       {carts.map(({ id, product, quantity, total_price, product_addons, total_addon_price }) => (
          <tr key={id}>
          <td className='center'>{++i}</td>
            <td className='text-nowrap'>
              {product.images.length ? <img className='me-75' src={product.images[0].image} alt={product.name} height='40' width='40' /> : ''}
              <span className='align-middle fw-bold order-dish-name'>{product.name}</span>
            </td>
            <td className='right'>{product.cost}</td>
            <td className='right'>{product.sale_cost}</td>
            <td className='center'>{quantity}</td>
            <td className='center'>{product_addons.length}</td>
            <td className='right'>{total_addon_price}</td>
            <td className='right'>{total_price}</td>
          </tr>
       ))}
       </tbody>
     </Table>
     )
   
 }

const OrderEditCard = ({ data }) => {
  if (!data) return 
  const carts = data.order_cart[0].products_list
  console.log(data)

  // ** States
  const [count, setCount] = useState(1)
  // const [picker, setPicker] = useState(new Date(data.invoice.issuedDate))
  // const [dueDatepicker, setDueDatePicker] = useState(new Date(data.invoice.dueDate))

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
   


  return (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper gap-10'>
            {renderImg(data.business_id.image, data.business_id.name)}  
            {/* <Logo2 src={data.business_id.image} size={"xl"} />   */}
              <h3 className='text-primary'>{data.business_id.name ? data.business_id.name : data.business_id.login}</h3>
            </div>
            <CardText className='mb-25'>{data.business_id.business_address.city}</CardText>
            <CardText className='mb-25'>{data.business_id.business_address.name}</CardText>
            <CardText className='mb-0'>{data.business_id.phone}</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Заказ №<span className='invoice-number'>{data.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Дата заказа:</p>
              <p className='invoice-date'>{formatData(data.order_date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Время:</p>
              <p className='invoice-date'>{formatTime(data.order_date)}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Тип заказа:</p>
              <p className='invoice-date'>{orderType[data.order_type]}</p>
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
            <CardText className='mb-1'><span className='invoice-date'>{data.delivery_address ? data.delivery_address : "В нутри заведения"}</span></CardText>
            <div className='order-comments'>
              {data.time_delivery ? <p className='invoice-date-title'>Время доставки:</p> : ''}
              <p className='invoice-date'>{data.time_delivery ? formatTime(data.time_delivery) : ""}</p>
            </div>
            <div className='order-comments'>
              {data.comment ? <p className='invoice-date-title'>Комментарий:</p> : ''}
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
            <h6 className='mb-2'>Клиент:</h6>
            <div className='order-avatar'>
            {renderImg(data.user_id ? data.user_id.avatar : "", data.user_id && data.user_id.name ? `${data.user_id.name} ${data.user_id.surname}` : 'Клиент')}
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Имя:</p>
              <p className='invoice-date'>{data.user_id && data.user_id.name ?`${data.user_id.name ? data.user_id.name : ''} ${data.user_id.surname ? data.user_id.surname : ''}` : 'не указано'}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Телефон:</p>
              <p className='invoice-date'>{data.user_id && data.user_id.login ? data.user_id.login : 'не указано' }</p>
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
                <p className='invoice-date'>{paymentType[data.payment_type]}</p>
              </div>
              <div className='invoice-date-wrapper text-nowrap'>
                <p className='invoice-date fw-bold'>Статус оплаты:</p>
                <p className='invoice-date'>{data.payment_status ? "Оплачен" : "Не оплачен"}</p>
              </div>
              </div>
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
          <table>
              <tbody>
              <tr>
                  <td className='pe-1'>Итого, &#x0441;&#x332;:</td>
                  <td className='right'>{formatNumber(data.total_order_price)}</td>
              </tr>
              <tr>
                  <td className='pe-1'>В том числе:</td>
              </tr>
              <tr>
                  <td className='pe-1'>Стоимость продуктов, &#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.product_total_price)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Стоимость доставки, &#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.delivery_price)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Стоимость обслуживания, &#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.total_with_service)}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Чаевые, &#x0441;&#x332;</td>
                  <td className='right'>{formatNumber(data.tips)}</td>
                </tr>

                <tr>
                  <td className='pe-1'>Баллов списано:</td>
                  <td className='right'>{data.used_points}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Баллов начислено:</td>
                  <td className='right'>{data.earned_points}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.invoice.client.name}</h6>
            <CardText className='mb-25'>{data.invoice.client.company}</CardText>
            <CardText className='mb-25'>{data.invoice.client.address}</CardText>
            <CardText className='mb-25'>{data.invoice.client.contact}</CardText>
            <CardText className='mb-0'>{data.invoice.client.companyEmail}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Total Due:</td>
                  <td>
                    <span className='fw-bolder'>{data.paymentDetails.totalDue}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Bank name:</td>
                  <td>{data.paymentDetails.bankName}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Country:</td>
                  <td>{data.paymentDetails.country}</td>
                </tr>
                <tr>
                  <td className='pe-1'>IBAN:</td>
                  <td>{data.paymentDetails.iban}</td>
                </tr>
                <tr>
                  <td className='pe-1'>SWIFT code:</td>
                  <td>{data.paymentDetails.swiftCode}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>

      <CardBody className='invoice-padding invoice-product-details'>
        <Repeater count={count}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            return (
              <Tag key={i} className='repeater-wrapper'>
                <Row>
                  <Col className='d-flex product-details-border position-relative pe-0' sm='12'>
                    <Row className='w-100 pe-lg-0 pe-1 py-2'>
                      <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='5' sm='12'>
                        <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                        <Input type='select' className='item-details'>
                          <option>App Design</option>
                          <option>App Customization</option>
                          <option>ABC Template</option>
                          <option>App Development</option>
                        </Input>
                        <Input className='mt-2' type='textarea' rows='1' defaultValue='Customization & Bug Fixes' />
                      </Col>
                      <Col className='my-lg-0 my-2' lg='3' sm='12'>
                        <CardText className='col-title mb-md-2 mb-0'>Cost</CardText>
                        <Input type='number' defaultValue='24' placeholder='24' />
                        <div className='mt-2'>
                          <span>Discount:</span> <span>0%</span>
                        </div>
                      </Col>
                      <Col className='my-lg-0 my-2' lg='2' sm='12'>
                        <CardText className='col-title mb-md-2 mb-0'>Qty</CardText>
                        <Input type='number' defaultValue='1' placeholder='1' />
                      </Col>
                      <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                        <CardText className='col-title mb-md-50 mb-0'>Price</CardText>
                        <CardText className='mb-0'>$24.00</CardText>
                      </Col>
                    </Row>
                    <div className='d-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                      <X size={18} className='cursor-pointer' onClick={deleteForm} />
                    </div>
                  </Col>
                </Row>
              </Tag>
            )
          }}
        </Repeater>

        <Row className='mt-1'>
          <Col sm='12' className='px-0'>
            <Button color='primary' size='sm' className='btn-add-new' onClick={() => setCount(count + 1)}>
              <Plus size={14} className='me-25' /> <span className='align-middle'>Add Item</span>
            </Button>
          </Col>
        </Row>
      </CardBody>

      <CardBody className='invoice-padding'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md={{ size: '6', order: 1 }} xs={{ size: 12, order: 2 }}>
            <div className='d-flex align-items-center mb-1'>
              <Label for='salesperson' className='form-label'>
                Salesperson:
              </Label>
              <Input type='text' className='ms-50' id='salesperson' placeholder='Edward Crowley' />
            </div>
          </Col>
          <Col className='d-flex justify-content-end' md={{ size: '6', order: 2 }} xs={{ size: 12, order: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Subtotal:</p>
                <p className='invoice-total-amount'>$1800</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Discount:</p>
                <p className='invoice-total-amount'>$28</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Tax:</p>
                <p className='invoice-total-amount'>21%</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>$1690</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>

      <hr className='invoice-spacing mt-0' />

      <CardBody className='invoice-padding py-0'>
        <Row>
          <Col>
            <div className='mb-2'>
              <Label for='note' className='form-label fw-bold'>
                Note:
              </Label>
              <Input type='textarea' rows='2' id='note' defaultValue={note} />
            </div>
          </Col>
        </Row>
      </CardBody> */}
          <CardBody className='invoice-padding pb-0'>
      <Row>
          {/* <Col sm='12'>
            <span className='fw-bold'>Комментарий исполнителя: </span>
            <span>{data.comment}</span>
          </Col> */}
        </Row>
      </CardBody>  
    </Card>
  )
}

export default OrderEditCard
