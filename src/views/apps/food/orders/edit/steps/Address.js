// ** React Imports
import { Fragment } from 'react'
import classnames from "classnames"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'
import Flatpickr from "react-flatpickr"
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import "@styles/react/libs/flatpickr/flatpickr.scss"
import '@styles/react/libs/react-select/_react-select.scss'

const Address = ({ stepper, orderData, handleUpdate, address }) => {

  const userAddressOptions = address.map((item) => ({
    value: String(item.id),
    label: item.name
  }))

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Адрес</h5>
        <small>{orderData && orderData.order_type === 1 ? "Выберите адрес доставки или создайте новый." : "В нутри заведения"}</small>
      </div>
      <Form onSubmit={e => e.preventDefault()}>
       {orderData && orderData.order_type === 1 && <>
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
          <Col md='6' className="d-flex justify-content-start align-items-end gap-30"> 
          <Button color='primary' onClick={() => {}}>
                <span className='align-middle d-sm-inline-block d-none'>Применить</span>
          </Button> 
          {/* </Col> 
          <Col md='4'>  */}
          <Button color='warning' onClick={() => {}}>
                <span className='align-middle d-sm-inline-block d-none'>Выбрать на карте</span>
          </Button> 
          </Col>  
        </Row>
        <Row>
        <Col md='6'>
        <Col className='mb-1'>
            <Label className='form-label' for='city'>
              Город
            </Label>
            <Input
              type='text'
              id='city'
              name='city'
              placeholder='Выберите город'
            />
        </Col>
        <Col className='mb-1'>
            <Label className='form-label' for='street'>
              Улица
            </Label>
            <Input
              type='text'
              id='street'
              name='street'
              placeholder='Выберите улицу'
            />
          </Col>
          <Col className='d-flex gap-30 mb-1'>
          <Col >
            <Label className='form-label' for='houseNumber'>
             Дом
            </Label>
            <Input
              type='number'
              id='houseNumber'
              name='houseNumber'
              placeholder='№ дома'
            />
          </Col>
          <Col>
            <Label className='form-label' for='entrance'>
             Подъезд
            </Label>
            <Input
              type='number'
              id='entrance'
              name='entrance'
              placeholder='Подъезд'
            />
          </Col>
          <Col>
            <Label className='form-label' for='floor'>
             Этаж
            </Label>
            <Input
              type='number'
              id='floor'
              name='floor'
              placeholder='Этаж'
            />
          </Col>
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='location'>
              Адрес
            </Label>
            <Input
              disabled
              type='text'
              id='location'
              name='location'
              placeholder='Адрес доставки'
            />
          </Col>
        </Col>
        <Col md='6'>
        <Col className='mb-1'>
            <Label className='form-label' for='name'>
              Название адреса<span className='text-danger'>*</span>
            </Label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Выберите название адреса'
            />
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='phone'>
              Мобильный телефона<span className='text-danger'>*</span>
            </Label>
            <Input
              type='text'
              id='phone'
              name='phone'
              placeholder='Введите номер телефона'
            />
          </Col>
          <Col className='mb-1'>
            <Label className='form-label' for='houseNumber'>
              Домашний телефон
            </Label>
            <Input
              type='text'
              id='houseNumber'
              name='houseNumber'
              placeholder='Введите номер телефона'
            />
          </Col>
          <Col className='d-flex gap-30 mb-1'>
          <Col>
            <Label className='form-label' for='longitude'>
             Долгота
            </Label>
            <Input
              type='text'
              id='longitude'
              name='longitude'
              placeholder='Долгота'
            />
          </Col>
          <Col>
            <Label className='form-label' for='latitude'>
             Широта
            </Label>
            <Input
              type='text'
              id='latitude'
              name='latitude'
              placeholder='Широта'
            />
          </Col>
          </Col>
        </Col>
        </Row>
        </>}
        <Row>
          {orderData && orderData.order_type === 1 && <Col md='4' className='mb-1' >
            <Label className="form-label" for="timeDelivery">
              Время доставки, мин
            </Label>
                <div className="d-flex justify-content-center align-items-center gap-10">
                  <div>
                    {/* <Controller
                      id="timeBeg"
                      name="timeBeg"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => ( */}
                      <Input
                      // disabled
                      id="timeDelivery"
                      placeholder="расчетное"
                      // invalid={errors.description && true}
                      // {...field}
                    />  
                      {/* )}
                    /> */}
                  </div>
                  {/* <Minus size={14} /> */}
                  <div>
                  {/* <Label className="form-label" for="rdt">
                  Желаемое время доставки
                </Label> */}
                    {/* <Controller
                      id="rdt"
                      name="rdt"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => ( */}
                        <Flatpickr
                          // className="form-control width-70"
                          // value={field.value}
                          id="rdt"
                          name="rdt"
                          placeholder="желаемое"
                          // invalid={errors.rdt && true}
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          className={classnames("form-control", {
                            // "is-invalid": errors.rdt && true
                          })}
                          // onChange={(date) => setValue("rdt", date)}
                        />
                      {/* )}
                    /> */}
                  </div>
                  {/* {(errors && errors.rdt) && (<FormFeedback id='ffb'>Пожалуйста введите время доставки</FormFeedback>)} */}
                </div>
              </Col>}
              <Col className='mb-1'>
                <Label className="form-label" for="comment">
                Коментарий
                </Label>
                {/* <Controller
                  name="comment"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => ( */}
                    <Input
                      id="comment"
                      type="text"
                      placeholder="Введите коментарий"
                      // invalid={errors.description && true}
                      // {...field}
                    />
                  {/* )}
                /> */}
                {/* {errors && errors.description && (
                  <FormFeedback>Пожалуйста введите описание</FormFeedback>
                )} */}
              </Col>      
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Назад</span>
          </Button>
          <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Далее</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Address
