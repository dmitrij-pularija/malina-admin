import { useState, useEffect } from "react"
import Sidebar from '@components/sidebar'
import { selectThemeColors, initSelect, checkIsValid } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormFeedback, Form, Input } from 'reactstrap'
import { addTable, editTable } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  number: '',
  landingUrl: '',
  business: '',
  waiter: ''
}

const requiredFields = ["number", "waiter"]

const SidebarNewTable = ({ store, open, toggleSidebar, waiters, selectedTable, setSelectedTable, t }) => {
  const dispatch = useDispatch()
  // const [waiterOptions, setWaiterOptions] = useState([])

//   const initWaiterOptions = () => {
//     const filteredWaiters = waiters.filter(waiter => parseInt(waiter.business_id.id) === parseInt(store))
//     setWaiterOptions(filteredWaiters.map(waiter => ({
//       value: String(waiter.id),
//       label: waiter.full_name
//   })))
// }

  const filteredWaiters = waiters.filter(waiter => parseInt(waiter.business_id.id) === parseInt(store)) 
  const waiterOptions = filteredWaiters.map(waiter => ({
    value: String(waiter.id),
    label: waiter.full_name
  }))
  
  const waiterList = selectedTable ? selectedTable.waiter.map(waiter => parseInt(waiter.id)) : [] 

  // useEffect(() => {
  //   initWaiterOptions()
  // }, [])

  // const filtredStore = stores.filter(store => parseInt(store.business_type) === 1)   
  // const storeOptions = filtredStore.map(store => ({
  //   value: String(store.id),
  //   label: store.name
  // }))

  
  const values = selectedTable ? {
    number: selectedTable.number,
    business: store,
    // business: selectedTable.business_id ? initSelect(storeOptions, selectedTable.business_id.id) : '',
    landingUrl: selectedTable.landing_url ? selectedTable.landing_url : '',
    waiter: waiterOptions.filter(i => waiterList.includes(parseInt(i.value)))
   } : {}

   const {
    reset,
    control,
    setValue,
    getValues,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const handleClose = () => {
  setSelectedTable('')
  toggleSidebar()
  reset({ ...defaultValues }) 
} 

  const onSubmit = data => {
    if (checkIsValid(data, requiredFields)) {
      const waiterValues = data.waiter ? data.waiter.map(waiter => parseInt(waiter.value)) : []  
      if (selectedTable) { 
      dispatch(
        editTable({
          id: selectedTable.id, 
          number: parseInt(data.number),
          business_id: store,
          landing_url: data.landingUrl ? data.landingUrl : '',
          waiter: waiterValues
        })
      ).then(
        (response) => response.meta.requestStatus === "fulfilled" && handleClose()
      )
      } else {
        dispatch(
        addTable({
          number: parseInt(data.number),
          business_id: store,
          landing_url: data.landingUrl ? data.landingUrl : '',
          waiter: waiterValues
        })
      ).then(
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

  // const handleSidebarClosed = () => {
  //   for (const key in defaultValues) {
  //     setValue(key, '')
  //   }
  //   reset()
  // }
  const handleWaiterChange = selectedOption => setValue("waiter", selectedOption)

  // const handleBusinessChange = selectedOption => {
  //   setValue("waiter", "")
  //   const filteredWaiters = waiters.filter(
  //     waiter => parseInt(waiter.business_id.id) === parseInt(selectedOption.value)
  //   )
  //   setWaiterOptions(
  //     filteredWaiters.map(waiter => ({
  //       value: String(waiter.id),
  //       label: waiter.full_name
  //     }))
  //   )
  //   setValue("business", selectedOption)
  // }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedTable ? t('tablesData.edit') : t('tablesData.add')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleClose}
      // onClosed={handleClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='number'>
          {t('tablesData.number')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='number'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='number' placeholder={t('tablesData.placeholderNumber')} invalid={errors.number && true} {...field} />
            )}
          />
        {errors && errors.number && (<FormFeedback>{t('tablesData.feedbackNumber')}</FormFeedback>)}    
        </div> 
        {/* <div className='mb-1'>
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
                    value={field.value}
                    options={storeOptions}
                    onChange={handleBusinessChange}
                    theme={selectThemeColors}
                    placeholder="Выберите Заведение"
                    className={classnames("react-select", {
                      "is-invalid": errors.business && true
                    })}
                  />
                )}
              />
              {errors && errors.business && (
                <FormFeedback>Пожалуйста выберите заведение</FormFeedback>
              )}
            </div>
        <div className='mb-1'>
          <Label className='form-label' for='landingUrl'>
          Landing url
          </Label>
          <Controller
            name='landingUrl'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Input id='landingUrl' placeholder='Введите Landing url' invalid={errors.landingUrl && true} {...field} />
            )}
          />
        {errors && errors.landingUrl && (<FormFeedback>Пожалуйста введите Landing url</FormFeedback>)}    
        </div>  */}
        <div className='mb-3'>
          <Label className='form-label' for='waiter'>
          {t('tablesData.waiter')}
          </Label>
          <Controller
            name='waiter'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isMulti
                id='waiter'
                value={field.value}
                // isDisabled={!getValues("business").value && !selectedTable}
                isClearable={false}
                classNamePrefix='select'
                options={waiterOptions}
                onChange={handleWaiterChange}
                theme={selectThemeColors}
                placeholder={t('tablesData.placeholderWaiter')}
                className={classnames('react-select', { 'is-invalid': errors.waiter && true })}
              />
            )}
          />
         {errors && errors.waiter && (<FormFeedback>{t('tablesData.feedbackWaiter')}</FormFeedback>)} 
        </div>   
        <Button type='submit' className='me-1' color='primary'>
        {t('save')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={handleClose}>
        {t('cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewTable