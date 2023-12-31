import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import InputNumber from "rc-input-number"
import Flatpickr from "react-flatpickr"
import InputPassword from "@components/input-password-toggle"
import Avatar from "@components/avatar"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { selectThemeColors, formatTime, formatTimeSave, formatStringTime, dataURLtoBlob, checkIsValid } from "@utils"
import { addStore, editStore } from "../store"
import ModalMap from '../../../../../@core/components/map/ModalMap'
import ModalPassword from "./ModalPassword"
import ModalІShifts from "./ModalІShifts"
import ModalІDelivery from "./ModalІDelivery"
import ModalGalery from "./ModalGalery"
import classnames from "classnames"
import { Plus, Minus } from "react-feather"
import {
  businessType,
  storeType,
  priceLevels
} from "../../../../../configs/initial"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
import '@styles/react/libs/input-number/input-number.scss'
import telegramIcon from "@src/assets/images/icons/social/telegram.svg"
import instagramIcon from "@src/assets/images/icons/social/instagram.svg"
import whatsappIcon from "@src/assets/images/icons/social/whatsapp.svg"
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
  FormFeedback,
} from "reactstrap"

const defaultValues = {
  name: "",
  login: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  longitude: "",
  latitude: "",
  merchantId: "",
  secretKey: "",
  adminTelegram: "",
  telegram: "",
  instagram: "",
  whatsapp: "",
  percentage: 0,
  percentService: 0,
  avgcheck: "",
  slogan: "",
  description: "",
  business: "",
  type: "",
  category: "",
  subcategory: "",
  priceLevel: "",
  timeBeg: "",
  timeEnd: "",
  isCardPaymentAllow: false,
  isStaff: false
}



const requiredFields = [
  "name",
  "login",
  "city",
  "address",
  "longitude",
  "latitude",
  "business",
  "category"
]
// const checkIsValid = (data) => {
//   return Object.keys(data).every((key) => {
//     const field = data[key]
//     if (requiredFields.includes(key)) {
//       if (typeof field === "object") {
//         return field.value !== ""
//       } else {
//         return field.length > 0
//       }
//     } else {
//       return true
//     }
//   })
// }

const renderLogo = (avatar, name) => {
  if (avatar) {
    return (
      <img
        className="img-fluid rounded mt-3 mb-2"
        src={avatar}
        alt={name ? name : "Логотип заведения"}
        height="150px"
        width="150px"
        // width="267px"
        style={{
          height: "150px",
          width: "150px"
          // width: "267px"
        }}
      />
    )
  } else {
    return (
      <Avatar
        initials
        color={"light-primary"}
        className="rounded mt-3 mb-2"
        content={name ? name : "Malina"}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(64px)",
          width: "100%",
          height: "100%"
        }}
        style={{
          height: "150px",
          width: "150px"
          // width: "267px"
        }}
      />
    )
  }
}

