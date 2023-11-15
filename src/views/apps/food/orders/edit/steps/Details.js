// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
// ** Third Party Components
import Select from 'react-select'
import classnames from "classnames"

import { ArrowLeft, ArrowRight } from 'react-feather'
import { orderType } from '../../../../../../configs/initial'
// ** Utils
import { selectThemeColors, checkIsValid, initSelect } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Form, Button, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  user: '',
  store: '',
  table: '',
  orderType: '',
  waiter: ''
  }
const requiredFields = ["user", "store"]

const Details = ({ stepper, userData, type, orderData, handleUpdate, stores, users, waiters, tables, t }) => {
  // if (!stores.length || !users.length || !waiters.length || !tables.length) return
  const navigate = useNavigate()
  const handleBack = () => navigate("/apps/food/orders/list/")
  const handleNext = () => stepper.next()

  const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)
  const storeOptions = filtredStore.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  // const waiterOptions = waiters.map((waiter) => ({
  //   value: String(waiter.id),
  //   label: waiter.full_name ? waiter.full_name : waiter.telegram
  // }))

  // const tableOptions = tables.map((table) => ({
  //   value: String(table.id),
  //   label: table.number
  // }))

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: user.name ? user.name : user.login
  }))

  const orderTypeOptions = Object.keys(orderType).map((key) => ({
    value: key,
    label: orderType[key]
  }))
  const [waiterOptions, setWaiterOptions] = useState(null)
  const [tableOptions, setTableOptions] = useState(null) 

  const initWaiterOptions = () => {
    const filteredWaiters = orderData && orderData.business_id ? waiters.filter(
      waiter => parseInt(waiter.business_id.id) === parseInt(orderData.business_id)
    ) : userData.type === 2 ? waiters.filter(
      waiter => parseInt(waiter.business_id.id) === parseInt(userData.id)
    ) : waiters

    setWaiterOptions(filteredWaiters.map(waiter => ({
    value: String(waiter.id),
    label: waiter.full_name ? waiter.full_name : waiter.telegram
    }))
    )
}

const initTableOptions = () => {
  const filteredTables = orderData && orderData.business_id ? tables.filter(
    table => parseInt(table.business_id.id) === parseInt(orderData.business_id)
  ) : userData.type === 2 ? tables.filter(
    table => parseInt(table.business_id.id) === parseInt(userData.id)
  ) : tables
  setTableOptions(filteredTables.map(table => ({
  value: String(table.id),
  label: table.number
}))
)
}
  useEffect(() => {
    initTableOptions()
    initWaiterOptions()
  }, [tables, waiters])

  const values = orderData ? {
    user: orderData.user_id ? initSelect(userOptions, orderData.user_id) : '',
    store: orderData.business_id ? initSelect(storeOptions, orderData.business_id) : '',
    table: orderData.table ? initSelect(tableOptions, orderData.table) : '',
    orderType: orderData.order_type ? initSelect(orderTypeOptions, orderData.order_type) : '',
    waiter: orderData.waiter ? initSelect(waiterOptions, orderData.waiter) : ''
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

  const handleStoreChange = (selectedOption) => {
    setValue("table", { value: "", label: t('FeedsData.tablePlaceholder') })
    setValue("waiter", { value: "", label: t('selectWaiter') })
    const filteredWaiters = waiters.filter(
      waiter => parseInt(waiter.business_id.id) === parseInt(selectedOption.value)
    )
    setWaiterOptions(
      filteredWaiters.map(waiter => ({
        value: String(waiter.id),
        label: waiter.full_name ? waiter.full_name : waiter.telegram
      }))
    )
    const filteredTables = tables.filter(
      table => parseInt(table.business_id.id) === parseInt(selectedOption.value)
    )
    setTableOptions(
      filteredTables.map(table => ({
        value: String(table.id),
        label: table.number
      }))
    )

    setValue("store", selectedOption)
  }
  

  const onSubmit = (data) => {
    const newData = {}
    if (checkIsValid(data, requiredFields)) {
      if (data.user) newData.user_id = data.user.value
      if (data.store) newData.business_id = data.store.value
      if (data.table.value) newData.table = parseInt(data.table.value)
      if (data.orderType) newData.order_type = parseInt(data.orderType.value)
      if (data.waiter.value) newData.waiter = parseInt(data.waiter.value)
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
        <h5 className='mb-0'>{t('ordersData.step1')}</h5>
        <small>{t('ordersData.step1Title')}</small>
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
          <Label className='form-label' for='waiter'>
          {t('waiter')}
          </Label>
          <Controller
                  name="waiter"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
            <Select
              theme={selectThemeColors}
              isClearable={false}
              isDisabled={!getValues("store").value}
              id='waiter'
              className={classnames("react-select", {
                "is-invalid": errors.waiter && true
              })}
              classNamePrefix='select'
              options={waiterOptions}
              placeholder={t('selectWaiter')}
              {...field}
            />
            )}
            />
            {errors && errors.waiter && (
              <FormFeedback>{t('waiterFeedback')}</FormFeedback>
            )}
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='table'>
          {t('ordersData.tableLabel')}
          </Label>
          <Controller
                  name="table"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
            <Select
              theme={selectThemeColors}
              isClearable={false}
              isDisabled={!getValues("store").value}
              id='table'
              // value={field.value}
              className={classnames("react-select", {
                "is-invalid": errors.table && true
              })}
              classNamePrefix='select'
              options={tableOptions}
              placeholder={t('ordersData.tablePlaceholder')}
              {...field}
            />
            )}
            />
            {errors && errors.table && (
              <FormFeedback>{t('ordersData.tableFeedback')}</FormFeedback>
            )}
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='orderType'>
          {t('ordersData.orderTypeLabel')}
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
              placeholder={t('ordersData.orderTypePlaceholder')}
              {...field}
            />
            )}
            />
            {errors && errors.orderType && (
              <FormFeedback>{t('ordersData.orderTypeFeedback')}</FormFeedback>
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
