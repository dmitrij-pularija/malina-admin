// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import classnames from "classnames"
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import Flatpickr from "react-flatpickr"
import { selectThemeColors, checkIsValid, initSelect, formatTimeSave } from '@utils'
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap'
import "@styles/react/libs/flatpickr/flatpickr.scss"
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  name: '',
  city: '',
  street: '',
  houseNumber: '',
  entrance: '',
  floor: '',
  phoneNumber: '',
  deliveryPrice: '',
  location: '',
  longitude: '',
  latitude: '',
  timeDelivery: '',
  rdt: '',
  comment: ''
  }
  const requiredFields = ["name", "phone"]

const Address = ({ stepper, orderData, selectedOrder, handleUpdate, address }) => {
  const dispatch = useDispatch()

  const userAddressOptions = address.map((item) => ({
    value: String(item.id),
    label: item.name
  }))
  const values = selectedOrder ? {
    name: selectedOrder.name ? initSelect(userAddressOptions, selectedOrder.name) : '',
    city: selectedOrder.city ? selectedOrder.city : '',
    street: selectedOrder.street ? selectedOrder.street : '',
    houseNumber: selectedOrder.house_number ? selectedOrder.house_number : '',
    entrance: selectedOrder.entrance ? selectedOrder.entrance : '',
    floor: selectedOrder.floor ? selectedOrder.floor : '',
    phoneNumber: selectedOrder.phone_number ? selectedOrder.phone_number : '',
    deliveryPrice: selectedOrder.delivery_price ? selectedOrder.delivery_price : '',
    location: selectedOrder.location ? selectedOrder.location : '',
    longitude: selectedOrder.longitude ? selectedOrder.longitude : '',
    latitude: selectedOrder.latitude ? selectedOrder.latitude : '',
    timeDelivery: selectedOrder.time_delivery ? selectedOrder.time_delivery : '',
    rdt: selectedOrder.requested_delivery_time ? selectedOrder.requested_delivery_time : '',
    comment: selectedOrder.comment ? selectedOrder.comment : ''
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

  const handleNext = () => stepper.next()
  
  const handleLocation = (event) => {
  event.preventDefault()
  let address = ''
  const {value, name} = event.target
  const city = getValues('city')
  const street = getValues('street')
  const houseNumber = getValues('houseNumber')
  if (name === 'city') address = `${value}${street ? `, ${street}` : ''}${houseNumber ? `, ${houseNumber}` : ''}`
  if (name === 'street') address = `${city ? city : ''}${`, ${value}`}${houseNumber ? `, ${houseNumber}` : ''}`
  if (name === 'houseNumber') address = `${city ? city : ''}${street ? `, ${street}` : ''}${`, ${value}`}`
  setValue('location', address)
  }
  
  const onSubmit = (data) => {
    // console.log(data)
    const newData = {}
    
    if (checkIsValid(data, requiredFields) || orderData.order_type !== "1" ) {
      if (data.comment) newData.comment = data.comment
      if (orderData.order_type !== "1") return handleNext()
      if (data) newData.delivery_address = {}
      if (data.name) newData.delivery_address.name = data.name
      if (data.city) newData.delivery_address.city = data.city
      if (data.street) newData.delivery_address.street = data.street
      if (data.houseNumber) newData.delivery_address.house_number = data.houseNumber
      if (data.entrance) newData.delivery_address.entrance = data.entrance
      if (data.floor) newData.delivery_address.floor = data.floor
      if (data.phoneNumber) newData.delivery_address.phone_number = data.phoneNumber
      if (data.location) newData.delivery_address.location = data.location
      if (data.longitude) newData.delivery_address.longitude = data.longitude
      if (data.latitude) newData.delivery_address.latitude = data.latitude
      if (data.comment) newData.comment = data.comment
      // if (data.deliveryPrice) newData.delivery_price = data.deliveryPrice
      if (data.rdt) newData.requested_delivery_time = formatTimeSave(data.rdt)
      if (data.timeDelivery) newData.time_delivery = parseInt(data.timeDelivery)
      if (newData) handleUpdate(newData)
      handleNext()
      // if (selectedOrder) {
      //   dispatch(editOrder({ id: selectedOrder.id, order: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleNext())
      // } else {
      //   dispatch(addOrder(newData)).then(response => {
      //     console.log(response)
      //     if (response.meta.requestStatus === 'fulfilled') handleNext()
      //   })
      // }
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

// console.log(orderData)
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Адрес</h5>
        <small>{orderData && orderData.order_type === "1" ? "Выберите адрес доставки или создайте новый." : "В нутри заведения"}</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
       {orderData && orderData.order_type === "1" && <>
        <Row className='mb-1'>
        <Col md='6'>
          <Label className='form-label' for='userAddress'>
          Сохраненные адреса
          </Label>
            <Select
              theme={selectThemeColors}
              isClearable={true}
              id='userAddress'
              name='userAddress'
              className='react-select'
              classNamePrefix='select'
              options={userAddressOptions}
              placeholder='Выбирите адрес клиента'
              // defaultValue={countryOptions[0]}
            />
          </Col> 
          {/* <Col md='6' className="d-flex justify-content-start align-items-end gap-30"> 
          <Button color='primary' onClick={() => {}}>
                <span className='align-middle d-sm-inline-block d-none'>Применить</span>
          </Button> 
          <Button color='warning' onClick={() => {}}>
                <span className='align-middle d-sm-inline-block d-none'>Выбрать на карте</span>
          </Button> 
          </Col>   */}
        </Row>
        <Row>
        <Col md='6'>
        <Col className='mb-1'>
            <Label className='form-label' for='city'>
              Город
            </Label>
            <Controller
                    name="city"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='city'
              name='city'
              placeholder='Название города'
              invalid={errors.city && true}
              onInput={event => handleLocation(event)}
              {...field}
            />
            )}
            />
            {errors && errors.city && (
              <FormFeedback>
                Пожалуйста введите название города
              </FormFeedback>
            )}
        </Col>
        <Col className='mb-1'>
            <Label className='form-label' for='street'>
              Улица
            </Label>
            <Controller
                    name="street"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='street'
              name='street'
              placeholder='Название улицы'
              invalid={errors.street && true}
              onInput={event => handleLocation(event)}
              {...field}
            />
            )}
            />
            {errors && errors.street && (
              <FormFeedback>
                Пожалуйста введите название улицы
              </FormFeedback>
            )}
          </Col>
          <Col className='d-flex gap-30 mb-1'>
          <Col >
            <Label className='form-label' for='houseNumber'>
             Дом
            </Label>
            <Controller
                    name="houseNumber"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='houseNumber'
              name='houseNumber'
              placeholder='№ дома'
              onInput={event => handleLocation(event)}
              invalid={errors.houseNumber && true}
              {...field}
            />
            )}
            />
            {errors && errors.houseNumber && (
              <FormFeedback>
                Пожалуйста введите № дома
              </FormFeedback>
            )}
          </Col>
          <Col>
            <Label className='form-label' for='entrance'>
             Подъезд
            </Label>
            <Controller
                    name="entrance"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='entrance'
              name='entrance'
              placeholder='Подъезд'
              invalid={errors.entrance && true}
              {...field}
            />
            )}
            />
            {errors && errors.entrance && (
              <FormFeedback>
                Пожалуйста введите № подъезда
              </FormFeedback>
            )}
          </Col>
          <Col>
            <Label className='form-label' for='floor'>
             Этаж
            </Label>
            <Controller
                    name="floor"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='floor'
              name='floor'
              placeholder='Этаж'
              invalid={errors.floor && true}
              {...field}
            />
            )}
            />
            {errors && errors.floor && (
              <FormFeedback>
                Пожалуйста введите № этажа
              </FormFeedback>
            )}
          </Col>
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='location'>
              Адрес
            </Label>
            <Controller
                    name="location"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              disabled
              type='text'
              id='location'
              name='location'
              placeholder='Адрес доставки'
              // value={`${getValues('city')}, ${getValues('street')}, ${getValues('houseNumber')}`}
              invalid={errors.location && true}
              {...field}
            />
            )}
            />
            {errors && errors.location && (
              <FormFeedback>
                Пожалуйста введите адрес доставки
              </FormFeedback>
            )}
          </Col>
        </Col>
        <Col md='6'>
        <Col className='mb-1'>
            <Label className='form-label' for='name'>
              Название адреса<span className='text-danger'>*</span>
            </Label>
            <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Выберите название адреса'
              invalid={errors.name && true}
              {...field}
            />
            )}
            />
            {errors && errors.name && (
              <FormFeedback>
                Пожалуйста введите название адреса
              </FormFeedback>
            )}
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='phoneNumber'>
              Мобильный телефона<span className='text-danger'>*</span>
            </Label>
            <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
            <Input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Введите номер телефона'
              invalid={errors.phoneNumber && true}
              {...field}
            />
            )}
            />
            {errors && errors.phoneNumber && (
              <FormFeedback>
                Пожалуйста введите номер телефона
              </FormFeedback>
            )}
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='deliveryPrice'>
              Стоимость доставки
            </Label>
            <Controller
                    name="deliveryPrice"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              disabled
              type='text'
              id='deliveryPrice'
              name='deliveryPrice'
              placeholder='Введите стоимость доставки'
              invalid={errors.deliveryPrice && true}
              {...field}
            />
            )}
            />
            {errors && errors.deliveryPrice && (
              <FormFeedback>
                Пожалуйста введите стоимость доставки
              </FormFeedback>
            )}
          </Col>
          <Col className='d-flex gap-30 mb-1'>
          <Col>
            <Label className='form-label' for='longitude'>
             Долгота
            </Label>
            <Controller
                    name="longitude"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='longitude'
              name='longitude'
              placeholder='Долгота'
              invalid={errors.longitude && true}
              {...field}
            />
            )}
            />
            {errors && errors.longitude && (
              <FormFeedback>
                Пожалуйста введите долготу
              </FormFeedback>
            )}
          </Col>
          <Col>
            <Label className='form-label' for='latitude'>
             Широта
            </Label>
            <Controller
                    name="latitude"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
            <Input
              type='text'
              id='latitude'
              name='latitude'
              placeholder='Широта'
              invalid={errors.latitude && true}
              {...field}
            />
            )}
            />
            {errors && errors.latitude && (
              <FormFeedback>
                Пожалуйста введите широту
              </FormFeedback>
            )}
          </Col>
          </Col>
        </Col>
        </Row>
        </>}
        <Row>
          {orderData && orderData.order_type === "1" && <Col md='4' className='mb-1' >
            <Label className="form-label" for="timeDelivery">
              Время доставки, мин
            </Label>
                <div className="d-flex justify-content-center align-items-center gap-10">
                  <div>
                    <Controller
                      id="timeDelivery"
                      name="timeDelivery"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                      <Input
                      // disabled
                      id="timeDelivery"
                      placeholder="расчетное"
                      invalid={errors.timeDelivery && true}
                      {...field}
                    />  
                    )}
            />
            {/* {errors && errors.timeDelivery && (
              <FormFeedback>
                Пожалуйста введите время доставки
              </FormFeedback>
            )} */}
                  </div>
                  {/* <Minus size={14} /> */}
                  <div>
                  {/* <Label className="form-label" for="rdt">
                  Желаемое время доставки
                </Label> */}
                    <Controller
                      id="rdt"
                      name="rdt"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Flatpickr
                          // className="form-control width-70"
                          // value={field.value}
                          id="rdt"
                          name="rdt"
                          placeholder="желаемое"
                          invalid={errors.rdt && true}
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          className={classnames("form-control", {
                            "is-invalid": errors.rdt && true
                          })}
                          onChange={(date) => setValue("rdt", date)}
                        />
                      )}
                    />
                  </div>
                  {(errors && errors.rdt) && (<FormFeedback id='ffb'>Пожалуйста введите время доставки</FormFeedback>)}
                </div>
              </Col>}
              <Col className='mb-1'>
                <Label className="form-label" for="comment">
                Коментарий
                </Label>
                <Controller
                  name="comment"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="comment"
                      type="text"
                      placeholder="Введите коментарий"
                      invalid={errors.comment && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.comment && (
                  <FormFeedback>Пожалуйста введите описание</FormFeedback>
                )}
              </Col>      
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Назад</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Далее</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
