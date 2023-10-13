import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SwiperImages from "./swiper"
import InputNumber from "rc-input-number"
import Flatpickr from "react-flatpickr"
import { getAllCategories } from "../../categories/store"
// import { delImages } from "../store"
// import InputPassword from "@components/input-password-toggle"
import Avatar from "@components/avatar"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { useRTL } from '@hooks/useRTL'
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow
} from 'swiper'
import { selectThemeColors, formatTime, formatTimeSave, dataURLtoBlob, checkIsValid } from "@utils"
import { addProduct, editProduct, delImages } from "../store"
// import ModalPassword from "./ModalPassword"
// import ModalІShifts from "./ModalІShifts"
import classnames from "classnames"
import { Plus, Minus } from "react-feather"
import '@styles/react/libs/swiper/swiper.scss'
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormFeedback
} from "reactstrap"

SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const defaultValues = {
  name: "",
  description: "",
  category: "",
  cost: "",
  isLongCooking: "",
  cookingTime: "",
  longCookingMessage: "",
  isArchived: "",
  requiresContainer: "",
  composition: "",
  gram: "",
  kcal: "",
  proteins: "",
  fats: "",
  carbohydrates: "",
  primeCost: "",
  supplier: "",
  appliancePrice: "",
  containerPrice: ""
}

const requiredFields = ["name", "cost"]

const ProductDetails = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isRtl] = useRTL()
  const { categories, store, selectedProduct } = props

  const initCategoryOptions = () => {
    const filteredCategories = categories.filter(
      category => parseInt(category.supplier) === parseInt(store)
    )
    return filteredCategories.map((category) => ({
    value: String(category.id),
    label: category.name
  }))
}
// const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
// const supplierOptions = filtredStore.map((store) => ({
//   value: String(store.id),
//   label: store.name
// }))

