// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

import InputNumber from 'rc-input-number'
import Flatpickr from 'react-flatpickr'
import InputPassword from '@components/input-password-toggle'

import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
// ** Third Party Components
import classnames from 'classnames'
import { Plus, Minus, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-authentication.scss'
import logo from "@src/assets/images/slider/03.jpg"
import telegramIcon from "@src/assets/images/icons/social/telegram.svg"
import instagramIcon from "@src/assets/images/icons/social/instagram.svg"
import whatsappIcon from "@src/assets/images/icons/social/whatsapp.svg"
// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardText,
  Form,
  Input, 
  Label,
  InputGroup,
  DropdownItem,
  Modal,
  ModalBody, 
  ModalHeader,
  InputGroupText,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const Store = props => {
  // ** Props
const { data, categories, subcategories } = props 
const [startTime, endTime] = data.worktime.split('-')

const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name
}))

const subcategoryOptions = subcategories.map((subcategory) => ({
  value: String(subcategory.id),
  label: subcategory.name
}))

const initCategory = data.category ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(data.category))] : { value: '', label: 'Выбирите категорию' }
const initSubcategory = data.subcategory ? subcategoryOptions[subcategoryOptions.findIndex(i => parseInt(i.value) === parseInt(data.subcategory))] : { value: '', label: 'Выбирите подкатегорию' }

  const [avatar, setAvatar] = useState(data.image ? data.image : '')
  const [category, setCategory] = useState(initCategory)
  const [subcategory, setSubcategory] = useState(initSubcategory)
  const [timeBeg, setTimeBeg] = useState(startTime)
  const [timeEnd, setTimeEnd] = useState(endTime)
  const [modalShow, setModalShow] = useState(false)
  const [password, setPassword] = useState("")

 console.log(password)
 const toggleModal = () => setModalShow(!modalShow)

 const handleChengPassword = (event) => {
  event.preventDefault()
  setPassword(event.target.password.value)
  if (event.target.password.value === event.target.confirmPassword.value) toggleModal()
}


  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const format = num => {
    return `${numberWithCommas(num)} %`
  }

  const parser = num => {
    const cells = num.toString().split(' ')
    if (!cells[1]) {
      return num
    }

    const parsed = cells[1].replace(/,*/g, '')

    return parsed
  }

