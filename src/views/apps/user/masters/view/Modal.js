import { useState, useEffect } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
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
import { addMaster, editMaster, getMaster } from "../store"
import { useDispatch } from "react-redux"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"

const SignupSchema = yup.object().shape({
  password: yup.string().min(8),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
})

const defaultValues = {
  business: "",
  specialty: "",
  name: "",
  surname: "",
  login: "",
  phone: "",
  password: "",
  confirmPassword: ""
}

const requiredFields = ["login", "business"]

const MasterModal = ({
  open,
  stores,
  specialties,
  toggleModal,
  selectedMaster,
  setSelectedMaster
}) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    if (selectedMaster && selectedMaster.master_profile_picture) setAvatar(selectedMaster.master_profile_picture)
  }, [selectedMaster])

  const specialtyOptions = specialties.map((item) => ({
    value: String(item.id),
    label: item.specialty_name
  }))

  const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const values = selectedMaster ? {
      business: initSelect(storeOptions, selectedMaster.master_business),
        specialty: initSelect(
          specialtyOptions,
          selectedMaster.master_specialty.id
        ),
        name: selectedMaster.master_name ? selectedMaster.master_name : "",
        surname: selectedMaster.surname ? selectedMaster.surname : "",
        login: selectedMaster.login ? selectedMaster.login : "",
        phone: selectedMaster.phone ? selectedMaster.phone : ""} : {}

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, values, resolver: yupResolver(SignupSchema) })

  const handleClose = () => {
    if (selectedMaster) dispatch(getMaster(selectedMaster.id))
    for (const key in defaultValues) setValue(key, "")
    setSelectedMaster("")
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
      if (!selectedMaster && !data.password) return setError("password", { type: "manual" })
      const formData = new FormData()
      formData.append("master_business", data.business.value)
      formData.append("login", data.login)
      if (data.specialty) formData.append("master_specialty", data.specialty.value)
      if (data.name) formData.append("master_name", data.name)
      if (data.surname) formData.append("surname", data.surname)
      if (data.phone) formData.append("phone", data.phone)
      if (data.password) formData.append("password", data.password)
      if (selectedMaster) {
        dispatch(editMaster({ id: selectedMaster.id, formData, avatar })).then(
          (response) => response.meta.requestStatus === "fulfilled" && handleClose()
        )
      } else {
        dispatch(addMaster({ formData, avatar })).then(
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
            {selectedMaster ? "Изменение информации о специалисте" : "Добавление нового специалиста"}
          </h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <div className="d-flex align-items-center flex-column">
                {renderUserImg(
                  avatar,
                  selectedMaster ? `${selectedMaster.master_name} ${selectedMaster.surname}` : "Cпециалист"
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
                  Имя
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
                      placeholder="John"
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>Пожалуйста заполните имя</FormFeedback>
                )}
              </div>
              <div className="mt-1">
                <Label className="form-label" for="surname">
                  Фамилия
                </Label>
                <Controller
                  control={control}
                  rules={{ required: false }}
                  id="surname"
                  name="surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="surname"
                      placeholder="Doe"
                      invalid={errors.surname && true}
                    />
                  )}
                />
                {errors && errors.surname && (
                  <FormFeedback>Пожалуйста заполните фамилию</FormFeedback>
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
                      "is-invalid": errors.business && true,
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
              <Label className="form-label" for="specialty">
                Специальность
              </Label>
              <Controller
                name="specialty"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    id="specialty"
                    isClearable={false}
                    classNamePrefix="select"
                    options={specialtyOptions}
                    theme={selectThemeColors}
                    placeholder="Выберите специальность"
                    className={classnames("react-select", {
                      "is-invalid": errors.specialty && true,
                    })}
                    {...field}
                  />
                )}
              />
              {errors && errors.specialty && (
                <FormFeedback>Пожалуйста выберите специальность</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="login">
                Логин <span className="text-danger">*</span>
              </Label>
              <Controller
                name="login"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="login"
                    placeholder="Введите логин"
                    invalid={errors.login && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.login && (
                <FormFeedback>Введите логин</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
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
                    placeholder="Введите теоефон"
                    invalid={errors.phone && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.phone && (
                <FormFeedback>Введите теоефон</FormFeedback>
              )}
            </Col>
            {!selectedMaster && (
              <>
                <Col md={6} xs={12}>
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <InputPasswordToggle
                        label="Новый пароль"
                        htmlFor="password"
                        className="input-group-merge"
                        invalid={errors.password && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <FormFeedback className="d-block">
                      {errors.password.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md={6} xs={12}>
                  <Controller
                    control={control}
                    rules={{ required: false }}
                    id="confirmPassword"
                    name="confirmPassword"
                    render={({ field }) => (
                      <InputPasswordToggle
                        label="Подтвердите новый пароль"
                        htmlFor="confirmPassword"
                        className="input-group-merge"
                        invalid={errors.confirmPassword && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <FormFeedback className="d-block">
                      {errors.confirmPassword.message}
                    </FormFeedback>
                  )}
                </Col>
              </>
            )}
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

export default MasterModal