//   const initSubcategoryOptions = () => {
//     const filteredSubCategories = selectedProduct ? subcategories.filter(
//       (subcategory) => parseInt(subcategory.category) === parseInt(selectedProduct.category)
//     ) : subcategories
//     return filteredSubCategories.map((subcategory) => ({
//     value: String(subcategory.id),
//     label: subcategory.name
//   }))
// }

  const [galery, setGalery] = useState(selectedProduct && selectedProduct.images.length ? selectedProduct.images : [])
  const [categoryOptions, setCategoryOptions] = useState(initCategoryOptions())
  // const galery = selectedProduct && selectedProduct.images.length ? selectedProduct.images : []
  
  useEffect(() => {
    setCategoryOptions(initCategoryOptions())
  }, [categories])

  useEffect(() => {
    setGalery(selectedProduct && selectedProduct.images.length ? selectedProduct.images : [])
  }, [selectedProduct])
  
  // const [subcategoryOptions, setSubcategoryOptions] = useState(initSubcategoryOptions())
  // const [modalShow, setModalShow] = useState(false)
  // const [modalShiftsShow, setModalShiftsShow] = useState(false)
  // const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" })
  // const [passwordsMatch, setPasswordsMatch] = useState(true)
  const values = selectedProduct ? {
  name: selectedProduct.name ? selectedProduct.name : "",
  description: selectedProduct.description ? selectedProduct.description : "",
  category: selectedProduct.category ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedProduct.category.id))] : '',
  cost: selectedProduct.cost ? selectedProduct.cost : "",
  isLongCooking: selectedProduct.is_long_cooking,
  cookingTime: selectedProduct.cooking_time ? selectedProduct.cooking_time : "",
  longCookingMessage: selectedProduct.long_cooking_message ? selectedProduct.long_cooking_message : "",
  isArchived: selectedProduct.is_archived,
  requiresContainer: selectedProduct.requires_container,
  composition: selectedProduct.composition ? selectedProduct.composition : "",
  gram: selectedProduct.gram ? selectedProduct.gram : "",
  kcal: selectedProduct.kcal ? selectedProduct.kcal : "",
  proteins: selectedProduct.proteins ? selectedProduct.proteins : "",
  fats: selectedProduct.fats ? selectedProduct.fats : "",
  carbohydrates: selectedProduct.carbohydrates ? selectedProduct.carbohydrates : "",
  primeCost: selectedProduct.prime_cost ? selectedProduct.prime_cost : "",
  supplier: store,
  // supplier: selectedProduct.supplier ? supplierOptions[supplierOptions.findIndex(i => parseInt(i.value) === parseInt(selectedProduct.supplier.id))] : '',
  appliancePrice: selectedProduct.appliance_price ? selectedProduct.appliance_price : "",
  containerPrice: selectedProduct.container_price ? selectedProduct.container_price : ""
  } : {}
   
  // useEffect(() => {
  //   if (selectedProduct) {
  //     setAvatar(selectedProduct.image)
  //     values.name = selectedProduct.name ? selectedStore.name : defaultValues.name
  //     values.login = selectedStore.login ? selectedStore.login : defaultValues.login
  //     values.email = selectedStore.email ? selectedStore.email : defaultValues.email
  //     values.phone = selectedStore.phone ? selectedStore.phone : defaultValues.phone
  //     values.city = selectedStore.business_address ? selectedStore.business_address.city : defaultValues.city
  //     values.address = selectedStore.business_address ? selectedStore.business_address.name : defaultValues.address
  //     values.longitude = selectedStore.business_address ? selectedStore.business_address.longitude : defaultValues.longitude
  //     values.latitude = selectedStore.business_address ? selectedStore.business_address.latitude : defaultValues.latitude
  //     values.merchantId = selectedStore.merchant_id ? selectedStore.merchant_id : defaultValues.merchantId
  //     values.secretKey = selectedStore.pay_secret_key ? selectedStore.pay_secret_key : defaultValues.secretKey
  //     values.adminTelegram = selectedStore.admin_telegram_id ? selectedStore.admin_telegram_id : defaultValues.adminTelegram
  //     values.telegram = selectedStore.telegram ? selectedStore.telegram : defaultValues.telegram
  //     values.instagram = selectedStore.instagram ? selectedStore.instagram : defaultValues.instagram
  //     values.whatsapp = selectedStore.whatsapp ? selectedStore.whatsapp : defaultValues.whatsapp
  //     values.percentage = selectedStore.percentage ? selectedStore.percentage : defaultValues.percentage
  //     values.percentService = selectedStore.service_charge ? selectedStore.service_charge : defaultValues.percentService
  //     values.deliverycost = 0
  //     values.avgcheck = selectedStore.average_check ? selectedStore.average_check : defaultValues.avgcheck
  //     values.slogan = selectedStore.slogan ? selectedStore.slogan : defaultValues.slogan
  //     values.description = selectedStore.description ? selectedStore.description : defaultValues.description
  //     values.business = selectedStore.business_type ? businessTypeOptions[
  //           businessTypeOptions.findIndex(
  //             (i) => parseInt(i.value) === parseInt(selectedStore.business_type)
  //           )
  //         ] : defaultValues.business
  //     values.type = selectedStore.type ? storeTypeOptions[
  //           storeTypeOptions.findIndex(
  //             (i) => parseInt(i.value) === parseInt(selectedStore.type)
  //           )
  //         ]  : defaultValues.type
  //     values.category = selectedStore.category ? categoryOptions[
  //           categoryOptions.findIndex(
  //             (i) => parseInt(i.value) === parseInt(selectedStore.category)
  //           )
  //         ] : defaultValues.category
  //     values.subcategory = selectedStore.subcategory ? subcategoryOptions[
  //           subcategoryOptions.findIndex(
  //             (i) => parseInt(i.value) === parseInt(selectedStore.subcategory)
  //           )
  //         ] : defaultValues.subcategory
  //     values.priceLevel = selectedStore.price_level ? priceLevelOptions[
  //           priceLevelOptions.findIndex(
  //             (i) => parseInt(i.value) === parseInt(selectedStore.price_level)
  //           )
  //         ] : defaultValues.priceLevel
  //     values.timeBeg = selectedStore.work_time_start ? selectedStore.work_time_start.toString() : ""
  //     values.timeEnd = selectedStore.work_time_end ? selectedStore.work_time_end.toString() : ""
  //   }
  // }, [selectedStore])
  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })
 
  const handleImgReset = () => {
    if (selectedProduct && galery.length) galery.map(image => delImages(parseInt(image.id)))
    setGalery([])
  }
 
  const handleClose = () => {
    reset({...defaultValues})
    setGalery([])
    navigate("/apps/food/products/products/list/")
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
      // setAvatar(reader.result)
      const id = galery.length
      // galery.push({id, image: reader.result})
      // setGalery({id, image: reader.result})
      setGalery(prevState => {
        return [...prevState, {id, image: reader.result}]
      })
    }
    reader.readAsDataURL(files[0])
  }

  // const handleSupplierChange = (selectedOption) => {
  //   setValue("category", { value: "", label: "Выбирите категорию" })
  //   const filteredCategories = categories.filter(
  //     (category) => parseInt(category.supplier) === parseInt(selectedOption.value)
  //   )
  //   setCategoryOptions(
  //     filteredCategories.map((category) => ({
  //       value: String(category.id),
  //       label: category.name
  //     }))
  //   )
  //   setValue("supplier", selectedOption)
  // }

  const handleCategoryChange = (selectedOption) => setValue("category", selectedOption)

  const onSubmit = (data) => {
    // console.log(galery)
    if (checkIsValid(data, requiredFields)) {
      const newGalery = galery && galery.length ? galery.filter(img => img.image.startsWith('data:image')) : []
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("cost", data.cost)
      // formData.append("supplier", data.supplier.value)
      formData.append("supplier", store)
      if (data.description) formData.append("description", data.description)
      if (data.category) formData.append("category", data.category.value)
      if (data.isLongCooking !== '') formData.append("is_long_cooking", data.isLongCooking)
      if (data.cookingTime) formData.append("cooking_time", data.cookingTime)
      if (data.longCookingMessage) formData.append("long_cooking_message", data.longCookingMessage)
      if (data.isArchived !== '') formData.append("is_archived", data.isArchived)
      if (data.requiresContainer !== '') formData.append("requires_container", data.requiresContainer)
      if (data.composition) formData.append("composition", data.composition)
      if (data.gram) formData.append("gram", data.gram)
      if (data.kcal) formData.append("kcal", data.kcal)
      if (data.proteins) formData.append("proteins", data.proteins)
      if (data.fats) formData.append("fats", data.fats)
      if (data.carbohydrates) formData.append("carbohydrates", data.carbohydrates)
      if (data.primeCost) formData.append("prime_cost", parseInt(data.primeCost))
      if (data.appliancePrice) formData.append("appliance_price", data.appliancePrice)
      if (data.containerPrice) formData.append("container_price", data.containerPrice)
      if (selectedProduct) {
        dispatch(editProduct({ id: selectedProduct.id, formData, galery: newGalery })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addProduct({ formData, galery: newGalery })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
            <Col md={6} className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center mt-2 mb-2 ">
                  <SwiperImages images={galery && galery.length ? galery : null} isRtl={isRtl} />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <Button
                      tag={Label}
                      className="me-75 mb-0"
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

            <Col md={6} className="d-flex flex-column">
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
              <Col className="d-flex flex-column mt-1">
            <Label className="form-label" for="composition">
              Состав
            </Label>
            <Controller
              name="composition"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="composition"
                  type="textarea"
                  placeholder="Введите состав"
                  invalid={errors.composition && true}
                  {...field}
                />
              )}
            />
            {errors && errors.description && (
              <FormFeedback>Пожалуйста введите состав</FormFeedback>
            )}
          </Col>
              <Col className="d-flex flex-column mt-1">
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
              <Col className="d-flex justify-content-between gap-30 mt-1">
              <div>
                  <Label className="form-label" for="kcal">
                  Калорий, кКал
                  </Label>
                  <Controller
                    name="kcal"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="kcal"
                        id="kcal"
                        type="number"
                        placeholder=""
                        invalid={errors.kcal && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.kcal && (
                    <FormFeedback>Пожалуйста введите количество калорий</FormFeedback>
                  )}
                </div> 
              <div>
                  <Label className="form-label" for="proteins">
                  Протеины, г
                  </Label>
                  <Controller
                    name="proteins"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="proteins"
                        id="proteins"
                        type="number"
                        placeholder=""
                        invalid={errors.proteins && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.proteins && (
                    <FormFeedback>Пожалуйста введите количество протеинов</FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="fats">
                  Жиры, г
                  </Label>
                  <Controller
                    name="fats"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="fats"
                        id="fats"
                        type="number"
                        placeholder=""
                        invalid={errors.fats && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.fats && (
                    <FormFeedback>
                      Пожалуйста введите количество жиров
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="carbohydrates">
                  Углеводы, г
                  </Label>
                  <Controller
                    name="carbohydrates"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="carbohydrates"
                        id="carbohydrates"
                        type="number"
                        placeholder=""
                        invalid={errors.carbohydrates && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.carbohydrates && (
                    <FormFeedback>Пожалуйста введите количество угдеводов</FormFeedback>
                  )}
                </div>
              </Col>
            </Col>

          
          </Col>
        </Row>
        <Row>
        {/* <Col md={4} className="mt-1">
                <Label className="form-label" for="supplier">
                  Заведение<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="supplier"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      id="supplier"
                      name="supplier"
                      onChange={handleSupplierChange}
                      isClearable={false}
                      value={field.value}
                      classNamePrefix="select"
                      options={supplierOptions}
                      theme={selectThemeColors}
                      placeholder="Выберите заведение"
                      className={classnames("react-select", {
                        "is-invalid": errors.supplier && true
                      })}
                    />
                  )}
                />
                {errors && errors.supplier && (
                  <FormFeedback>
                    Пожалуйста выберите заведение
                  </FormFeedback>
                )}
              </Col> */}
              <Col md={4} className="mt-1">
                <Label className="form-label" for="category">
                  Категория
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      id="category"
                      name="category"
                      // isDisabled={!getValues("supplier").value}
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

              <Col md={4} className="d-flex justify-content-between gap-30 mt-1">
                <div>
                  <Label className="form-label" for="cost">
                  Цена, &#x0441;&#x332; <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="cost"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        name="cost"
                        id="cost"
                        type="number"
                        placeholder=""
                        invalid={errors.cost && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.cost && (
                    <FormFeedback>
                      Пожалуйста введите цену
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="primeCost">
                    Скидка
                  </Label>
                  <Controller
                    name="primeCost"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        id="primeCost"
                        name="primeCost"
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
                  {errors && errors.primeCost && (
                    <FormFeedback>Пожалуйста введите скидку</FormFeedback>
                  )}
                </div>
              </Col>
              

              <Col md={4} className="mt-1">
              <div className="d-flex justify-content-center align-items-center gap-30">
                <div>  
                <Label className="form-label" for="cookingTime">
                  Время приготовления, мин
                </Label>
                <Controller
                    name="cookingTime"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="cookingTime"
                        id="cookingTime"
                        type="number"
                        placeholder=""
                        invalid={errors.cookingTime && true}
                        {...field}
                      />
                    )}
                  />
                   {errors && errors.cookingTime && (
                    <FormFeedback>Пожалуйста введите время приготовления</FormFeedback>
                  )}
               </div>     
              <div className='form-check form-check-primary mt-2'>
          <Controller
            name='isLongCooking'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='isLongCooking'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='isLongCooking'>
          Долго готовить
          </Label>
        </div>
        </div>   
              </Col>

              <Col md={6} className="mt-1">
                <Label className="form-label" for="longCookingMessage">
                  Сообщение при длительном приготовлении
                </Label>
                <Controller
                  name="longCookingMessage"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="longCookingMessage"
                      placeholder="Введите сообщение при длительном приготовлении"
                      invalid={errors.longCookingMessage && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.longCookingMessage && (
                  <FormFeedback>Пожалуйста введите сообщение при длительном приготовлении</FormFeedback>
                )}
              </Col>
              
              <Col md={2} className="mt-2">
              <div className='form-check form-check-primary mt-2'>
          <Controller
            name='requiresContainer'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='requiresContainer'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='requiresContainer'>
          Требуется упаковка
          </Label>
        </div>
              </Col>
              <Col md={4} className="d-flex justify-content-between gap-30 mt-1">
                <div>
                  <Label className="form-label" for="containerPrice">
                  Стоимость упаковки, &#x0441;&#x332;
                  </Label>
                  <Controller
                    name="containerPrice"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="containerPrice"
                        id="containerPrice"
                        type="number"
                        placeholder=""
                        invalid={errors.containerPrice && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.containerPrice && (
                    <FormFeedback>
                      Пожалуйста введите стоимость упаковки
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="appliancePrice">
                  Стоимость приборов, &#x0441;&#x332;
                  </Label>
                  <Controller
                    name="appliancePrice"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="appliancePrice"
                        id="appliancePrice"
                        type="number"
                        placeholder=""
                        invalid={errors.appliancePrice && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.appliancePrice && (
                    <FormFeedback>Пожалуйста введите стоимость приборов</FormFeedback>
                  )}
                </div>
              </Col>
              <Col md={2} className="mt-1">
                <div>
                  <Label className="form-label" for="gram">
                  Вес, г
                  </Label>
                  <Controller
                    name="gram"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        name="gram"
                        id="gram"
                        type="number"
                        placeholder=""
                        invalid={errors.gram && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.gram && (
                    <FormFeedback>
                      Пожалуйста введите вес
                    </FormFeedback>
                  )}
                </div>
              </Col>
              <Col md={2} className="mt-3">
              <div className='form-check form-check-primary'>
          <Controller
            name='isArchived'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='isArchived'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='isArchived'>
          В архиве
          </Label>
        </div>
              </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-2 gap-10" sm="12">
            <Button type="submit" color="primary">
              Сохранить
            </Button>
            <Button color="secondary" outline onClick={handleClose}>
              Отменить
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProductDetails