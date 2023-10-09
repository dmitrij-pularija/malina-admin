// ** Custom Components
import Sidebar from '@components/sidebar'
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { changeStatatus, getOrder } from "../store"
// ** Icons Imports
import classnames from "classnames"
import { Link } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors, initSelect } from '@utils'
// ** Reactstrap Imports
import { Form, Input, Label, Button, FormFeedback } from 'reactstrap'

const defaultValues = {
  orderStatus: '',
  paymentStatus: '',
  isCourierDelivery: '',
  timeDelivery: ''
}

const SidebarChangeStatatus = ({ open, toggleSidebar, statuses, selectedOrder  }) => {
  const dispatch = useDispatch()
  const statusOptions = statuses.map((item) => ({
    value: String(item.id),
    label: item.statusName
  }))

  const values = selectedOrder ? {
    orderStatus: initSelect(statusOptions, selectedOrder.status.toString()),
    paymentStatus: selectedOrder.payment_status,
    isCourierDelivery: selectedOrder.is_courier_delivery,
    timeDelivery: selectedOrder.time_delivery ? parseInt(selectedOrder.time_delivery) : 0
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
    for (const key in defaultValues) {
      setValue(key, '')
    }
      reset({...defaultValues})
      dispatch(getOrder(selectedOrder.id))
      toggleSidebar()

  }

  const onSubmit = data => {
    // const order = {}
    // console.log(data.orderStatus.value)
    // if (data.orderStatus.value.toString() !== selectedOrder.status.toString()) {
      // const cart = selectedOrder.carts.map(cart => parseInt(cart.id))
      changeStatatus({ id: parseInt(selectedOrder.id), order: { status: parseInt(data.orderStatus.value), is_courier_delivery: data.isCourierDelivery, payment_status: data.paymentStatus, time_delivery: data.timeDelivery }}).then(response => {
        // changeStatatus({ id: parseInt(selectedOrder.id), order: { status: parseInt(data.orderStatus.value) }}).then(response => {
          // response.meta.requestStatus === 'fulfilled' || 
        if (response.status === 200) handleClose()
      })  
    
      //     dispatch(editCategory({ id: selectedCategory.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
    // } else {
      // setError('orderStatus', { type: "manual"})
    // }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Изменение статуса заказа'
      headerClassName='mt-1 mb-1'
      contentClassName='p-0'
      bodyClassName='pb-sm-0 pb-3'
      toggleSidebar={handleClose}
    >
      <Form  className='m3-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='orderStatus'>
          Статус заказа
          </Label>
          <Controller
            id='orderStatus'
            name='orderStatus'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id='orderStatus'
                name='orderStatus'
                isClearable={false}
                classNamePrefix='select'
                options={statusOptions}
                theme={selectThemeColors}
                placeholder={"Выберите статус"}
                className={classnames("react-select", {
                  "is-invalid": errors.orderStatus && true
                })}
                {...field}
                />
              )}
            />
            {errors && errors.orderStatus && (
              <FormFeedback>Текущий статус соответствует выбранному</FormFeedback>
            )}
        </div>
        <div className='form-check form-check-primary mb-1'>
                 <Controller
                   name='paymentStatus'
                   control={control}
                   rules={{ required: false }}
                   render={({ field }) => (
                     <Input id='paymentStatus'  type='checkbox' checked={field.value} {...field}/>
                   )}
                 />
                 <Label className='form-label' for='paymentStatus'>
                 Заказ оплачен
                 </Label>
        </div>
        <div className='mb-1' >
            <Label className="form-label" for="timeDelivery">
              Время доставки, мин
            </Label>
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
                  {(errors && errors.rdt) && (<FormFeedback id='ffb'>Пожалуйста введите время доставки</FormFeedback>)}
                </div>
              </div>
        <div className='form-check form-check-primary mb-3'>
                 <Controller
                   name='isCourierDelivery'
                   control={control}
                   rules={{ required: false }}
                   render={({ field }) => (
                     <Input id='isCourierDelivery'  type='checkbox' checked={field.value} {...field}/>
                   )}
                 />
                 <Label className='form-label' for='isCourierDelivery'>
                 Доставка курьером
                 </Label>
        </div>
        <Button type='submit' className='me-1' color='primary'>
          Изменить
        </Button>
        <Button type='reset' color='secondary' outline onClick={handleClose}>
          Отменить
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarChangeStatatus
