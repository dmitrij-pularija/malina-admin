import { Fragment } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import classnames from "classnames"
import { ArrowLeft, ArrowRight } from 'react-feather'
import { orderType } from '../../../../../../configs/initial'
import { selectThemeColors, checkIsValid, initSelect } from '@utils'
import { Label, Row, Col, Form, Button, FormFeedback } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  store: '',
  user: '',
  orderType: ''
  }
const requiredFields = ["user", "store"]

const Details = ({ stepper, userData, orderData, handleUpdate, stores, users, t }) => {
  const navigate = useNavigate()
  const handleBack = () => navigate("/apps/beauty/orders/list/")
  const handleNext = () => stepper.next()

  const filtredStore = userData.type === 2 ? stores.filter(store => parseInt(store.id) === parseInt(userData.id)) : stores.filter(store => parseInt(store.business_type) === 2) 
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: user.name ? user.name : user.login
  }))

  const orderTypeOptions = Object.keys(orderType).map((key) => ({
    value: key,
    label: orderType[key]
  }))
 
  const values = orderData ? {
    user: orderData.user_account ? initSelect(userOptions, orderData.user_account) : '',
    store: orderData.order_business ? initSelect(storeOptions, orderData.order_business) : '',
    orderType: orderData.order_type ? initSelect(orderTypeOptions, orderData.order_type) : ''
  } : {...defaultValues, store: userData.type === 2 ? initSelect(storeOptions, userData.id) : "", user: userData.type === 1 ? initSelect(userOptions, userData.id) : ""}
  
  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const handleStoreChange = (selectedOption) => setValue("store", selectedOption)
  

  const onSubmit = (data) => {
    const newData = {}
    if (checkIsValid(data, requiredFields)) {
      if (data.user) newData.user_account = data.user.value
      if (data.store) newData.order_business = data.store.value
      if (data.orderType) newData.order_type = parseInt(data.orderType.value)
      if (newData) handleUpdate(newData)
      handleNext()
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
      <div className='content-header mb-1'>
        <h5 className='mb-0'>{t('ordersBeautyData.step1')}</h5>
        <small>{t('ordersBeautyData.step1Title')}</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='store'>
          {t('storeLabel')}<span className='text-danger'>*</span>
          </Label>
          <Controller
                  name="store"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
            <Select
              isDisabled={userData && userData.type === 2}
              theme={selectThemeColors}
              isClearable={false}
              id='store'
              value={field.value}
              className={classnames("react-select", {
                "is-invalid": errors.store && true
              })}
              classNamePrefix='select'
              options={storeOptions}
              placeholder={t('storePlaceholder')}
              onChange={handleStoreChange}
            />
            )}
            />
            {errors && errors.store && (
              <FormFeedback>{t('storeFeedback')}</FormFeedback>
            )}  
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='user'>
          {t('customer')}<span className='text-danger'>*</span>
          </Label>
          <Controller
                  name="user"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
            <Select
              isDisabled={userData && userData.type === 1}
              theme={selectThemeColors}
              isClearable={false}
              id='user'
              className={classnames("react-select", {
                "is-invalid": errors.user && true
              })}
              classNamePrefix='select'
              options={userOptions}
              placeholder={t('customerPlaceholder')}
              {...field}
            />
            )}
            />
            {errors && errors.user && (
              <FormFeedback>{t('customerFeedback')}</FormFeedback>
            )} 
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='orderType'>
          {t('ordersBeautyData.orderTypeLabel')}
          </Label>
          <Controller
                  name="orderType"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id='orderType'
              className={classnames("react-select", {
                "is-invalid": errors.orderType && true
              })}
              classNamePrefix='select'
              options={orderTypeOptions}
              placeholder={t('ordersBeautyData.orderTypePlaceholder')}
              {...field}
            />
            )}
            />
            {errors && errors.orderType && (
              <FormFeedback>{t('ordersBeautyData.orderTypeFeedback')}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <Button color='primary' className='btn-prev' outline onClick={() => handleBack()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>{t('Prev')}</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next' >
            <span className='align-middle d-sm-inline-block d-none'>{t('Next')}</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Details
