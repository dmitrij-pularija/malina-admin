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

const requiredFields = ["masters", "business"]

const ServicesModal = ({
  open,
  stores, 
  masters, 
  categories,
  toggleModal,
  selectedService,
  setSelectedService
}) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState("")
  const mastersList = selectedService && selectedTable.beauty_service_masters.length ? selectedTable.beauty_service_masters.map(master => parseInt(master.id)) : [] 

  useEffect(() => {
    if (selectedService && selectedService.beauty_service_image) setAvatar(selectedService.beauty_service_image)
  }, [selectedService])

  const masterOptions = masters.map(master => ({
    value: String(master.id),
    label: master.master_name ? `${master.master_name} ${master.surname ? master.surname : ''}` : master.login
  }))

  const categoryOptions = categories.map(category => ({
    value: String(category.id),
    label: category.category_name
  }))

  const storeOptions = stores.map(store => ({
    value: String(store.id),
    label: store.name
  }))

  const values = selectedService ? {
      name: selectedService.beauty_service_name ? selectedService.beauty_service_name : '',
      business: initSelect(storeOptions, selectedService.beauty_service_business.id),
      category: initSelect(categoryOptions, selectedService.beauty_service_category.id),
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
      body.beauty_service_business = data.business.value
      body.beauty_service_masters = data.masters.map(master => parseInt(master.value))
      if (data.name) body.beauty_service_name = data.name
      if (data.category) body.beauty_service_category = data.category.value
      if (data.hasPause) body.has_pause = data.hasPause
      if (data.pauseTime) body.pause_time = data.pauseTime
      if (data.price) body.beauty_service_price = data.price
      if (data.duration) body.beauty_service_duration_minutes = data.duration
      if (data.description) body.beauty_service_description = data.description

      if (selectedService) {
        dispatch(editMaster({ id: selectedService.id, sevice, avatar })).then(
          (response) => response.meta.requestStatus === "fulfilled" && handleClose()
        )
      } else {
        dispatch(addMaster({ sevice, avatar })).then(
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
            {selectedService ? "Изменение информации о услуге" : "Добавление новой услуги"}
          </h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <div className="d-flex align-items-center flex-column">
                {renderUserImg(
                  avatar,
                  selectedMaster && selectedMaster.beauty_service_name ? selectedMaster.beauty_service_name : "Услуга"
                )}
                <div className="d-flex align-items-center gap-10">
                  <Button
                    className="mb-0"
                    tag={Label}
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
            <Col md={6} xs={12}>
              <div>
                <Label className="form-label" for="name">
                  Название
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
                      placeholder="Введите название услуги"
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>Пожалуйста заполните название</FormFeedback>
                )}
              </div>
              <div className="mt-1">
                <Label className="form-label" for="description">
                  Описание
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
                      placeholder="Doe"
                      invalid={errors.description && true}
                    />
                  )}
                />
                {errors && errors.description && (
                  <FormFeedback>Пожалуйста заполните описание</FormFeedback>
                )}
              </div>
            </Col>
            <Col md={6} xs={12}>
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
            </Col>
            <Col md={6} xs={12}>
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
                    isClearable={false}
                    classNamePrefix="select"
                    options={categoryOptions}
                    theme={selectThemeColors}
                    placeholder="Выберите категорию"
                    className={classnames("react-select", {
                      "is-invalid": errors.category && true
                    })}
                    {...field}
                  />
                )}
              />
              {errors && errors.category && (
                <FormFeedback>Пожалуйста выберите категорию</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
            <Label className='form-label' for='masters'>
          Специалист(ы)<span className="text-danger">*</span>
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
                options={waiterOptions}
                theme={selectThemeColors}
                placeholder="Выбирите специалиста(ов)"
                className={classnames('react-select', { 'is-invalid': errors.masters && true })}
                {...field}
              />
            )}
          />
         {errors && errors.masters && (<FormFeedback>Пожалуйста выберите специалиста</FormFeedback>)} 
            </Col>
            <Col md={6} xs={12}>
          <div className='form-check form-check-primary'>
          <Controller
            name='hasPause'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='hasPause'  type='checkbox' checked={field.value} {...field} />
            )}
          />
          <Label className='form-label' for='hasPause'>
          Пауза между процедурами
          </Label>
        </div>
          </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="pauseTime">
              Время паузы, мин
              </Label>
              <Controller
                name="pauseTime"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="pauseTime"
                    placeholder="Введите время паузы"
                    invalid={errors.pauseTime && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.pauseTime && (
                <FormFeedback>Введите время паузы</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="price">
              Стоимость услуги
              </Label>
              <Controller
                name="price"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="price"
                    placeholder="Введите стоимость"
                    invalid={errors.price && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.price && (
                <FormFeedback>Введите стоимость</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="duration">
              Продолжительность, мин
              </Label>
              <Controller
                name="duration"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    id="duration"
                    placeholder="Введите продолжительность"
                    invalid={errors.duration && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.duration && (
                <FormFeedback>Введите продолжительность</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                Сохранить
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={handleClose}
              >
                Отменить
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ServicesModal