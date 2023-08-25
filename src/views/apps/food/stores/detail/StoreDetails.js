// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import InputNumber from 'rc-input-number'
import Flatpickr from 'react-flatpickr'
import InputPassword from '@components/input-password-toggle'
import Avatar from '@components/avatar'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors, formatTime } from '@utils'
import { addStore, editStore } from '../store'
// ** Third Party Components
import classnames from 'classnames'
import { Plus, Minus, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'
import { businessType,  storeType, priceLevels} from '../../../../../configs/initial'

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
  FormFeedback,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const defaultValues = {
  name: '',
  login: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  longitude: '',
  latitude: '',
  merchantId: '',
  secretKey: '',
  adminTelegram: '',
  telegram: '',
  instagram: '',
  whatsapp: '',
  percentage: 0,
  percentService: 0,
  deliverycost: 0,
  avgcheck: 0,
  slogan: '',
  description: '',
  business : { value: '', label: 'Выбирите направление' },
  type: { value: '', label: 'Выбирите тип заведения' },
  category: { value: '', label: 'Выбирите категорию' },
  subcategory: { value: '', label: 'Выбирите подкатегорию' },
  priceLevel: { value: '', label: 'Выбирите уровень цен' }
}

const requiredFields = ['name', 'login', 'city', 'address', 'longitude', 'latitude', 'business', 'type', 'category']
const checkIsValid = (data) => {
  return Object.keys(data).every(key => {
    const field = data[key]
    if (requiredFields.includes(key)) {
      if (typeof field === 'object') {
        return field.value !== ""
      } else {
        return field.length > 0
      }
    } else {
      return true
    }
  })
}

const renderLogo = (avatar, name) => {
  if (avatar) {
    return (
      <img 
      className='img-fluid rounded' 
      src={avatar} 
      alt={name ? name : "Логотип заведения"} 
      height='150px' 
      width='267px' 
      />
    )
  } else {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={name ? name : 'Malina'}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(64px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '150px',
          width: '267px'
        }}
      />
    )
  }
}

const Store = props => {
const dispatch = useDispatch()  
const navigate = useNavigate()
const { selectedStore, categories, subcategories } = props 
// const [startTime, endTime] = data.worktime.split('-')
// console.log(categories)

const businessTypeOptions = Object.keys(businessType).map(key => ({
  value: parseInt(key),
  label: businessType[key]
}))

const storeTypeOptions = Object.keys(storeType).map(key => ({
  value: parseInt(key),
  label: storeType[key]
}))

const priceLevelOptions = Object.keys(priceLevels).map(key => ({
  value: parseInt(key),
  label: priceLevels[key]
}))



const initCategoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name
}))

const initSubcategoryOptions = subcategories.map((subcategory) => ({
  value: String(subcategory.id),
  label: subcategory.name
}))

// const initBusiness = selectedStore && selectedStore.business_type ? businessTypeOptions[businessTypeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.business_type))] : { value: '', label: 'Выбирите направление' }
// const initType = selectedStore && selectedStore.type ? storeTypeOptions[storeTypeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.type))] : { value: '', label: 'Выбирите тип заведения' }
// const initPriceLevel = selectedStore && selectedStore.price_level ? priceLevelOptions[priceLevelOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.price_level))] : { value: '', label: 'Выбирите уровень цен' }

