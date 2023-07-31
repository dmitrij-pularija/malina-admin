// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Modal,
  Label,
  Button,
  CardBody,
  Progress,
  Input,
  FormFeedback,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import withReactContent from 'sweetalert2-react-content'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const planOptions = [
  { value: 'standard', label: 'Standard - $99/month' },
  { value: 'exclusive', label: 'Exclusive - $249/month' },
  { value: 'enterprise', label: 'Enterprise - $499/month' }
]

const MySwal = withReactContent(Swal)

const Rewards = ({ score }) => {
  // ** States
  const [show, setShow] = useState(false)

  // const handleConfirmCancel = () => {
  //   return MySwal.fire({
  //     title: '',
  //     text: 'Are you sure you would like to cancel your subscription?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: 'success',
  //         title: 'Unsubscribed!',
  //         text: 'Your subscription cancelled successfully.',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Cancelled',
  //         text: 'Unsubscription Cancelled!!',
  //         icon: 'error',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     }
  //   })
  // }

  return score === 0 ? (<Card><CardHeader tag='h4'><CardTitle tag='h4'>Bонусные баллы отсутствуют</CardTitle></CardHeader></Card>) : (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Начисленно бонусных баллов</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
            <div className='d-flex justify-content-center'>
              <h1 className='fw-bolder display-4 mb-0 text-primary'>{score}</h1>
            </div>
            </Col>
            </Row>
            <Row>
            <Col>
            <div className='d-flex justify-content-center'>
              <Button color='primary' className='mt-1' onClick={() => setShow(true)}>
                Снять бвллы
              </Button>
              </div>
              {/* <Button outline color='danger' className='mt-1' onClick={handleConfirmCancel}>
                Cancel Subscription
              </Button> */}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-5 pb-2'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Снятие баллов</h1>
            <p>Доступная сумма для снятия</p>
          </div>
          <Row className='pt-20'>
          <div className='d-flex justify-content-center me-1 mb-2'>
              <h1 className='fw-bolder display-4 mb-0 text-primary me-25'>{score}</h1>
            </div>
          </Row>
          <Row>  
            <Col md='12' sm='12'>
            <div className='form-floating mb-3'>
              <Input type='number' id='floatingInput' placeholder='Введите сумму для снятия' valid />
              <FormFeedback>Введите число в предалах доступной суммы балов </FormFeedback>
              <label htmlFor='floatingInput'>Введите сумму для снятия</label>
            </div>
          </Col>
            </Row>
          <Row>  
            <Col className='d-flex justify-content-center gap-10 pt-50'>
              <Button color='primary' className='mb-1'>Снять</Button>
              <Button outline color='danger' className='mb-1' onClick={() => setShow(!show)}>
              Отменить
            </Button>   
            </Col>
          </Row>
        </ModalBody>
        {/* <hr />
        <ModalBody className='px-5 pb-3'>
          <h6>Доступно для снятия</h6>
          <div className='d-flex justify-content-between align-items-center flex-wrap'>
            <div className='d-flex justify-content-center me-1 mb-1'>
              <h1 className='fw-bolder display-4 mb-0 text-primary me-25'>100</h1>
            </div>
            <Col sm={4} className='text-sm-end mt-2'>
              <Button color='primary'>Снять</Button>
              <Button outline color='danger' className='mb-1' onClick={handleConfirmCancel}>
              Отменить
            </Button>  
            </Col>

          </div>
        </ModalBody> */}
      </Modal>
    </Fragment>
  )
}

export default Rewards