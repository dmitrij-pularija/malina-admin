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
import ModalPassword from "./ModalPassword"
import ModalІShifts from "./ModalІShifts"
import ModalІDelivery from "./ModalІDelivery"
import classnames from "classnames"
import { Plus, Minus } from "react-feather"
import {
  businessType,
  storeType,
  priceLevels
} from "../../../../../configs/initial"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
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
  const { selectedStore, categories, subcategories } = props

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
  const [categoryOptions, setCategoryOptions] = useState(initCategoryOptions())
  const [subcategoryOptions, setSubcategoryOptions] = useState(initSubcategoryOptions())
  const [modalShow, setModalShow] = useState(false)
  const [modalShiftsShow, setModalShiftsShow] = useState(false)
  const [modalDeliveryShow, setModalDeliveryShow] = useState(false)
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const values = {}

  useEffect(() => {
    if (selectedStore) {
      setAvatar(selectedStore.image)
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
    navigate("/apps/food/stores/list/")
  }

  const handleBusinessChange = (selectedOption) => {
    setValue("category", { value: "", label: "Выбирите категорию" })
    setValue("subcategory", { value: "", label: "Выбирите подкатегорию" })
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
    setValue("subcategory", { value: "", label: "Выбирите подкатегорию" })
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
      const formData = new FormData()
      formData.append("login", data.login)
      formData.append("business_address.name", data.address)
      formData.append("business_address.city", data.city)
      formData.append("business_address.longitude", data.longitude)
      formData.append("business_address.latitude", data.latitude)
      if (passwords.newPassword) formData.append("password", passwords.newPassword)
      if (data.name) formData.append("name", data.name)
      if (data.phone) formData.append("phone", data.phone)
      if (data.email) formData.append("email", data.email)
      if (data.type) formData.append("type", parseInt(data.type.value))
      if (data.business) formData.append("business_type", parseInt(data.business.value))
      if (data.percentage) formData.append("percentage", data.percentage)
      if (data.percentService) formData.append("service_charge", data.percentService)
      if (data.timeBeg) formData.append(
          "work_time_start",
          data.timeBeg
        )
      if (data.timeEnd) formData.append(
          "work_time_end",
          data.timeEnd
        )
      if (data.telegram) formData.append("telegram", data.telegram)
      if (data.instagram) formData.append("instagram", data.instagram)
      if (data.whatsapp) formData.append("whatsapp", data.whatsapp)
      if (data.adminTelegram) formData.append("admin_telegram_id", data.adminTelegram)
      if (data.slogan) formData.append("slogan", data.slogan)
      if (data.description) formData.append("description", data.description)
      if (data.avgcheck) formData.append("average_check", data.avgcheck)
      if (data.category) formData.append("category", data.category.value)
      if (data.subcategory) formData.append("subcategory", data.subcategory.value)
      if (data.priceLevel) formData.append("price_level", parseInt(data.priceLevel.value))
      if (data.merchantId) formData.append("merchant_id", data.merchantId)
      if (data.secretKey) formData.append("pay_secret_key", data.secretKey)
      if (data.isCardPaymentAllow) formData.append("is_card_payment_allow", data.isCardPaymentAllow)
      if (data.isStaff) formData.append("is_staff", data.isStaff)

      if (avatar && avatar.startsWith("data:image")) {
        const avatarBlob = dataURLtoBlob(avatar)
        formData.append("image", avatarBlob, "logo.jpg")
      }
      if (selectedStore) {
        dispatch(editStore({ id: selectedStore.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addStore(formData)).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      }
      // setAvatar("")
      // reset()
      // navigate("/apps/food/stores/list/")
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
                      Загрузить
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
                      Очистить
                    </Button>
                  </div>
                </div>
              </Col>
              <Col>
                <Label className="form-label" for="business">
                  Направление деятельности<span className="text-danger">*</span>
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
                      placeholder="Выберите направление"
                      className={classnames("react-select", {
                        "is-invalid": errors.business && true
                      })}
                    />
                  )}
                />
                {errors && errors.business && (
                  <FormFeedback>
                    Пожалуйста выберите направление деятельности
                  </FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="category">
                  Категория <span className="text-danger">*</span>
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
                      placeholder="Выберите категорию"
                      className={classnames("react-select", {
                        "is-invalid": errors.category && true
                      })}
                    />
                  )}
                />
                {errors && errors.category && (
                  <FormFeedback>Пожалуйста выберите категорию</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="subcategory">
                  Подкатегория
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
                      placeholder="Выберите подкатегорию"
                      className={classnames("react-select", {
                        "is-invalid": errors.subcategory && true
                      })}
                      {...field}
                    />
                  )}
                />
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
              <Col>
                <Label className="form-label" for="merchantId">
                  Id Merchant
                </Label>
                <Controller
                  name="merchantId"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="merchantId"
                      placeholder="Введите Merchant Id магазина"
                      invalid={errors.merchantId && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.merchantId && (
                  <FormFeedback>Пожалуйста Merchant Id магазина</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="adminTelegram">
                  Телеграм ID
                </Label>
                <Controller
                  name="adminTelegram"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="adminTelegram"
                      placeholder="Введите Телеграм ID"
                      invalid={errors.adminTelegram && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.adminTelegram && (
                  <FormFeedback>Введите пожалуйста Телеграм ID</FormFeedback>
                )}
              </Col>
            </Col>
            <Col md={4} className="d-flex flex-column p-1">
              <Col>
                <Label className="form-label" for="name">
                  Название<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Введите название заведения"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>Пожалуйста введите название</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      placeholder="Введите email"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.email && (
                  <FormFeedback>Пожалуйста введите email</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="phone">
                  Телефон
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      placeholder="Введите телефон"
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone && (
                  <FormFeedback>Пожалуйста введите телефон</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="login">
                  Логин<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="login"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="login"
                      placeholder="Введите Логин"
                      invalid={errors.login && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.login && (
                  <FormFeedback>Пожалуйста введите Логин</FormFeedback>
                )}
              </Col>
              <Col className="mt-3 pb-0">
                <Button color="warning" block onClick={toggleModal}>
                Введите пароль<span className="text-danger">*</span>
                </Button>
              </Col>

              <Col>
                <Label className="form-label" for="secretKey">
                  Secret Key
                </Label>
                <Controller
                  name="secretKey"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="secretKey"
                      placeholder="Введите Secret Key магазина"
                      invalid={errors.secretKey && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.secretKey && (
                  <FormFeedback>Пожалуйста Secret Key магазина</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="instagram">
                  Инстаграм
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
                        placeholder="Инстаграм"
                      />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Label className="form-label" for="whatsapp">
                  WhatsApp
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
                      <Input {...field} id="whatsapp" placeholder="WhatsApp" />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Label className="form-label" for="telegram">
                  Телеграм
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
                      <Input {...field} id="telegram" placeholder="Телеграм" />
                    )}
                  />
                </InputGroup>
              </Col>
            </Col>
            <Col md={4} className="d-flex flex-column p-1">
              <Col>
                <Label className="form-label" for="city">
                  Город<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="city"
                      placeholder="Введите город"
                      invalid={errors.city && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.city && (
                  <FormFeedback>Пожалуйста введите город</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="address">
                  Адрес<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="address"
                      placeholder="Введите адрес"
                      invalid={errors.address && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.address && (
                  <FormFeedback>Пожалуйста введите адрес</FormFeedback>
                )}
              </Col>
              <Col>
                <Label className="form-label" for="longitude">
                  Долгота<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="longitude"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="longitude"
                      placeholder="Введите долготу"
                      invalid={errors.longitude && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.longitude && (
                  <FormFeedback>Пожалуйста введите долготу</FormFeedback>
                )}
              </Col>
              <Col className="mb-5">
                <Label className="form-label" for="latitude">
                  Широта<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="latitude"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="latitude"
                      placeholder="Введите широту"
                      invalid={errors.latitude && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.latitude && (
                  <FormFeedback>Пожалуйста введите широту</FormFeedback>
                )}
              </Col>
              {/* <Col className="mt-2">
                <Button color="info" block>
                  Выбрать на карте
                </Button>
              </Col> */}
              <Col className="mt-1">
                <Label className="form-label" for="timeBeg">
                  Время работы
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
              <Col className="d-flex justify-content-center gap-30 mt-1">
                <div>
                  <Label className="form-label" for="percentage">
                    Скидка
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
                    Обслуживание
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
              <Col className="d-flex justify-content-between gap-30 mt-1">
                {/* <div>
                  <Label className="form-label" for="deliverycost">
                    Доставка, &#x0441;&#x332;
                  </Label>
                  <Controller
                    name="deliverycost"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="deliverycost"
                        id="deliverycost"
                        type="number"
                        placeholder=""
                        invalid={errors.deliverycost && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.deliverycost && (
                    <FormFeedback>
                      Пожалуйста введите cтоимость доставки
                    </FormFeedback>
                  )}
                </div> */}
                 <div>
                <Label className="form-label" for="priceLevel">
                  Уровень цен
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
                      placeholder="Уровень цен"
                      className={classnames("react-select", {
                        "is-invalid": errors.priceLevel && true
                      })}
                      {...field}
                    />
                  )}
                />
                </div>
                <div className="width-120" >
                  <Label className="form-label" for="avgcheck">
                    Средний чек, &#x0441;&#x332;
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
                        placeholder="0"
                        invalid={errors.avgcheck && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.avgcheck && (
                    <FormFeedback>Пожалуйста введите cредний чек</FormFeedback>
                  )}
                </div>
              {/* </Col>
              <Col> */}
             
              </Col>
          <Col className="mt-1">
          <div className='form-check form-check-primary'>
          <Controller
            name='isCardPaymentAllow'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='isCardPaymentAllow'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='isCardPaymentAllow'>
          Оплата картой разрешена
          </Label>
        </div>
              </Col> 
          <Col className="mt-1">
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
          Персонал
          </Label>
        </div>
              </Col>         
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column mt-2" sm="12">
            <Label className="form-label" for="slogan">
              Слоган
            </Label>
            <Controller
              name="slogan"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="slogan"
                  placeholder="Введите слоган"
                  invalid={errors.slogan && true}
                  {...field}
                />
              )}
            />
            {errors && errors.slogan && (
              <FormFeedback>Пожалуйста введите слоган</FormFeedback>
            )}
          </Col>
          <Col className="d-flex flex-column mt-2" sm="12">
            <Label className="form-label" for="description">
              Описание
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="description"
                  type="textarea"
                  placeholder="Введите описание"
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
            {errors && errors.description && (
              <FormFeedback>Пожалуйста введите описание</FormFeedback>
            )}
          </Col>
          <Col className="d-flex justify-content-center mt-2 gap-10" sm="12">
            <Button type="submit" color="primary">
              Сохранить
            </Button>
            <Button color="secondary" outline onClick={handleClose}>
              Отменить
            </Button>
            {selectedStore && <><Button color="secondary" outline onClick={toggleModalShifts}>
              Смены
            </Button>
            <Button color="secondary" outline onClick={toggleModalDelivery}>
              Тарифы доставки
            </Button>
            </>}
          </Col>
        </Row>
      </Form>
      <ModalPassword isOpen={modalShow} toggle={toggleModal} onChange={handlePasswordChange} chengPassword={handleChengPassword} passwords={passwords} passwordsMatch={passwordsMatch} />
      <ModalІShifts isOpen={modalShiftsShow} toggle={toggleModalShifts} />
      <ModalІDelivery isOpen={modalDeliveryShow} toggle={toggleModalDelivery} business={selectedStore ? selectedStore.id : null}/>
    </>
  )
}

export default Store