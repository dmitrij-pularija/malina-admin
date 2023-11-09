import { useNavigate } from "react-router-dom"
import telegramIcon from "@src/assets/images/icons/social/telegram.svg"
import instagramIcon from "@src/assets/images/icons/social/instagram.svg"
import whatsappIcon from "@src/assets/images/icons/social/whatsapp.svg"
import { formatNumber, formatStringTime } from "@utils"
import Avatar from "@components/avatar"
import Rating from 'react-rating'
import { Star } from 'react-feather'
import { businessType, priceLevels } from "../../../../../configs/initial"
import {
    Row,
    Col,
    Button,
    Form,
    Input,
    Label,
    InputGroup,
    Modal,
    ModalBody,
    ModalHeader,
    InputGroupText,
    FormFeedback
  } from "reactstrap"

  const renderLogo = (name, picture) => {
    if (picture) {
      return (
        <img
          height='200'
          width='200'
          alt='user-avatar'
          src={picture}
          className='img-fluid rounded mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mb-2'
          content={name ? name : 'Malina'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(68px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '200px',
            width: '200px'
          }}
        />
      )
    }
  }
  const getValue = (id, items) => {
    if (!id || !items || !items.length) return ""
    const findedItem = items.find(item => parseInt(item.id) === parseInt(id)) 
    return findedItem ? findedItem.name : ''
  }

  const StoreDetails = (props) => {
    const { categories, subcategories, selectedStore, toggleModalDelivery, toggleModalShifts } = props
    const navigate = useNavigate()
    const handleEdit = () => navigate(`/apps/food/stores/store-detail/${selectedStore.id}`)

    return (
    <>    
    <Row className='mt-3'>
    <Col sm={4} className="d-flex">
    <div className='width'>
            <div className='d-flex align-items-center flex-column'>
              {renderLogo(selectedStore.name, selectedStore.avatar)}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='d-flex flex-column user-info'>
                  <h4>{selectedStore.name ? selectedStore.name : ''}</h4>
                  <ul className='list-unstyled'>
                    <li className='mb-75'>
                    <Rating
                  readonly
                  fractions={2}
                  direction={'ltr'}
                  initialRating={selectedStore.average_business_rating ? selectedStore.average_business_rating : 0}
                  emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
                  fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
                  />
                    </li>
                    <li className='mb-75'>
                   <Rating
                  readonly
                  fractions={2}
                  direction={'ltr'}
                  initialRating={selectedStore.average_staff_rating ? selectedStore.average_staff_rating : 0}
                  emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
                  fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
                  />
                  </li>
                  <li className='mb-75'>
                    <span className='fw-bolder me-25'>Слоган:</span>
                    <span>{selectedStore.slogan ? selectedStore.slogan : ""}</span>
                    </li>
                </ul>
                </div>
              </div>
            </div>
          </div>    
    </Col>
    <Col sm={4} className='d-flex flex-column align-items-center justify-content-center' >
    <ul className='list-unstyled'>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Логин:</span>
    <span>{selectedStore.login ? selectedStore.login : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Email:</span>
    <span>{selectedStore.email ? selectedStore.email : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Телефон:</span>
    <span>{selectedStore.phone ? selectedStore.phone : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Телеграмм:</span>
    <span>{selectedStore.telegram ? selectedStore.telegram : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Instagram:</span>
    <span>{selectedStore.instagram ? selectedStore.instagram : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Whatsapp:</span>
    <span>{selectedStore.whatsapp ? selectedStore.whatsapp : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Бизнес:</span>
    <span>{selectedStore.business_type  ? businessType[selectedStore.business_type] : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Категория:</span>
    <span>{getValue(selectedStore.category, categories)}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Подкатегория:</span>
    <span>{getValue(selectedStore.subcategory, subcategories)}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Уровень цен:</span>
    <span>{selectedStore.price_level ? priceLevels[selectedStore.price_level] : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Средний чек:</span>
    <span dangerouslySetInnerHTML={{ __html: selectedStore.average_check ? `${formatNumber(selectedStore.average_check)} &#x0441;&#x332;` : "" }} />
    </li>
    </ul>
    </Col>
    <Col sm={4} className='d-flex flex-column align-items-center justify-content-center' >
    <ul className='list-unstyled'>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Адрес:</span>
    <span>{selectedStore.business_address ? selectedStore.business_address.name : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Город:</span>
    <span>{selectedStore.business_address ? selectedStore.business_address.city : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Долгота:</span>
    <span>{selectedStore.business_address ? selectedStore.business_address.longitude : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Широта:</span>
    <span>{selectedStore.business_address ? selectedStore.business_address.latitude : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Время работы:</span>
    <span>{selectedStore.work_time_start ? formatStringTime(selectedStore.work_time_start) : ""} - {selectedStore.work_time_end ? formatStringTime(selectedStore.work_time_end) : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Скидка:</span>
    <span>{selectedStore.percentage ? `${selectedStore.percentage} %` : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Обслуживание:</span>
    <span>{selectedStore.service_charge ? `${selectedStore.service_charge} %` : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Телеграм ID:</span>
    <span>{selectedStore.admin_telegram_id ? selectedStore.admin_telegram_id : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Id Merchant:</span>
    <span>{selectedStore.merchant_id ? selectedStore.merchant_id : ""}</span>
    </li>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Secret Key:</span>
    <span>{selectedStore.pay_secret_key ? selectedStore.pay_secret_key : ""}</span>
    </li>
    <li className='mb-75'>
    <Input
        disabled 
        type='checkbox'
        className='me-25' 
        checked={!!selectedStore.is_card_payment_allow} 
        />    
    <span className='fw-bolder'>Есть безналичная оплата</span>
    </li>
    </ul>
    </Col>
    </Row>
    <Row>
    <Col sm={12}>
    <ul className='list-unstyled'>
    <li className='mb-75'>
    <span className='fw-bolder me-25'>Описание:</span>
    </li>
    <li className='mb-75'>
    <span>{selectedStore.description ? selectedStore.description : ""}</span>
    </li>
    </ul>
    </Col>
    </Row>
    <Row>
    <Col className="d-flex justify-content-center mt-2 gap-10" sm="12">
    <Button color="secondary" outline onClick={handleEdit}>
    Изменить
    </Button>
    {selectedStore.business_type === 1 && <Button color="secondary" outline onClick={toggleModalShifts}>
    Смены
    </Button>}
    <Button color="secondary" outline onClick={toggleModalDelivery}>
    Тарифы доставки
    </Button>
    </Col>
    </Row>
    </> 
    )

  }

  export default StoreDetails