import { useState, useEffect } from "react"
import { useRTL } from '@hooks/useRTL'
// import InputPasswordToggle from "@components/input-password-toggle"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"

import {
  selectThemeColors,
  initSelect,
  checkIsValid
} from "@utils"
import { feedsType } from "../../../../configs/initial"
// import Avatar from "@components/avatar"
import Select from "react-select"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import SwiperImages from "./swiper"
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
import { addFeed, editFeed, delImages} from "../store"
import { useDispatch } from "react-redux"
import "@styles/react/libs/react-select/_react-select.scss"
// import "@styles/react/libs/flatpickr/flatpickr.scss"
import '@styles/react/libs/swiper/swiper.scss'
// const SignupSchema = yup.object().shape({
//   password: yup.string().min(8),
//   confirmPassword: yup
//     .string()
//     .min(8)
//     .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
// })

SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])


const defaultValues = {
  title: '',
  subtitle: '',
  text: '',
  type: '',
  business: ''
}

const requiredFields = ["title", "business", "type"]

const FeedModal = ({
  open,
  stores, 
  toggleModal,
  selectedFeed,
  setSelectedFeed
}) => {
  const [isRtl] = useRTL()
  const dispatch = useDispatch()
  const [galery, setGalery] = useState(selectedFeed && selectedFeed.images.length ? selectedFeed.images : [])

  useEffect(() => {
    setGalery(selectedFeed && selectedFeed.images.length ? selectedFeed.images : [])
  }, [selectedFeed])

    const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const feedsTypeOptions = Object.keys(feedsType).map((key) => ({
    value: parseInt(key),
    label: feedsType[key]
  }))

  const values = selectedFeed ? {
    title: selectedFeed.title ? selectedFeed.title : '',
    subtitle: selectedFeed.subtitle ? selectedFeed.subtitle : '',
    text: selectedFeed.text ? selectedFeed.text : '',
    business: initSelect(storeOptions, selectedFeed.business.id),
    type: initSelect(feedsTypeOptions, selectedFeed.type)
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
    for (const key in defaultValues) setValue(key, '')
      setGalery([])
      toggleModal()
      setSelectedFeed('')
      reset({...defaultValues})
  }  

  const handleImg = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      const id = `f${galery.length}`
      setGalery(prevState => {
        return [...prevState, {id, link: reader.result}]
      })
    }
    reader.readAsDataURL(files[0])
  }

  const handleImgReset = () => {
    if (selectedFeed && galery.length) galery.map(image => delImages(parseInt(image.id)))
    setGalery([])
  }

  // const renderUserImg = (image, name) => {
  //   if (image) {
  //     return (
  //       <img
  //         height="110"
  //         width="110"
  //         alt="user-avatar"
  //         src={image}
  //         className="img-fluid rounded mb-1"
  //       />
  //     )
  //   } else {
  //     return (
  //       <Avatar
  //         initials
  //         color={"light-primary"}
  //         className="rounded mb-1"
  //         content={name}
  //         contentStyles={{
  //           borderRadius: 0,
  //           fontSize: "calc(48px)",
  //           width: "100%",
  //           height: "100%"
  //         }}
  //         style={{
  //           height: "110px",
  //           width: "110px"
  //         }}
  //       />
  //     )
  //   }
  // }

  const onSubmit = (data) => {
    if (checkIsValid(data, requiredFields)) {
      const feed = {}
      // const newGalery = galery && galery.length ? galery.filter(img => !img.name) : []
      feed.title = data.title
      feed.business = data.business.value
      feed.type = data.type.value
      if (data.subtitle) feed.subtitle = data.subtitle
      if (data.text) feed.text = data.text

      if (selectedFeed) {
        dispatch(editFeed({ id: parseInt(selectedFeed.id), feed, galery })).then(
          (response) => response.meta.requestStatus === "fulfilled" && handleClose()
        )
      } else {
        dispatch(addFeed({ feed, galery })).then(
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
            {selectedFeed ? 'Редактирование публикации' : 'Создание новой публикации'}
          </h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-2">
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
            </Row>
            <Row>
            <Col md={6} xs={12}>
            <Label className='form-label' for='title'>
          Заголовок<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='title' placeholder='Введите заголовок' invalid={errors.title && true} {...field} />
            )}
          />
          {errors && errors.title && (<FormFeedback>Пожалуйста введите заголовок</FormFeedback>)}
            </Col>
            <Col md={6} xs={12}>
            <Label className='form-label' for='business'>
          Заведение<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='business'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='business'
                isClearable={false}
                classNamePrefix='select'
                options={storeOptions}
                theme={selectThemeColors}
                placeholder={"Выберите заведение"}
                className={classnames('react-select', { 'is-invalid': errors.business && true })}
                {...field}
              />
            )}
          />
        {errors && errors.business && (<FormFeedback>{`Пожалуйста выберите заведение`}</FormFeedback>)}
            </Col>
            <Col md={6} xs={12}>
            <Label className='form-label' for='subtitle'>
          Под заголовок 
          </Label>
          <Controller
            name='subtitle'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='subtitle' placeholder='Введите под заголовок' invalid={errors.subtitle && true} {...field} />
            )}
          />
          {errors && errors.subtitle && (<FormFeedback>Пожалуйста введите под заголовок</FormFeedback>)}
            </Col>
            <Col md={6} xs={12}>
            <Label className='form-label' for='type'>
          Тип<span className='text-danger'>*</span>
          </Label>
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='type'
                isClearable={false}
                classNamePrefix='select'
                options={feedsTypeOptions}
                theme={selectThemeColors}
                placeholder={"Выберите тип публикации"}
                className={classnames('react-select', { 'is-invalid': errors.type && true })}
                {...field}
              />
            )}
          />
        {errors && errors.type && (<FormFeedback>{`Пожалуйста выберите тип публикации`}</FormFeedback>)}
            </Col>
            <Col>
            <Label className='form-label' for='text'>
          Публикация
          </Label>
          <Controller
            name='text'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='text' type="textarea" placeholder='Введите публикацию' invalid={errors.text && true} {...field} />
            )}
          />
          {errors && errors.text && (<FormFeedback>Пожалуйста введите публикацию</FormFeedback>)}
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

export default FeedModal