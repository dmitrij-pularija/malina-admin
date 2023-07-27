// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { statusObj } from '../../../../../configs/initial'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const EditActions = ({ id, status, setSendSidebarOpen, setAddPaymentOpen }) => {

  const renderSelect = (obj, status) => {
    const statusOptions = Object.entries(obj).map(([key, item]) => (
      <option key={key} value={key}>{item.label}</option>
    ))
       return (
        <Input type='select' id='payment-select' defaultValue={status}>
      {statusOptions} 
      </Input>
       )
     
   }

  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
            Сохранить
          </Button>
          <Button color='success' block onClick={() => setAddPaymentOpen(true)}>
            Изменить статус
          </Button>
        </CardBody>
      </Card>
      <div className='mt-2'>
        <div className='invoice-payment-option'>
          <p className='mb-50'>Выберите новый статус:</p>
          {renderSelect(statusObj, status)}
        </div>
      </div>
    </Fragment>
  )
}

export default EditActions
