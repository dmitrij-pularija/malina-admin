import { Fragment } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addOrder, editOrder } from "../../store"
import Select from 'react-select'
import classnames from "classnames"
import { ArrowLeft } from 'react-feather'
import { paymentType } from '../../../../../../configs/initial'
import { Label, Row, Col, Form, Input, Button, FormFeedback } from 'reactstrap'
import { selectThemeColors, checkIsValid, initSelect } from '@utils'

const defaultValues = {
  paymentType: '',
  usedPoints: '',
  earnedPoints: '',
  comment: ''
  }
  const requiredFields = []

const Payment = ({ stepper, orderData, selectedOrder, handleUpdate }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const paymentTypeOptions = Object.keys(paymentType).map((key) => ({
    value: key,
    label: paymentType[key]
  })) 
  const values = selectedOrder ? {
    paymentType: selectedOrder.payment_type ? initSelect(paymentTypeOptions, selectedOrder.payment_type) : '',
    usedPoints: selectedOrder.used_points ? selectedOrder.used_points : '',
    earnedPoints: selectedOrder.earned_points ? selectedOrder.earned_points : '',
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

  const handleNext = () => navigate("/apps/beauty/orders/list/")
  
  const onSubmit = (data) => {
    const newData = orderData
    if (checkIsValid(data, requiredFields)) {
      if (data.paymentType) newData.payment_type = parseInt(data.paymentType.value)
      if (data.usedPoints) newData.used_points = parseInt(data.usedPoints)
      if (data.earnedPoints) newData.earned_points = parseInt(data.earnedPoints)
      if (data.comment) newData.comment = data.comment
      // if (newData) handleUpdate(newData)
      if (selectedOrder) {
        dispatch(editOrder({ id: selectedOrder.id, order: newData })).then(response => response.meta.requestStatus === 'fulfilled' && handleNext())
      } else {
        dispatch(addOrder(newData)).then(response => {
          // console.log(response)
          if (response.meta.requestStatus === 'fulfilled') handleNext()
        })
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
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Оплата</h5>
        <small>Введите детали оплаты.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col md='6' className='mb-1'>
          <Label className='form-label' for='paymentType'>
          Тип оплаты
          </Label>
          <Controller
                  name="paymentType"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id='paymentType'
              className={classnames("react-select", {
                "is-invalid": errors.paymentType && true
              })}
              classNamePrefix='select'
              options={paymentTypeOptions}
              placeholder='Выбирите тип оплаты'
              {...field}
            />
            )}
            />
            {errors && errors.paymentType && (
              <FormFeedback>Пожалуйста выбирите тип оплаты</FormFeedback>
            )}  
          </Col>
          <Col md='6' className="d-flex justify-content-between align-items-end gap-10 mb-1">
                <div>
                  <Label className="form-label" for="earnedPoints">
                    Начислено балов
                  </Label>
                  <Controller
                    name="earnedPoints"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        disabled
                        name="earnedPoints"
                        id="earnedPoints"
                        type="number"
                        placeholder=""
                        invalid={errors.earnedPoints && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.earnedPoints && (
                    <FormFeedback>
                      Пожалуйста введите количество балов
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="usedPoints">
                    Использовано балов
                  </Label>
                  <Controller
                    name="usedPoints"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        disabled
                        name="usedPoints"
                        id="usedPoints"
                        type="number"
                        placeholder=""
                        invalid={errors.usedPoints && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.usedPoints && (
                    <FormFeedback>Пожалуйста введите количество балов</FormFeedback>
                  )}
                </div>
                <div>
                <Button color='primary' onClick={() => {}}>
                <span className='align-middle d-sm-inline-block d-none'>Изменить</span>
               </Button>
               </div>
              </Col>
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
                  <FormFeedback>Пожалуйста введите коментарий</FormFeedback>
                )}
              </Col>     
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Назад</span>
          </Button>
          <Button  type='submit' color='success' className='btn-submit' >
            {selectedOrder ? "Изменить" : "Создать"}
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Payment