// const initCategory = data && data.category ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(data.category))] : { value: '', label: 'Выбирите категорию' }
// const initSubcategory = data && data.subcategory ? subcategoryOptions[subcategoryOptions.findIndex(i => parseInt(i.value) === parseInt(data.subcategory))] : { value: '', label: 'Выбирите подкатегорию' }
const [data, setData] = useState(null)
  const [avatar, setAvatar] = useState('')
  //  const [business, setBusiness] = useState({ value: '', label: 'Выбирите направление' })
  //  const [type, setType] = useState(initType)
  //  const [priceLevel, setPriceLevel] = useState(initPriceLevel)
  //  const [category, setCategory] = useState({ value: '', label: 'Выбирите категорию' })
  const [categoryOptions, setCategoryOptions] = useState(initCategoryOptions)
  //  const [subcategory, setSubcategory] = useState({ value: '', label: 'Выбирите подкатегорию'})
  const [subcategoryOptions, setSubcategoryOptions] = useState(initSubcategoryOptions)
  const [timeBeg, setTimeBeg] = useState(selectedStore ? selectedStore.work_time_start : "")
  const [timeEnd, setTimeEnd] = useState(selectedStore ? selectedStore.work_time_end : "")
  const [modalShow, setModalShow] = useState(false)
  const [password, setPassword] = useState("")
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: ''})
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const values = {}
  console.log(selectedStore)

  useEffect(() => {
    // if (selectedStore.length > 0) {
    setAvatar(selectedStore.image)
    setTimeBeg(selectedStore.work_time_start)
    setTimeEnd(selectedStore.work_time_end)
    // const categoryOptions = categories.map(category => ({
    //   value: String(category.id),
    //   label: category.name
    // }))
    // const subcategoryOptions = subcategories.map(subcategory => ({
    //   value: String(subcategory.id),
    //   label: subcategory.name
    // }))

    values.name = selectedStore.name
    values.login = selectedStore.login
    values.email = selectedStore.email
    values.phone = selectedStore.phone
    values.city = selectedStore.business_address ? selectedStore.business_address.city : ""
    values.address = selectedStore.business_address ? selectedStore.business_address.name : ""
    values.longitude = selectedStore.business_address ? selectedStore.business_address.longitude : ""
    values.latitude = selectedStore.business_address ? selectedStore.business_address.latitude : ""
    values.merchantId = selectedStore.merchant_id
    values.secretKey = selectedStore.pay_secret_key
    values.adminTelegram = selectedStore.admin_telegram_id
    values.telegram = selectedStore.telegram
    values.instagram = selectedStore.instagram
    values.whatsapp = selectedStore.whatsapp
    values.percentage = selectedStore.percentage
    values.percentService = selectedStore.service_charge
    values.deliverycost = 0
    values.avgcheck = selectedStore.average_check
    values.slogan = selectedStore.slogan
    values.description = selectedStore.description
    values.business = selectedStore.business_type ? businessTypeOptions[businessTypeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.business_type))] : { value: '', label: 'Выбирите направление' }
    values.type = selectedStore.type ? storeTypeOptions[storeTypeOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.type))] : { value: '', label: 'Выбирите тип заведения' }
    values.category = selectedStore.category ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.category))] : { value: '', label: 'Выбирите категорию' }
    values.subcategory = selectedStore.subcategory ? subcategoryOptions[subcategoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.subcategory))] : { value: '', label: 'Выбирите подкатегорию' }
    values.priceLevel = selectedStore.price_level ? priceLevelOptions[priceLevelOptions.findIndex(i => parseInt(i.value) === parseInt(selectedStore.price_level))] : { value: '', label: 'Выбирите уровень цен' }
    // } 
    }, [selectedStore.length])


// console.log(passwordsMatch)
  const handlePasswordChange = (event) => {
    const { name, value } = event.target
    setPasswords(prevPasswords => ({
      ...prevPasswords,
      [name]: value
    }))
    
    if (name === 'confirmPassword') setPasswordsMatch(passwords.newPassword === value)
  }

//  console.log(password)
 const toggleModal = () => setModalShow(!modalShow)
 const handleClose = () => navigate('/apps/food/stores/list/')

 const handleChengPassword = (event) => {
  event.preventDefault()
  // console.log(event.currentTarget.newPassword.value)
  if (event.currentTarget.newPassword.value === event.currentTarget.confirmPassword.value) {
  setPassword(event.currentTarget.newPassword.value)   
    toggleModal()
  }
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
  const handleImg = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }  
   
  const dataURLtoBlob = dataURL => {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
  
    return new Blob([u8arr], { type: mime })
  }


  const handleImgReset = () => {
    setAvatar('')
  }


