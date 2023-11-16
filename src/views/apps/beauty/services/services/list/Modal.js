import { useState, useEffect } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
import {
  selectThemeColors,
  initSelect,
  checkIsValid,
  dataURLtoBlob,
} from "@utils"
import Avatar from "@components/avatar"
import Select from "react-select"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import {
  Row,
  Col,
  Card,
  Form,
  FormFeedback,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap"
import { addService, editService } from "../store"
import { useDispatch } from "react-redux"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"

// const SignupSchema = yup.object().shape({
//   password: yup.string().min(8),
//   confirmPassword: yup
//     .string()
//     .min(8)
//     .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
// })

const defaultValues = {
  name: "",
  masters: "",
  business: "",
  category: "",
  hasPause: "",
  pauseTime: "",
  price: "",
  duration: "",
  description: ""
}

const requiredFields = ["masters"]

const ServicesModal = ({
  t,
  open,
  store,
  stores, 
  masters, 
  categories,
  toggleModal,
  selectedService,
  setSelectedService
}) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState("")
  const mastersList = selectedService && selectedService.beauty_service_masters.length ? selectedService.beauty_service_masters.map(master => parseInt(master.id)) : [] 

  useEffect(() => {
    if (selectedService && selectedService.beauty_service_image) setAvatar(selectedService.beauty_service_image)
  }, [selectedService])

  const filtredMasters = masters.filter(master => parseInt(master.master_business) === parseInt(store)) 
  const masterOptions = filtredMasters.map(master => ({
    value: String(master.id),
    label: master.master_name ? `${master.master_name} ${master.surname ? master.surname : ''}` : master.login
  }))
  
  const filtredSpecialty = categories.filter(category => parseInt(category.business.id) === parseInt(store)) 
  const categoryOptions = filtredSpecialty.map(category => ({
    value: String(category.id),
    label: category.category_name
  }))

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 2)
  const storeOptions = filtredStore.map(store => ({
    value: String(store.id),
    label: store.name
  }))

  const values = selectedService ? {
      name: selectedService.beauty_service_name ? selectedService.beauty_service_name : '',
      business: store,
      // business: selectedService.beauty_service_business && selectedService.beauty_service_business.id ? initSelect(storeOptions, selectedService.beauty_service_business.id) : '',
      category: selectedService.beauty_service_category && selectedService.beauty_service_category.id ? initSelect(categoryOptions, selectedService.beauty_service_category.id) : '',
      hasPause: selectedService.has_pause ? selectedService.has_pause : false,
      pauseTime: selectedService.pause_time ? selectedService.pause_time : "",
      price: selectedService.beauty_service_price ? selectedService.beauty_service_price : "",
      duration: selectedService.beauty_service_duration_minutes ? selectedService.beauty_service_duration_minutes : "",
      description: selectedService.beauty_service_description ? selectedService.beauty_service_description : "",
      masters: selectedService.beauty_service_masters && selectedService.beauty_service_masters.length ? masterOptions.filter(i => mastersList.includes(parseInt(i.value))) : ""
    } : {}

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const handleClose = () => {
    // if (selectedService) dispatch(getMaster(selectedService.id))
    for (const key in defaultValues) setValue(key, "")
    setSelectedService("")
    toggleModal()
    setAvatar("")
    reset({ ...defaultValues })
  }

  const handleImg = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const handleImgReset = () => setAvatar("")

  const renderUserImg = (image, name) => {
    if (image) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={image}
          className="img-fluid rounded mb-1"
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mb-1"
          content={name}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%"
          }}
          style={{
            height: "110px",
            width: "110px"
          }}
        />
      )
    }
  }

  const onSubmit = (data) => {
    if (checkIsValid(data, requiredFields)) {
      const sevice = {}
      sevice.beauty_service_business = store
      sevice.beauty_service_masters = data.masters.map(master => master.value)
      if (data.name) sevice.beauty_service_name = data.name
      if (data.category) sevice.beauty_service_category = data.category.value
      if (data.hasPause) sevice.has_pause = data.hasPause
      if (data.pauseTime) sevice.pause_time = data.pauseTime
      if (data.price) sevice.beauty_service_price = data.price
      if (data.duration) sevice.beauty_service_duration_minutes = data.duration
      if (data.description) sevice.beauty_service_description = data.description

      if (selectedService) {
        dispatch(editService({ id: selectedService.id, sevice, avatar })).then(
          (response) => response.meta.requestStatus === "fulfilled" && handleClose()
        )
      } else {
        dispatch(addService({ sevice, avatar })).then(
          (response) => response.meta.requestStatus === "fulfilled" && handleClose()
        )
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
    <Modal
      isOpen={open}
      toggle={handleClose}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={handleClose}
      ></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">
            {selectedService ? t('servicesData.titleEdit') : t('servicesData.titleAdd')}
          </h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <div className="d-flex align-items-center flex-column">
                {renderUserImg(
                  avatar,
                  selectedService && selectedService.beauty_service_name ? selectedService.beauty_service_name : "Услуга"
                )}
                <div className="d-flex align-items-center gap-10">
                  <Button
                    className="mb-0"
                    tag={Label}
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
            <Col md={6} xs={12}>
              <div>
                <Label className="form-label" for="name">
                  {t('servicesData.nameLabel')}
                </Label>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  id="name"
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      placeholder={t('servicesData.namePlaceholder')}
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>{t('servicesData.nameFeedback')}</FormFeedback>
                )}
              </div>
              <div className="mt-1">
                <Label className="form-label" for="description">
                {t('descriptionLabel')}
                </Label>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  id="description"
                  name="description"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="description"
                      placeholder={t('descriptionPlaceholder')}
                      invalid={errors.description && true}
                    />
                  )}
                />
                {errors && errors.description && (
                  <FormFeedback>{t('descripFeedback')}</FormFeedback>
                )}
              </div>
            </Col>
            {/* <Col md={6} xs={12}>
              <Label className="form-label" for="business">
                Заведение <span className="text-danger">*</span>
              </Label>
              <Controller
                name="business"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    id="business"
                    isClearable={false}
                    classNamePrefix="select"
                    options={storeOptions}
                    theme={selectThemeColors}
                    placeholder="Выберите Заведение"
                    className={classnames("react-select", {
                      "is-invalid": errors.business && true
                    })}
                    {...field}
                  />
                )}
              />
              {errors && errors.business && (
                <FormFeedback>Пожалуйста выберите заведение</FormFeedback>
              )}
            </Col> */}
            <Col md={6} xs={12}>
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
                    isClearable={false}
                    classNamePrefix="select"
                    options={categoryOptions}
                    theme={selectThemeColors}
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
            <Col md={6} xs={12}>
            <Label className='form-label' for='masters'>
            {t('servicesData.mastersLabel')}<span className="text-danger">*</span>
          </Label>
          <Controller
            name='masters'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isMulti
                id='masters'
                isClearable={false}
                classNamePrefix='select'
                options={masterOptions}
                theme={selectThemeColors}
                placeholder={t('servicesData.mastersPlaceholder')}
                className={classnames('react-select', { 'is-invalid': errors.masters && true })}
                {...field}
              />
            )}
          />
         {errors && errors.masters && (<FormFeedback>{t('servicesData.mastersFeedback')}</FormFeedback>)} 
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="price">
              {t('servicesData.priceLabel')}
              </Label>
              <Controller
                name="price"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="price"
                    placeholder={t('servicesData.pricePlaceholder')}
                    invalid={errors.price && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.price && (
                <FormFeedback>{t('servicesData.priceFeedback')}</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="duration">
              {t('servicesData.durationLabel')}
              </Label>
              <Controller
                name="duration"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="duration"
                    placeholder={t('servicesData.durationPlaceholder')}
                    invalid={errors.duration && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.duration && (
                <FormFeedback>{t('servicesData.durationFeedback')}</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
          <div className='form-check form-check-primary mt-3'>
          <Controller
            name='hasPause'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='hasPause'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='hasPause'>
          {t('servicesData.hasPause')}
          </Label>
        </div>
          </Col>
            <Col md={6} xs={12} className="mt-1">
              <Label className="form-label" for="pauseTime">
              {t('servicesData.pauseTimeLabel')}
              </Label>
              <Controller
                name="pauseTime"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="pauseTime"
                    placeholder={t('servicesData.pauseTimePlaceholder')}
                    invalid={errors.pauseTime && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.pauseTime && (
                <FormFeedback>{t('servicesData.pauseTimeFeedback')}</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
              {t('save')}
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={handleClose}
              >
              {t('cancel')}
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ServicesModal