const Store = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData, selectedStore, categories, subcategories, t } = props

  const businessTypeOptions = Object.keys(businessType).map((key) => ({
    value: parseInt(key),
    label: businessType[key],
  }))

  const storeTypeOptions = Object.keys(storeType).map((key) => ({
    value: parseInt(key),
    label: storeType[key],
  }))

  const priceLevelOptions = Object.keys(priceLevels).map((key) => ({
    value: parseInt(key),
    label: priceLevels[key]
  }))

  const initCategoryOptions = () => {
    const filteredCategories = selectedStore ? categories.filter(
      (category) => parseInt(category.category_type) === parseInt(selectedStore.business_type)
    ) : categories
    return filteredCategories.map((category) => ({
    value: String(category.id),
    label: category.name
  }))
}

  const initSubcategoryOptions = () => {
    const filteredSubCategories = selectedStore ? subcategories.filter(
      (subcategory) => parseInt(subcategory.category) === parseInt(selectedStore.category)
    ) : subcategories
    return filteredSubCategories.map((subcategory) => ({
    value: String(subcategory.id),
    label: subcategory.name
  }))
}

  const [avatar, setAvatar] = useState("")
  const [mapOpen, setMapOpen] = useState(false)
  // const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const [categoryOptions, setCategoryOptions] = useState(initCategoryOptions())
  const [subcategoryOptions, setSubcategoryOptions] = useState(initSubcategoryOptions())
  const [modalShow, setModalShow] = useState(false)
  const [modalGaleryShow, setModalGaleryShow] = useState(false)
  const [modalShiftsShow, setModalShiftsShow] = useState(false)
  const [modalDeliveryShow, setModalDeliveryShow] = useState(false)
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [cardPaymentAllow, setCardPaymentAllow] = useState(false)
  
  const values = {}

  useEffect(() => {
    if (selectedStore) {
      setAvatar(selectedStore.avatar)
      setCardPaymentAllow(selectedStore.is_card_payment_allow)
      values.name = selectedStore.name ? selectedStore.name : defaultValues.name
      values.login = selectedStore.login ? selectedStore.login : defaultValues.login
      values.email = selectedStore.email ? selectedStore.email : defaultValues.email
      values.phone = selectedStore.phone ? selectedStore.phone : defaultValues.phone
      values.city = selectedStore.business_address ? selectedStore.business_address.city : defaultValues.city
      values.address = selectedStore.business_address ? selectedStore.business_address.name : defaultValues.address
      values.longitude = selectedStore.business_address ? selectedStore.business_address.longitude : defaultValues.longitude
      values.latitude = selectedStore.business_address ? selectedStore.business_address.latitude : defaultValues.latitude
      values.merchantId = selectedStore.merchant_id ? selectedStore.merchant_id : defaultValues.merchantId
      values.secretKey = selectedStore.pay_secret_key ? selectedStore.pay_secret_key : defaultValues.secretKey
      values.adminTelegram = selectedStore.admin_telegram_id ? selectedStore.admin_telegram_id : defaultValues.adminTelegram
      values.telegram = selectedStore.telegram ? selectedStore.telegram : defaultValues.telegram
      values.instagram = selectedStore.instagram ? selectedStore.instagram : defaultValues.instagram
      values.whatsapp = selectedStore.whatsapp ? selectedStore.whatsapp : defaultValues.whatsapp
      values.percentage = selectedStore.percentage ? selectedStore.percentage : defaultValues.percentage
      values.percentService = selectedStore.service_charge ? selectedStore.service_charge : defaultValues.percentService
      values.avgcheck = selectedStore.average_check ? selectedStore.average_check : defaultValues.avgcheck
      values.slogan = selectedStore.slogan ? selectedStore.slogan : defaultValues.slogan
      values.description = selectedStore.description ? selectedStore.description : defaultValues.description
      values.isCardPaymentAllow = selectedStore.is_card_payment_allow ? selectedStore.is_card_payment_allow : defaultValues.isCardPaymentAllow
      values.isStaff = selectedStore.is_staff ? selectedStore.is_staff : defaultValues.isStaff
      
      values.business = selectedStore.business_type ? businessTypeOptions[
            businessTypeOptions.findIndex(
              (i) => parseInt(i.value) === parseInt(selectedStore.business_type)
            )
          ] : defaultValues.business
      values.type = selectedStore.type ? storeTypeOptions[
            storeTypeOptions.findIndex(
              (i) => parseInt(i.value) === parseInt(selectedStore.type)
            )
          ]  : defaultValues.type
      values.category = selectedStore.category ? categoryOptions[
            categoryOptions.findIndex(
              (i) => parseInt(i.value) === parseInt(selectedStore.category)
            )
          ] : defaultValues.category
      values.subcategory = selectedStore.subcategory ? subcategoryOptions[
            subcategoryOptions.findIndex(
              (i) => parseInt(i.value) === parseInt(selectedStore.subcategory)
            )
          ] : defaultValues.subcategory
      values.priceLevel = selectedStore.price_level ? priceLevelOptions[
            priceLevelOptions.findIndex(
              (i) => parseInt(i.value) === parseInt(selectedStore.price_level)
            )
          ] : defaultValues.priceLevel
      values.timeBeg = selectedStore.work_time_start ? formatStringTime(selectedStore.work_time_start) : ""
      values.timeEnd = selectedStore.work_time_end ? formatStringTime(selectedStore.work_time_end) : ""
    }
  }, [selectedStore])




  const handlePasswordChange = (event) => {
    const { name, value } = event.target
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value
    }))

    if (name === "confirmPassword") setPasswordsMatch(passwords.newPassword === value)
  }

  const handleImgReset = () => setAvatar("")
  const toggleModal = () => setModalShow(!modalShow)
  const toggleModalGalery = () => setModalGaleryShow(!modalGaleryShow)
  const toggleModalShifts = () => setModalShiftsShow(!modalShiftsShow)
  const toggleModalDelivery = () => setModalDeliveryShow(!modalDeliveryShow)

  const handleChengPassword = (event) => {
    event.preventDefault()
    if (passwordsMatch) toggleModal()
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const format = (num) => {
    return `${numberWithCommas(num)} %`
  }

  const parser = (num) => {
    const cells = num.toString().split(" ")
    if (!cells[1]) {
      return num
    }

    const parsed = cells[1].replace(/,*/g, "")

    return parsed
  }
  const handleImg = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // const dataURLtoBlob = (dataURL) => {
  //   const arr = dataURL.split(",")
  //   const mime = arr[0].match(/:(.*?);/)[1]
  //   const bstr = atob(arr[1])
  //   let n = bstr.length
  //   const u8arr = new Uint8Array(n)

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n)
  //   }

  //   return new Blob([u8arr], { type: mime })
  // }

  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const toggleMap = () => setMapOpen(!mapOpen)
  const handleCoordinateSelected = coords => {
    if (coords && coords.length && coords[0]) {
    setValue('latitude', coords[0])
    setValue('longitude', coords[1])
  }
  }

  useEffect(() => {
    if (categories.length) {
    const filteredCategories = selectedStore ? categories.filter(
      (category) => parseInt(category.category_type) === parseInt(selectedStore.business_type)
    ) : categories
    
    const newOption = filteredCategories.map((category) => ({
        value: String(category.id),
        label: category.name
      }))
    setCategoryOptions(newOption)
    setValue("category", 
    selectedStore ? newOption[
      newOption.findIndex(
        (i) => parseInt(i.value) === parseInt(selectedStore.category)
      )
    ] : ''
    )
  }

}, [categories])

  const handleClose = () => {
    setAvatar("")
    reset()
    navigate(userData.type === 2 ? `/apps/food/stores/view/${userData.id}` : "/apps/food/stores/list/")
  }

  const handleBusinessChange = (selectedOption) => {
    setValue("category", { value: "", label: t('categoryPlaceholder') })
    setValue("subcategory", { value: "", label: t('subcategoryPlaceholder') })
    const filteredCategories = categories.filter(
      (category) => parseInt(category.category_type) === parseInt(selectedOption.value)
    )
    setCategoryOptions(
      filteredCategories.map((category) => ({
        value: String(category.id),
        label: category.name
      }))
    )
    setValue("business", selectedOption)
  }

  const handleCategoryChange = (selectedOption) => {
    setValue("subcategory", { value: "", label: t('subcategoryPlaceholder') })
    const filteredSubCategories = subcategories.filter(
      (subcategory) => parseInt(subcategory.category) === parseInt(selectedOption.value)
    )
    setSubcategoryOptions(
      filteredSubCategories.map((subcategory) => ({
        value: String(subcategory.id),
        label: subcategory.name
      }))
    )
    setValue("category", selectedOption)
  }

  const onSubmit = (data) => {
    // console.log(data)
    if (checkIsValid(data, requiredFields)) {
      if (!passwords.newPassword && !selectedStore) return toggleModal()
      const newData = {}
      newData.business_address = {}
      newData.login = data.login
      newData.business_address.name = data.address
      newData.business_address.city = data.city
      newData.business_address.longitude = data.longitude
      newData.business_address.latitude = data.latitude
      if (passwords.newPassword) newData.password = passwords.newPassword
      if (data.name) newData.name = data.name
      if (data.phone) newData.phone = data.phone
      if (data.email) newData.email = data.email
      if (data.type) newData.type = parseInt(data.type.value)
      if (data.business) newData.business_type = parseInt(data.business.value)
      if (data.percentage) newData.percentage = data.percentage
      if (data.percentService) newData.service_charge = data.percentService
      if (data.timeBeg) newData.work_time_start = data.timeBeg
      if (data.timeEnd) newData.work_time_end = data.timeEnd
      if (data.telegram) newData.telegram = data.telegram
      if (data.instagram) newData.instagram = data.instagram
      if (data.whatsapp) newData.whatsapp = data.whatsapp
      if (data.adminTelegram) newData.admin_telegram_id = data.adminTelegram
      if (data.slogan) newData.slogan = data.slogan
      if (data.description) newData.description = data.description
      if (data.avgcheck) newData.average_check = data.avgcheck
      if (data.category) newData.category = data.category.value
      if (data.subcategory) newData.subcategory = data.subcategory.value
      if (data.priceLevel) newData.price_level = parseInt(data.priceLevel.value)
      if (data.isCardPaymentAllow) {
        newData.is_card_payment_allow = data.isCardPaymentAllow
        if (data.merchantId) newData.merchant_id = data.merchantId
        if (data.secretKey) newData.pay_secret_key = data.secretKey
      } else {
        newData.merchant_id = ""
        newData.pay_secret_key = ""
      }
      if (data.isStaff) newData.is_staff = data.isStaff

      if (selectedStore) {
        dispatch(editStore({ id: selectedStore.id, store: newData, avatar })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addStore({ store: newData, avatar })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} className="d-flex">
            <Col md={4} xs={12} className="d-flex flex-column p-1">
              <Col>
                <div className="d-flex align-items-center justify-content-center">
                  {renderLogo(
                    avatar,
                    selectedStore ? selectedStore.name : "Malina"
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-center mt-75">
                  <div>
                    <Button
                      tag={Label}
                      className="mb-75 me-75"
                      size="sm"
                      color="primary"
                    >
                    {t('download')}
                      <Input
                        type="file"
                        onChange={handleImg}
                        hidden
                        accept="image/*"
                      />
                    </Button>
                    <Button
                      className="mb-75"
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleImgReset}
                    >
                      {t('clear')}
                    </Button>
                  </div>
                </div>
              </Col>
              <Col className="mt-4">
                <Label className="form-label" for="business">
                {t('StoreData.businessLabel')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="business"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      id="business"
                      name="business"
                      onChange={handleBusinessChange}
                      isClearable={false}
                      value={field.value}
                      classNamePrefix="select"
                      options={businessTypeOptions}
                      theme={selectThemeColors}
                      placeholder={t('StoreData.businessPlaceholder')}
                      className={classnames("react-select", {
                        "is-invalid": errors.business && true
                      })}
                    />
                  )}
                />
                {errors && errors.business && (
                  <FormFeedback>
                    {t('StoreData.businessFeedback')}
                  </FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="category">
                {t('Category')} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      id="category"
                      name="category"
                      isDisabled={!getValues("business").value}
                      isClearable={false}
                      value={field.value}
                      classNamePrefix="select"
                      options={categoryOptions}
                      theme={selectThemeColors}
                      onChange={handleCategoryChange}
                      placeholder={t('categoryPlaceholder')}
                      className={classnames("react-select", {
                        "is-invalid": errors.category && true
                      })}
                    />
                  )}
                />
                {errors && errors.category && (
                  <FormFeedback>{t('categoryFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="subcategory">
                {t('subcategoryLabel')}
                </Label>
                <Controller
                  name="subcategory"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      isDisabled={!getValues("category").value}
                      isClearable={false}
                      classNamePrefix="select"
                      options={subcategoryOptions}
                      theme={selectThemeColors}
                      placeholder={t('subcategoryPlaceholder')}
                      className={classnames("react-select", {
                        "is-invalid": errors.subcategory && true
                      })}
                      {...field}
                    />
                  )}
                />
                {errors && errors.subcategory && (
                  <FormFeedback>{t('subcategoryFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="priceLevel">
                {t('StoreData.priceLevelLabel')}
                </Label>
                <Controller
                  name="priceLevel"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      isClearable={false}
                      classNamePrefix="select"
                      options={priceLevelOptions}
                      theme={selectThemeColors}
                      placeholder={t('StoreData.priceLevelPlaceholder')}
                      className={classnames("react-select", {
                        "is-invalid": errors.priceLevel && true
                      })}
                      {...field}
                    />
                  )}
                />
                       {errors && errors.priceLevel && (
                  <FormFeedback>{t('StoreData.priceLevelFeedback')}</FormFeedback>
                )}
                </Col>
                <Col>
                  <Label className="form-label" for="avgcheck">
                  {t('StoreData.avgcheckLabel')}&#x0441;&#x332;
                  </Label>
                  <Controller
                    name="avgcheck"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="avgcheck"
                        id="avgcheck"
                        type="number"
                        placeholder=""
                        invalid={errors.avgcheck && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.avgcheck && (
                    <FormFeedback>{t('StoreData.avgcheckFeedback')}</FormFeedback>
                  )}
              {/* </Col>
              <Col> */}
             
              </Col>
              {/* <Col>
                <Label className="form-label" for="type">
                  Тип заведения <span className="text-danger">*</span>
                </Label>
                <Controller
                  id="type"
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      id="type"
                      name="type"
                      isClearable={false}
                      classNamePrefix="select"
                      options={storeTypeOptions}
                      theme={selectThemeColors}
                      placeholder="Выбирите тип заведения"
                      className={classnames("react-select", {
                        "is-invalid": errors.type && true
                      })}
                      {...field}
                    />
                  )}
                />
                {errors && errors.type && (
                  <FormFeedback>Пожалуйста выберите тип заведения</FormFeedback>
                )}
              </Col> */}
              
              
            </Col>
            <Col md={4} className="d-flex flex-column p-1">
              <Col>
                <Label className="form-label" for="name">
                {t('StoreData.nameLabel')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder={t('StoreData.namePlaceholder')}
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>{t('StoreData.nameFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="email">
                {t('Email')}
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      placeholder={t('EmailPlaceholder')}
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.email && (
                  <FormFeedback>{t('EmailFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="phone">
                {t('phone')}
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      placeholder={t('phonePlaceholder')}
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone && (
                  <FormFeedback>{t('phoneFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="login">
                {t('loginLabel')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="login"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="login"
                      placeholder={t('loginPlaceholder')}
                      invalid={errors.login && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.login && (
                  <FormFeedback>{t('loginPlaceholder')}</FormFeedback>
                )}
              </Col>
                <Button className="mt-1 mb-1" color="warning" block onClick={toggleModal}>
                {t('password')}<span className="text-danger">*</span>
                </Button>
              <Col className="mt-0">
                <Label className="form-label" for="instagram">
                {t('StoreData.instagramLabel')}
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText>
                    <img
                      className={classnames("img-fluid", "bg-transparent")}
                      src={instagramIcon}
                      alt={"Инстаграм"}
                      height="18"
                      width="18"
                    />
                  </InputGroupText>
                  <Controller
                    name="instagram"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="instagram"
                        placeholder={t('StoreData.instagramPlaceholder')}
                      />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Label className="form-label" for="whatsapp">
                {t('StoreData.whatsappLabel')}
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText>
                    <img
                      className={classnames("img-fluid", "bg-transparent")}
                      src={whatsappIcon}
                      alt={"WhatsApp"}
                      height="18"
                      width="18"
                    />
                  </InputGroupText>
                  <Controller
                    name="whatsapp"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input {...field} id="whatsapp" placeholder={t('StoreData.whatsappPlaceholder')} />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Label className="form-label" for="telegram">
                {t('StoreData.telegramLabel')}
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText>
                    <img
                      className={classnames("img-fluid", "bg-transparent")}
                      src={telegramIcon}
                      alt={"Telegram"}
                      height="18"
                      width="18"
                    />
                  </InputGroupText>
                  <Controller
                    name="telegram"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input {...field} id="telegram" placeholder={t('StoreData.telegramPlaceholder')} />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col className="d-flex justify-content-center gap-30 mt-1">
                <div>
                  <Label className="form-label" for="percentage">
                  {t('Discount')}
                  </Label>
                  <Controller
                    name="percentage"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        id="percentage"
                        name="percentage"
                        placeholder=""
                        parser={parser}
                        formatter={format}
                        upHandler={<Plus />}
                        downHandler={<Minus />}
                        max={100}
                        min={0}
                      />
                    )}
                  />
                </div>
                <div>
                  <Label className="form-label" for="percentService">
                  {t('StoreData.percentService')}
                  </Label>
                  <Controller
                    name="percentService"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        id="percentService"
                        name="percentService"
                        placeholder=""
                        parser={parser}
                        formatter={format}
                        upHandler={<Plus />}
                        downHandler={<Minus />}
                        max={100}
                        min={0}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col className='mt-2' >
          <div className='form-check form-check-primary'>
          <Controller
            name='isStaff'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='isStaff'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='isStaff'>
          {t('StoreData.isStaff')}
          </Label>
        </div>
          </Col>
            </Col>
            <Col md={4} className="d-flex flex-column p-1">
              <Col>
                <Label className="form-label" for="city">
                {t('City')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="city"
                      placeholder={t('cityPlaceholder')}
                      invalid={errors.city && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.city && (
                  <FormFeedback>{t('cityFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="address">
                {t('Address')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="address"
                      placeholder={t('addressPlaceholder')}
                      invalid={errors.address && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.address && (
                  <FormFeedback>{t('addressFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="longitude">
                {t('longitude')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="longitude"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      disabled
                      id="longitude"
                      placeholder={t('longitudePlaceholder')}
                      invalid={errors.longitude && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.longitude && (
                  <FormFeedback>{t('longitudeFeedback')}</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="latitude">
                {t('latitude')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="latitude"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      disabled
                      id="latitude"
                      placeholder={t('latitudePlaceholder')}
                      invalid={errors.latitude && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.latitude && (
                  <FormFeedback>{t('latitudeFeedback')}</FormFeedback>
                )}
              </Col>
              <Col className="mt-1">
                <Button color="info" block onClick={() => toggleMap()}>
                {t('SelectOnMap')}
                </Button>
              </Col>
              <Col>
                <Label className="form-label mt-2" for="timeBeg">
                {t('StoreData.workTime')}
                </Label>
                <div className="d-flex justify-content-center align-items-center gap-10">
                  <div>
                    <Controller
                      id="timeBeg"
                      name="timeBeg"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Flatpickr
                          className="form-control width-70"
                          value={field.value}
                          id="timeBeg"
                          name="timeBeg"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          onChange={(date) => setValue("timeBeg", formatTimeSave(date))}
                        />
                      )}
                    />
                  </div>
                  <Minus size={14} />
                  <div>
                    <Controller
                      id="timeEnd"
                      name="timeEnd"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Flatpickr
                          className="form-control width-70"
                          value={field.value}
                          id="timeEnd"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          onChange={(date) => setValue("timeEnd", formatTimeSave(date))}
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
              
          <Col>
                <Label className="form-label" for="adminTelegram">
                {t('StoreData.telegramIdLabel')}
                </Label>
                <Controller
                  name="adminTelegram"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="adminTelegram"
                      placeholder={t('StoreData.telegramIdPlaceholder')}
                      invalid={errors.adminTelegram && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.adminTelegram && (
                  <FormFeedback>{t('StoreData.telegramIdFeedback')}</FormFeedback>
                )}
              </Col>
          <div className="d-flex flex-column justify-content-between h-100">         
          <Col className="mt-2">
          <div className='form-check form-check-primary'>
          <Controller
            name='isCardPaymentAllow'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input 
              id='isCardPaymentAllow'  
              type='checkbox' 
              checked={field.value} 
              onChange={(e) => {
                field.onChange(e)
                setCardPaymentAllow(e.target.checked)
              }}
              />
            )}
          />
          <Label className='form-label' for='isCardPaymentAllow'>
          {t('StoreData.isCardPaymentAllow')}
          </Label>
        </div>
        </Col>
        {cardPaymentAllow && <Col>
                <Label className="form-label" for="merchantId">
                {t('StoreData.merchantIdLabel')}
                </Label>
                <Controller
                  name="merchantId"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="merchantId"
                      placeholder={t('StoreData.merchantIdPlaceholder')}
                      invalid={errors.merchantId && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.merchantId && (
                  <FormFeedback>{t('StoreData.merchantIdFeedback')}</FormFeedback>
                )}
              </Col>} 
        {cardPaymentAllow && <Col>
                <Label className="form-label" for="secretKey">
                {t('StoreData.secretKeyLabel')}
                </Label>
                <Controller
                  name="secretKey"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="secretKey"
                      placeholder={t('StoreData.secretKeyPlaceholder')}
                      invalid={errors.secretKey && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.secretKey && (
                  <FormFeedback>{t('StoreData.secretKeyFeedback')}</FormFeedback>
                )}
              </Col>}
              </div>          
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column mt-2" sm="12">
            <Label className="form-label" for="slogan">
            {t('StoreData.sloganLabel')}
            </Label>
            <Controller
              name="slogan"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="slogan"
                  placeholder={t('StoreData.sloganPlaceholder')}
                  invalid={errors.slogan && true}
                  {...field}
                />
              )}
            />
            {errors && errors.slogan && (
              <FormFeedback>{t('StoreData.sloganFeedback')}</FormFeedback>
            )}
          </Col>
          <Col className="d-flex flex-column mt-2" sm="12">
            <Label className="form-label" for="description">
            {t('descriptionLabel')}
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="description"
                  type="textarea"
                  placeholder={t('descriptionPlaceholder')}
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
            {errors && errors.description && (
              <FormFeedback>{t('descriptionFeedback')}</FormFeedback>
            )}
          </Col>
          <Col className="d-flex justify-content-center mt-2 gap-10" sm="12">
            <Button type="submit" color="primary">
            {t('save')}
            </Button>
            <Button color="secondary" outline onClick={handleClose}>
            {t('cancel')}
            </Button>
            {selectedStore && <><Button color="secondary" outline onClick={toggleModalShifts}>
            {t('StoreData.Shifts')}
            </Button>
            <Button color="secondary" outline onClick={toggleModalDelivery}>
            {t('StoreData.DeliveryTarif')}
            </Button>
            <Button color="secondary" outline onClick={toggleModalGalery}>
            {t('Galery')}
            </Button>
            </>}
          </Col>
        </Row>
      </Form>
      <ModalMap isOpen={mapOpen} toggle={toggleMap} onCoordinateSelected={handleCoordinateSelected} selectedAddres={selectedStore && selectedStore.business_address ? selectedStore.business_address : null} />
      <ModalPassword isOpen={modalShow} toggle={toggleModal} onChange={handlePasswordChange} chengPassword={handleChengPassword} passwords={passwords} passwordsMatch={passwordsMatch} t={t} />
      <ModalGalery id={selectedStore ? selectedStore.id : ''} isOpen={modalGaleryShow} toggle={toggleModalGalery} data={selectedStore ? selectedStore.images : ''} t={t} />
      <ModalІShifts isOpen={modalShiftsShow} toggle={toggleModalShifts} business={selectedStore ? selectedStore.id : ''} t={t} />
      <ModalІDelivery isOpen={modalDeliveryShow} toggle={toggleModalDelivery} business={selectedStore ? selectedStore.id : ''} t={t} />
    </>
  )
}

export default Store