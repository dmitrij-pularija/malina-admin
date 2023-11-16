import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SwiperImages from "./swiper"
import InputNumber from "rc-input-number"
import Flatpickr from "react-flatpickr"
// import { getAllCategories } from "../../categories/store"
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
import { addProduct, editProduct, delImages} from "../store"
// import ModalPassword from "./ModalPassword"
// import ModalІShifts from "./ModalІShifts"
import classnames from "classnames"
import { Plus, Minus } from "react-feather"
import {
  businessType,
  storeType,
  priceLevels
} from "../../../../../../configs/initial"
import '@styles/react/libs/swiper/swiper.scss'
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
  FormFeedback
} from "reactstrap"

SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const defaultValues = {
  name: "",
  description: "",
  category: "",
  cost: "",
  composition: "",
  primeCost: "",
  supplier: "",
  usageInstruction: "",
  volume: "",
  relatedProducts: ""
}

const requiredFields = ["name", "cost"]

const ProductDetails = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isRtl] = useRTL()
  const { categories, store, stores, products, selectedProduct, t } = props
  const relatedProductsList = selectedProduct && selectedProduct.related_products.length ? selectedProduct.related_products.map(product => parseInt(product.id)) : []

  const initCategoryOptions = () => {
    return categories.map((category) => ({
    value: String(category.id),
    label: category.category_name
  }))
}
const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
const supplierOptions = filtredStore.map(store => ({
  value: String(store.id),
  label: store.name
}))

const relatedProductsOptions = products.map(product => ({
  value: String(product.id),
  label: product.name
}))


  const [galery, setGalery] = useState(selectedProduct && selectedProduct.beauty_product_images.length ? selectedProduct.beauty_product_images : [])
  const [categoryOptions, setCategoryOptions] = useState(initCategoryOptions())
  
  useEffect(() => {
    setCategoryOptions(initCategoryOptions())
  }, [categories])

  useEffect(() => {
    setGalery(selectedProduct && selectedProduct.beauty_product_images.length ? selectedProduct.beauty_product_images : [])
  }, [selectedProduct])
  
  const values = selectedProduct ? {
  name: selectedProduct.name ? selectedProduct.name : "",
  description: selectedProduct.description ? selectedProduct.description : "",
  category: selectedProduct.category ? categoryOptions[categoryOptions.findIndex(i => parseInt(i.value) === parseInt(selectedProduct.category))] : '',
  cost: selectedProduct.cost ? selectedProduct.cost : "",
  composition: selectedProduct.composition ? selectedProduct.composition : "",
  primeCost: selectedProduct.prime_cost ? selectedProduct.prime_cost : "",
  supplier: store,
  // supplier: selectedProduct.supplier ? supplierOptions[supplierOptions.findIndex(i => parseInt(i.value) === parseInt(selectedProduct.supplier.id))] : '',
  usageInstruction: selectedProduct.usage_instruction ? selectedProduct.usage_instruction : "",
  volume: selectedProduct.volume ? selectedProduct.volume : "",
  relatedProducts: relatedProductsOptions.filter(i => relatedProductsList.includes(parseInt(i.value)))
  } : {}
  
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
    navigate("/apps/beauty/products/products/list/")
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

  const handleSupplierChange = (selectedOption) => {
    // setValue("category", { value: "", label: "Выбирите категорию" })
    // const filteredCategories = categories.filter(
    //   (category) => parseInt(category.supplier) === parseInt(selectedOption.value)
    // )
    // setCategoryOptions(
    //   filteredCategories.map((category) => ({
    //     value: String(category.id),
    //     label: category.category_name
    //   }))
    // )
    setValue("supplier", selectedOption)
  }

  const handleCategoryChange = (selectedOption) => {
    setValue("category", selectedOption)
  }

  const onSubmit = (data) => {
    
    if (checkIsValid(data, requiredFields)) {
        const newGalery = galery && galery.length ? galery.filter(img => !img.beauty_product) : []
      // const formData = new FormData()
      // formData.append("name", data.name)
      // formData.append("cost", data.cost)
      // formData.append("supplier", data.supplier.value)
      // if (data.description) formData.append("description", data.description)
      // if (data.category) formData.append("category", data.category.value)
      // if (data.composition) formData.append("composition", data.composition)
      // if (data.primeCost) formData.append("prime_cost", data.primeCost)
      // if (data.usageInstruction) formData.append("usage_instruction", data.usageInstruction)
      // if (data.volume) formData.append("volume", data.volume)
      // if (data.relatedProducts && data.relatedProducts.length) formData.append("related_products", JSON.stringify(data.relatedProducts.map(product => parseInt(product.value))))
      const product = {}
      product.name = data.name
      product.cost = data.cost
      product.supplier = store
      if (data.relatedProducts && data.relatedProducts.length) product.related_products = data.relatedProducts.map(item => item.value)
      if (data.description) product.description = data.description
      if (data.category) product.category = data.category.value
      if (data.composition) product.composition = data.composition
      if (data.primeCost) product.prime_cost = data.primeCost
      if (data.usageInstruction) product.usage_instruction = data.usageInstruction
      if (data.volume) product.volume = data.volume
      if (selectedProduct) {
        dispatch(editProduct({ id: selectedProduct.id, product, galery: newGalery })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
      } else {
        dispatch(addProduct({ product, galery: newGalery })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
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
              <Col>
                <div className="d-flex align-items-center justify-content-center mt-1">
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
                      {t('download')}
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
                      {t('clear')}
                    </Button>
                  </div>
                </div>
              </Col>
             
  
            </Col>

            <Col md={6} className="d-flex flex-column">
              <Col>
                <Label className="form-label" for="name">
                {t('BeautyProductData.nameLabel')}<span className="text-danger">*</span>
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder={t('BeautyProductData.namePlaceholder')}
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>{t('BeautyProductData.nameFeedback')}</FormFeedback>
                )}
              </Col>
              <Col className="d-flex flex-column mt-1" sm="12">
            <Label className="form-label" for="composition">
            {t('BeautyProductData.compositionLabel')}
            </Label>
            <Controller
              name="composition"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  id="composition"
                  type="textarea"
                  placeholder={t('BeautyProductData.compositionPlaceholder')}
                  invalid={errors.composition && true}
                  {...field}
                />
              )}
            />
            {errors && errors.description && (
              <FormFeedback>{t('BeautyProductData.compositionFeedback')}</FormFeedback>
            )}
          </Col>
              <Col className="d-flex flex-column mt-1" sm="12">
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
                      // onChange={handleSupplierChange}
                      isClearable={false}
                      // value={field.value}
                      classNamePrefix="select"
                      options={supplierOptions}
                      theme={selectThemeColors}
                      placeholder="Выберите заведение"
                      className={classnames("react-select", {
                        "is-invalid": errors.supplier && true
                      })}
                    {...field}
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
                {t('Category')}
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
                      // value={field.value}
                      classNamePrefix="select"
                      options={categoryOptions}
                      theme={selectThemeColors}
                      // onChange={handleCategoryChange}
                      placeholder={t('categoryPlaceholder')}
                      className={classnames("react-select", {
                        "is-invalid": errors.category && true
                      })}
                    {...field}
                    />
                  )}
                />
                {errors && errors.category && (
                  <FormFeedback>{t('categoryFeedback')}</FormFeedback>
                )}
              </Col> 

              <Col md={4} className="d-flex justify-content-between gap-30 mt-1">
                <div>
                  <Label className="form-label" for="cost">
                  {t('BeautyProductData.costLabel')}&#x0441;&#x332; <span className="text-danger">*</span>
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
                      {t('BeautyProductData.costFeedback')}
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="primeCost">
                  {t('BeautyProductData.discountLabel')}
                  </Label>
                  <Controller
                    name="primeCost"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                      name="primeCost"
                      id="primeCost"
                      type="number"
                      placeholder=""
                      invalid={errors.primeCost && true}
                      {...field}
                    />
                    )}
                  />
                  {errors && errors.primeCost && (
                    <FormFeedback>{t('BeautyProductData.discountFeedback')}</FormFeedback>
                  )}
                </div>
              </Col>
              <Col md={4} className="mt-1">
                <Label className="form-label" for="volume">
                {t('BeautyProductData.volumeLabel')}
                </Label>
                <Controller
                  name="volume"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="volume"
                      placeholder={t('BeautyProductData.volumePlaceholder')}
                      invalid={errors.volume && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.volume && (
                  <FormFeedback>{t('BeautyProductData.volumeFeedback')}</FormFeedback>
                )}
              </Col>
              <Col md={6} className="mt-1">
                <Label className="form-label" for="usageInstruction">
                {t('BeautyProductData.instructionLabel')}
                </Label>
                <Controller
                  name="usageInstruction"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="usageInstruction"
                      placeholder={t('BeautyProductData.instructionPlaceholder')}
                      invalid={errors.usageInstruction && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.usageInstruction && (
                  <FormFeedback>{t('BeautyProductData.instructionFeedback')}</FormFeedback>
                )}
              </Col>
              <Col md={6} className="mt-1">
            <Label className='form-label' for='relatedProducts'>
            {t('BeautyProductData.relatedProductsLabel')}
          </Label>
          <Controller
            name='relatedProducts'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                isMulti
                id='relatedProducts'
                isClearable={false}
                classNamePrefix='select'
                options={relatedProductsOptions}
                theme={selectThemeColors}
                placeholder={t('BeautyProductData.relatedProductsPlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.relatedProducts && true })}
                {...field}
              />
            )}
          />
         {errors && errors.relatedProducts && (<FormFeedback>{t('BeautyProductData.relatedProductsFeedback')}</FormFeedback>)} 
            </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-2 gap-10" sm="12">
            <Button type="submit" color="primary">
            {t('save')}
            </Button>
            <Button color="secondary" outline onClick={handleClose}>
            {t('cancel')}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProductDetails