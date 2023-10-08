// ** Custom Components
import Sidebar from '@components/sidebar'
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { editOrder, getOrder } from "../store"
// ** Icons Imports
import classnames from "classnames"
import { Link } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors, initSelect } from '@utils'
// ** Reactstrap Imports
import { Form, Label, Button, FormFeedback } from 'reactstrap'

const defaultValues = {
  orderStatus: ''
}

const SidebarChangeStatatus = ({ open, toggleSidebar, statuses, selectedOrder  }) => {
  const dispatch = useDispatch()
  const statusOptions = statuses.map((item) => ({
    value: String(item.id),
    label: item.statusName
  }))

  const values = {
    orderStatus: selectedOrder ? initSelect(statusOptions, selectedOrder.status.toString()) : ''
  }

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
    // console.log(data.orderStatus.value)
    if (data.orderStatus.value.toString() !== selectedOrder.status.toString()) {
      const cart = selectedOrder.carts.map(cart => parseInt(cart.id))
      dispatch(editOrder({ id: selectedOrder.id, order: {order_business: selectedOrder.order_business.toString(), carts: cart, status: parseInt(data.orderStatus.value)}})).then(response => {
        if (response.meta.requestStatus === 'fulfilled') handleClose()
      })  
    
      //     dispatch(editCategory({ id: selectedCategory.id, formData })).then(response => response.meta.requestStatus === 'fulfilled' && handleClose())
    } else {
      setError('orderStatus', { type: "manual"})
    }
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
        <div className='mb-3'>
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
