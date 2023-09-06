// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { businessType, orderType, paymentType } from '../../../../../../configs/initial'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const Details = ({ stepper, type, stores, users }) => {
  
  const storeOptions = stores.map((store) => ({
    value: String(store.id),
    label: store.name
  }))

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: user.name ? user.name : user.login
  }))

  const orderTypeOptions = orderType.map((item, key) => ({
    value: String(key),
    label: item
  }))
  
  const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Spain', label: 'Spain' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Australia', label: 'Australia' }
  ]

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ]

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Реквизиты</h5>
        <small>Добввьте реквизиты заказа</small>
      </div>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='store'>
          Завдение<span className='text-danger'>*</span>
          </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id='store'
              className='react-select'
              classNamePrefix='select'
              options={storeOptions}
              placeholder='Выбирите заведение'
              // defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='user'>
          Клиент<span className='text-danger'>*</span>
          </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id='user'
              className='react-select'
              classNamePrefix='select'
              options={userOptions}
              placeholder='Выбирите клиента'
              // defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='user'>
          Тип заказа
          </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id='user'
              className='react-select'
              classNamePrefix='select'
              options={orderTypeOptions}
              placeholder='Выбирите nип заказа'
              // defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`last-name-${type}`}>
              Last Name
            </Label>
            <Input type='text' name='last-name' id={`last-name-${type}`} placeholder='Doe' />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`country-${type}`}>
              Country
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`language-${type}`}>
              Language
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={languageOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Details