console.log(data)
const handleImgReset = () => {
  setAvatar(logo)
}
// initialForm = { defaultValues: {
//   username: data.username,
//   lastName: selectedUser.fullName.split(' ')[1],
//   firstName: selectedUser.fullName.split(' ')[0]
// }}
  // ** State
  // const [selectedColor, setSelectedColor] = useState('primary')

  // ** Renders color options
  // const renderColorOptions = () => {
  //   return data.colorOptions.map((color, index) => {
  //     const isLastColor = data.colorOptions.length - 1 === index

  //     return (
  //       <li
  //         key={color}
  //         className={classnames('d-inline-block', {
  //           'me-25': !isLastColor,
  //           selected: selectedColor === color
  //         })}
  //         onClick={() => setSelectedColor(color)}
  //       >
  //         <div className={`color-option b-${color}`}>
  //           <div className={`filloption bg-${color}`}></div>
  //         </div>
  //       </li>
  //     )
  //   })
  // }

  // ** Handle Wishlist item toggle
  // const handleWishlist = val => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(productId))
  //   } else {
  //     dispatch(addToWishlist(productId))
  //   }
  //   dispatch(getProduct(productId))
  // }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    // if (val === false) {
    //   dispatch(addToCart(id))
    // }
    // dispatch(getProduct(productId))
  }

  // ** Condition btn tag
  // const CartBtnTag = data.isInCart ? Link : 'button'
  const defaultValues = {
    name: data.name,
    login: data.login,
    email: data.email,
    phone: data.phone,
    city: data.storeaddress.city,
    address: data.storeaddress.name,
    longitude: data.storeaddress.longitude,
    latitude: data.storeaddress.latitude,
    merchantId: data.merchant_id,
    secretKey: data.pay_secret_key,
    adminTelegram: data.admin_telegram_id,
    telegram: data.telegram,
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    percentage: data.percentage,
    percentService: data.percent_service,
    deliverycost: data.deliverycost,
    avgcheck: data.avgcheck,
    slogan: data.slogan,
    description: data.description
  }
  // ** Hook
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // const handleSubmit = (id, val) => {
  // //   // if (val === false) {
  // //   //   dispatch(addToCart(id))
  // //   // }
  // //   // dispatch(getProduct(productId))
  // }

  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Row>
    <Col sm={12} className='d-flex'>
    <Col md={4} xs={12} className='d-flex flex-column p-1'>
      <Col>
        <div className='d-flex align-items-center justify-content-center'>
              <img className='img-fluid rounded' src={avatar} alt={data.name ? data.name : "Логотип заведения"} height='150' width='267' />
        </div>
        <div className='d-flex align-items-center justify-content-center mt-75'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Загрузить
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Очистить
                </Button>
              </div>
        </div>
      </Col>
      <Col>
      <Label className='form-label' for='category'>
      Категория <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={category}
                classNamePrefix='select'
                options={categoryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.category === null })}
                {...field}
              />
            )}
          />
      </Col>
      <Col>
      <Label className='form-label' for='subcategory'>
      Подкатегория <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='subcategory'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                defaultValue={subcategory}
                classNamePrefix='select'
                options={subcategoryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.subcategory === null })}
                {...field}
              />
            )}
          />
      </Col>
      <Col>
                <Label className='form-label' for='merchantId'>
                Id Merchant
                </Label>
                <Controller
                  name='merchantId'
                  control={control}
                  render={({ field }) => (
                    <Input id='merchantId' placeholder='Введите Merchant Id магазина' invalid={errors.merchantId && true} {...field} />
                  )}
        />
        {errors && errors.merchantId && <FormFeedback>Пожалуйста Merchant Id магазина</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='secretKey'>
                Secret Key
                </Label>
                <Controller
                  name='secretKey'
                  control={control}
                  render={({ field }) => (
                    <Input id='secretKey' placeholder='Введите Secret Key магазина' invalid={errors.secretKey && true} {...field} />
                  )}
        />
        {errors && errors.secretKey && <FormFeedback>Пожалуйста Secret Key магазина</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='adminTelegram'>
                Телеграм ID
                </Label>
                <Controller
                  name='adminTelegram'
                  control={control}
                  render={({ field }) => (
                    <Input id='adminTelegram' placeholder='Введите Телеграм ID' invalid={errors.adminTelegram && true} {...field} />
                  )}
        />
        {errors && errors.adminTelegram && <FormFeedback>Введите пожалуйста Телеграм ID</FormFeedback>}
        </Col>  
      </Col>
      <Col md={4} className='d-flex flex-column p-1'>
       <Col>
                <Label className='form-label' for='name'>
                Название
                </Label>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input id='name' placeholder='Введите название заведения' invalid={errors.name && true} {...field} />
                  )}
        />
        {errors && errors.name && <FormFeedback>Пожалуйста введите название</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='email'>
                Email
                </Label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input id='email' placeholder='Введите название email' invalid={errors.email && true} {...field} />
                  )}
        />
        {errors && errors.email && <FormFeedback>Пожалуйста введите email</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='phone'>
                Телефон
                </Label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <Input id='phone' placeholder='Введите Логин' invalid={errors.phone && true} {...field} />
                  )}
        />
        {errors && errors.phone && <FormFeedback>Пожалуйста введите Логин</FormFeedback>}
        </Col>
        <Col className='mb-2'>
                <Label className='form-label' for='login'>
                Логин
                </Label>
                <Controller
                  name='login'
                  control={control}
                  render={({ field }) => (
                    <Input id='login' placeholder='Введите Логин' invalid={errors.login && true} {...field} />
                  )}
        />
        {errors && errors.login && <FormFeedback>Пожалуйста введите Логин</FormFeedback>}
        </Col>
        <Button color='warning' block onClick={toggleModal}>
        Установить новый пароль
        </Button>
        <Col className='mt-2'>
        <Label className='form-label' for='instagram'>
        Инстаграм
        </Label>
        <InputGroup className='input-group-merge'>
          <InputGroupText>
          <img className='img-fluid bg-transparent' src={instagramIcon} alt={"Инстаграм"} height='18' width='18' />
          </InputGroupText>
        <Input id='instagram' defaultValue={defaultValues.instagram} placeholder='Инстаграм' />
      </InputGroup>
        </Col>
        <Col>
        <Label className='form-label' for='whatsapp'>
        WhatsApp
        </Label>
        <InputGroup className='input-group-merge'>
          <InputGroupText>
          <img className='img-fluid bg-transparent' src={whatsappIcon} alt={"WhatsApp"} height='18' width='18' />
          </InputGroupText>
        <Input id='whatsapp' defaultValue={defaultValues.whatsapp} placeholder='WhatsApp' />
      </InputGroup>
        </Col>
        <Col>
        <Label className='form-label' for='telegram'>
        Телеграм
        </Label>
        <InputGroup className='input-group-merge'>
          <InputGroupText>
          <img className='img-fluid bg-transparent' src={telegramIcon} alt={"Telegram"} height='18' width='18' />
          </InputGroupText>
        <Input id='telegram' defaultValue={defaultValues.telegram} placeholder='Телеграм' />
      </InputGroup>
        </Col>
        </Col>
        <Col md={4} className='d-flex flex-column p-1'>
        <Col>
                <Label className='form-label' for='city'>
                Город
                </Label>
                <Controller
                  name='city'
                  control={control}
                  render={({ field }) => (
                    <Input id='city' placeholder='Введите город' invalid={errors.city && true} {...field} />
                  )}
        />
        {errors && errors.city && <FormFeedback>Пожалуйста введите город</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='address'>
                Адрес
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <Input id='address' placeholder='Введите адрес' invalid={errors.address && true} {...field} />
                  )}
        />
        {errors && errors.address && <FormFeedback>Пожалуйста введите адрес</FormFeedback>}
        </Col>
        <Col>
                <Label className='form-label' for='longitude'>
                Долгота
                </Label>
                <Controller
                  name='longitude'
                  control={control}
                  render={({ field }) => (
                    <Input id='longitude' placeholder='Введите долготу' invalid={errors.longitude && true} {...field} />
                  )}
        />
        {errors && errors.longitude && <FormFeedback>Пожалуйста введите долготу</FormFeedback>}
        </Col>
        <Col className='mb-2'>
                <Label className='form-label' for='latitude'>
                Широта
                </Label>
                <Controller
                  name='latitude'
                  control={control}
                  render={({ field }) => (
                    <Input id='latitude' placeholder='Введите широту' invalid={errors.latitude && true} {...field} />
                  )}
        />
        {errors && errors.latitude && <FormFeedback>Пожалуйста введите широту</FormFeedback>}
        </Col>
        <Button color='info' block >Выбрать на карте</Button>
        <Col className='mt-2'>
        <Label className='form-label' for='timepickerBeg'>
        Время работы
        </Label> 
        <div className='d-flex justify-content-between align-items-center gap-10'>
        <div>
        <Flatpickr
        className='form-control'
        value={timeBeg}
        id='timepickerBeg'
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }}
        onChange={date => setTimeBeg(date)}
      />
        </div>
        <Minus size={14}/>
        <div>
        <Flatpickr
        className='form-control'
        value={timeEnd}
        id='timepickerEnd'
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }}
        onChange={date => setTimeEnd(date)}
      />  
        </div>
        </div>
        </Col>
        <Col className='d-flex justify-content-center gap-30'>
        <div> 
        <Label className='form-label' for='percentage'>
         Скидка
          </Label>
          <InputNumber
            parser={parser}
            formatter={format}
            defaultValue={defaultValues.percentage}
            upHandler={<Plus />}
            downHandler={<Minus />}
            id='percentage'
          />  
        </div> 
        <div> 
        <Label className='form-label' for='percentService'>
        Обслуживание
          </Label>
          <InputNumber
            parser={parser}
            formatter={format}
            defaultValue={defaultValues.percentService}
            upHandler={<Plus />}
            downHandler={<Minus />}
            id='percentService'
          />  
        </div> 
        </Col>
        <Col className='d-flex justify-content-between gap-30'>
        <div>
        <Label className='form-label' for='deliverycost'>
        Доставка, &#x0441;&#x332;
        </Label>
        <Controller
        name='deliverycost'
        control={control}
                  render={({ field }) => (
                    <Input id='deliverycost' type='number' placeholder='' invalid={errors.deliverycost && true} {...field} />
                  )}
        />
        {errors && errors.deliverycost && <FormFeedback>Пожалуйста введите cтоимость доставки</FormFeedback>}
        </div>  
        <div>
        <Label className='form-label' for='avgcheck'>
        Средний чек, &#x0441;&#x332;
        </Label>
        <Controller
        name='avgcheck'
        control={control}
                  render={({ field }) => (
                    <Input id='avgcheck' type='number' placeholder='' invalid={errors.avgcheck && true} {...field} />
                  )}
        />
        {errors && errors.avgcheck && <FormFeedback>Пожалуйста введите cредний чек</FormFeedback>}
        </div>
        </Col>
        </Col>
        </Col>
        </Row>
        <Row>  
        <Col className='d-flex flex-column mt-2' sm='12'>
        <Label className='form-label' for='slogan'>
        Слоган
                </Label>
                <Controller
                  name='slogan'
                  control={control}
                  render={({ field }) => (
                    <Input id='slogan' placeholder='Введите слоган' invalid={errors.slogan && true} {...field} />
                  )}
        />
        {errors && errors.slogan && <FormFeedback>Пожалуйста введите слоган</FormFeedback>}
        </Col>
        <Col className='d-flex flex-column mt-2' sm='12'>
        <Label className='form-label' for='description'>
                Описание
                </Label>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Input id='description' type='textarea' placeholder='Введите описание' invalid={errors.description && true} {...field} />
                  )}
        />
        {errors && errors.description && <FormFeedback>Пожалуйста введите описание</FormFeedback>}         
        </Col>
        <Col className='d-flex justify-content-center mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Сохранить
                </Button>
                <Button color='secondary' outline>
                  Отменить
                </Button>
        </Col>
    </Row>
    </Form>
    <Modal isOpen={modalShow} toggle={toggleModal} className='modal-dialog-centered'>
      <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-4'>
        <Form className='auth-reset-password-form' onSubmit={handleChengPassword}>
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  Новый пароль
                </Label>
                <InputPassword className='input-group-merge' id='new-password' name='newPassword' autoFocus />
              </div>
              <div className='mb-3'>
                <Label className='form-label' for='confirm-password' name='confirmPassword'>
                  Подтвердите пароль
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </div>
              <Button color='primary' block>
                Установить новый пароль
              </Button>
            </Form>
        </ModalBody>
    </Modal>
    </>
  )
}

export default Store