// console.log(data)
// const handleImgReset = () => {
//   setAvatar(logo)
// }
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
  // const handleCartBtn = (id, val) => {
    // if (val === false) {
    //   dispatch(addToCart(id))
    // }
    // dispatch(getProduct(productId))
  // }

  // ** Condition btn tag
  // const CartBtnTag = data.isInCart ? Link : 'button'
  // const defaultValues = selectedStore.length ? {
  //    name: selectedStore.name,
  //    login: selectedStore.login,
  //    email: selectedStore.email,
  //    phone: selectedStore.phone,
  //    city: selectedStore.business_address.city,
  //    address: selectedStore.business_address.name,
  //    longitude: selectedStore.business_address.longitude,
  //    latitude: selectedStore.business_address.latitude,
  //    merchantId: selectedStore.merchant_id,
  //    secretKey: selectedStore.pay_secret_key,
  //    adminTelegram: selectedStore.admin_telegram_id,
  //    telegram: selectedStore.telegram,
  //    instagram: selectedStore.instagram,
  //    whatsapp: selectedStore.whatsapp,
  //    percentage: selectedStore.percentage,
  //    percentService: selectedStore.service_charge,
  //    deliverycost: 0,
  //    avgcheck: selectedStore.average_check,
  //    slogan: selectedStore.slogan,
  //    description: selectedStore.description
  // } : {}
  // ** Hook
  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const handleBusinessChange = (selectedOption) => {
    // setValue('business', selectedOption)
    // setBusiness(selectedOption)
    // setCategory({ value: '', label: 'Выбирите категорию'})
    setValue('category', { value: '', label: 'Выбирите категорию'})
    setValue('subcategory', { value: '', label: 'Выбирите подкатегорию'})
    const filteredCategories = categories.filter(category => parseInt(category.category_type) ===  parseInt(selectedOption.value))
    setCategoryOptions(filteredCategories.map(category => ({
      value: String(category.id),
      label: category.name
    })))
    setValue('business', selectedOption)  
  }

  const handleCategoryChange = (selectedOption) => {
    // setCategory(selectedOption)
    // setValue('category', selectedOption)
    setValue('subcategory', { value: '', label: 'Выбирите подкатегорию'})
    const filteredSubCategories = subcategories.filter(subcategory => parseInt(subcategory.category) ===  parseInt(selectedOption.value))
    setSubcategoryOptions(filteredSubCategories.map(subcategory => ({
      value: String(subcategory.id),
      label: subcategory.name
    })))
    setValue('category', selectedOption)  
  } 

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     setShow(false)
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }
  // const onChange = e => {
  //   const reader = new FileReader(),
  //     files = e.target.files
  //   reader.onload = function () {
  //     setAvatar(reader.result)
  //   }
  //   reader.readAsDataURL(files[0])
  // }

  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      console.log(data)
      if (!password) toggleModal()
      const formData = new FormData()
      formData.append('login', data.login)
      formData.append('password', password)
      formData.append('business_address.name', data.address)
      formData.append('business_address.city', data.city)
      formData.append('business_address.longitude', data.longitude)
      formData.append('business_address.latitude', data.latitude)

      if (data.name) formData.append('name', data.name)
      if (data.phone) formData.append('phone', data.phone)
      if (data.email) formData.append('email', data.email)
      if (data.type) formData.append('type', data.type.value)
      if (data.business) formData.append('business_type', data.business.value)
      if (data.percentage) formData.append('percentage', data.percentage)
      if (data.percentService) formData.append('service_charge', data.percentService)
      if (timeBeg) formData.append('work_time_start', formatTime(timeBeg))
      if (timeEnd) formData.append('work_time_end', formatTime(timeEnd))
      if (data.telegram) formData.append('telegram', data.telegram)
      if (data.instagram) formData.append('instagram', data.instagram)
      if (data.whatsapp) formData.append('whatsapp', data.whatsapp)
      if (data.adminTelegram) formData.append('admin_telegram_id', data.adminTelegram)
      if (data.slogan) formData.append('slogan', data.slogan)
      if (data.description) formData.append('description', data.description)
      if (data.avgcheck) formData.append('average_check', data.avgcheck)
      if (data.category) formData.append('category', data.category.value)
      if (data.subcategory) formData.append('subcategory', data.subcategory.value)
      if (data.priceLevel) formData.append('price_level', data.priceLevel.value)
      if (data.merchantId) formData.append('merchant_id', data.merchantId)
      if (data.secretKey) formData.append('pay_secret_key', data.secretKey)
      if (avatar.startsWith('data:image')) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append('image', avatarBlob, 'logo.jpg')
      }
      if (selectedStore.length) {
        dispatch(editStore({ id: selectedStore.id, formData }))
      } else {
        dispatch(addStore(formData))
      }
      setData('')
      setAvatar('')
      reset()
      navigate('/apps/food/stores/list/')
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
//   const handleSubmit = (data) => {
// console.log(data);
//   }
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
        {renderLogo(avatar, selectedStore.name)}
              {/* <img className='img-fluid rounded' src={avatar} alt={selectedStore.name ? selectedStore.name : "Логотип заведения"} height='150' width='267' /> */}
        </div>
        <div className='d-flex align-items-center justify-content-center mt-75'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Загрузить
                  <Input type='file' onChange={handleImg} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Очистить
                </Button>
              </div>
        </div>
      </Col>
      <Col>
      <Label className='form-label' for='business'>
      Направление деятельности<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='business'
            control={control}
            render={({ field }) => (
              <Select
                id='business'
                name='business'
                onChange={handleBusinessChange}
                isClearable={false}
                value={field.value}
                classNamePrefix='select'
                options={businessTypeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.business === null })}
              />
  )}
          />
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
                id='category'
                name='category'
                isDisabled={!getValues("business").value}
                isClearable={false}
                value={field.value}
                classNamePrefix='select'
                options={categoryOptions}
                theme={selectThemeColors}
                onChange={handleCategoryChange}
                className={classnames('react-select', { 'is-invalid': data !== null && data.category === null })}
              />
              )}
          />
      </Col>
      <Col>
      <Label className='form-label' for='subcategory'>
      Подкатегория
          </Label>
          <Controller
            name='subcategory'
            control={control}
            render={({ field }) => (
              <Select
                isDisabled={!getValues("category").value}
                isClearable={false}
                // defaultValue={subcategory}
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
      <Label className='form-label' for='type'>
      Тип заведения <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                // defaultValue={initType}
                classNamePrefix='select'
                options={storeTypeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
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
                Название<span className='text-danger'>*</span>
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
                Логин<span className='text-danger'>*</span>
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
        <Col className='mt-2'>
        <Button color='warning' block onClick={toggleModal}>
        Установить новый пароль<span className='text-danger'>*</span>
        </Button>
        </Col>

        <Col className='mt-2'>
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
        <Label className='form-label' for='instagram'>
        Инстаграм
        </Label>
        <InputGroup className='input-group-merge'>
          <InputGroupText>
          <img className='img-fluid bg-transparent' src={instagramIcon} alt={"Инстаграм"} height='18' width='18' />
          </InputGroupText>
          <Controller
            name='instagram'
            control={control}
            render={({ field }) => (
            <Input 
              {...field} 
              id='instagram'
              placeholder='Инстаграм' 
            />
          )}
          />
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
          <Controller
            name='whatsapp'
            control={control}
            render={({ field }) => (
            <Input 
              {...field} 
              id='whatsapp'
              placeholder='WhatsApp' 
            />
          )}
          />
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
          <Controller
            name='telegram'
            control={control}
            render={({ field }) => (
            <Input 
              {...field} 
              id='telegram'
              placeholder='Телеграм' 
            />
          )}
          />
      </InputGroup>
        </Col>
        </Col>
        <Col md={4} className='d-flex flex-column p-1'>
        <Col>
                <Label className='form-label' for='city'>
                Город<span className='text-danger'>*</span>
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
                Адрес<span className='text-danger'>*</span>
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
                Долгота<span className='text-danger'>*</span>
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
                Широта<span className='text-danger'>*</span>
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
        <Col className='mt-2'>
        <Button color='info' block >Выбрать на карте</Button>
        </Col>
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
          <Controller
            name='percentage'
            control={control}
            render={({ field }) => (
            <InputNumber 
              {...field} 
              id='percentage'
              name='percentage'
              placeholder='' 
              parser={parser}
              formatter={format}
              upHandler={<Plus />}
              downHandler={<Minus />}
              // defaultValue={0}
              max={100} 
              min={0}
            />
          )}
          />
        </div> 
        <div> 
        <Label className='form-label' for='percentService'>
        Обслуживание
          </Label>
          <Controller
            name='percentService'
            control={control}
            render={({ field }) => (
            <InputNumber 
              {...field} 
              id='percentService'
              name='percentService'
              placeholder='' 
              parser={parser}
              formatter={format}
              upHandler={<Plus />}
              downHandler={<Minus />}
              // defaultValue={0}
              max={100} 
              min={0}
            />
          )}
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
                    <Input 
                    name='deliverycost'
                    id='deliverycost' 
                    type='number' 
                    placeholder='' 
                    invalid={errors.deliverycost && true} {...field} />
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
                    <Input
                    name='avgcheck' 
                    id='avgcheck' 
                    type='number' 
                    placeholder='' 
                    invalid={errors.avgcheck && true} {...field} />
                  )}
        />
        {errors && errors.avgcheck && <FormFeedback>Пожалуйста введите cредний чек</FormFeedback>}
        </div>
        </Col>
        <Col>
      <Label className='form-label' for='priceLevel'>
      Уровень цен
          </Label>
          <Controller
            name='priceLevel'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                // defaultValue={initPriceLevel}
                classNamePrefix='select'
                options={storeTypeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.priceLevel === null })}
                {...field}
              />
            )}
          />
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
                <Button color='secondary' outline onClick={handleClose}>
                  Отменить
                </Button>
        </Col>
    </Row>
    </Form>
    <Modal isOpen={modalShow} toggle={toggleModal} className='modal-dialog-centered'>
      <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-4'>
        <Form className='auth-reset-password-form' onSubmit={event => handleChengPassword(event)}>
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  Новый пароль
                </Label>
                <InputPassword 
                className='input-group-merge' 
                id='new-password' 
                name='newPassword' 
                autoFocus 
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                />
              </div>
              <div className='mb-3'>
                <Label className='form-label' for='confirmPassword' name='confirmPassword'>
                  Подтвердите пароль
                </Label>
                <InputPassword 
                className='input-group-merge' 
                id='confirmPassword' 
                name='confirmPassword' 
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                invalid={!passwordsMatch && true}
                /> 
              {!passwordsMatch && <FormFeedback >Введенные пароли не совпадают</FormFeedback>}     
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