import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import { getDelivery, addDelivery, editDelivery, delDelivery } from "../store"
import { useForm, Controller } from "react-hook-form"
import { checkIsValid, formatNumberInt, formatNumber} from "@utils"
import classnames from "classnames"
import { Minus, ChevronDown, Edit, Trash2 } from "react-feather"
import "@styles/react/apps/app-users.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const defaultValues = {
  radius: "",
  price: ""
}
const requiredFields = ["radius", "price"]


const ModalІDelivery = ({isOpen, toggle, business }) => {
  // const dispatch = useDispatch()
  const [deliveryTariffs, setDeliveryTariffs] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState('')
  const update = id => getDelivery(id).then((response) => setDeliveryTariffs(response))

  useEffect(() => {
    update(business)
  }, [isOpen]) 

// console.log(shifts)
  const values = selectedDelivery ? {
    radius: selectedDelivery.radius ? selectedDelivery.radius : '',
    price: selectedDelivery.price ? selectedDelivery.price : ''
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


  const handleDel = (event, id) => {
    event.preventDefault()
    delDelivery(id).then(() => update(business))
  }

  const handleEdit = (event, row) => {
    event.preventDefault()
    setSelectedDelivery(row)
  }

  const handleClear = () => {
    update(business)
    for (const key in defaultValues) {
      setValue(key, '')
    }
      setSelectedDelivery('')
      reset({...defaultValues})
  } 

  const closeModal = () => {
    handleClear()
    toggle()
  }

  const onSubmit = (data) => {
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      formData.append("radius", data.radius)
      formData.append("price", data.price)
      formData.append("business", business)
      
      if (selectedDelivery) {
        editDelivery(selectedDelivery.id, formData).then(() => handleClear())
      } else {
        addDelivery(formData).then(() => handleClear())
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


  const columns = [
    {
      name: '№',
      sortable: false,
      minWidth: '10px',
      selector: row => row,
      cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
      name: 'Радиус, м',
      minWidth: '100px',
      sortable: true,
      sortField: 'radius',
      selector: row => row.radius,
      cell: row => <span className='text-capitalize'>{formatNumberInt(row.radius)}</span>
    },
    {
      name: (<span dangerouslySetInnerHTML={{ __html: "Цена, &#x0441;&#x332;" }} />),
      minWidth: '100px',
      sortable: true,
      sortField: 'price',
      selector: row => row.price,
      cell: row => <span className='text-capitalize'>{formatNumber(row.price)}</span>
    },
    {
      name: 'Действия',
      minWidth: '80px',
      cell: row => (
        <div className='column-action d-flex align-items-center p-0'>
          <Button.Ripple 
          className='btn-icon cursor-pointer p-0' 
          color='transparent' 
          id={`edit-tooltip-${row.id}`}  
          onClick={event => handleEdit(event, row)}>
          <Edit size={17} className='mx-1' />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`edit-tooltip-${row.id}`}>
            Редактировать
          </UncontrolledTooltip>
          <Button.Ripple 
          className='btn-icon cursor-pointer p-0' 
          color='transparent' 
          id={`del-tooltip-${row.id}`} 
          onClick={event => handleDel(event, row.id)}>
            <Trash2 size={17} className='mx-1' />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`del-tooltip-${row.id}`}>
            Удалить
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  return (
    <Modal
    isOpen={isOpen}
    toggle={closeModal}
    className="modal-dialog-centered w-700"
  >
    <ModalHeader
      className="bg-transparent"
      toggle={closeModal}
    ></ModalHeader>
    <ModalBody className="px-sm-5 mx-50 pb-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="d-flex justify-content-center align-items-end gap-10">
      <Col className="d-flex justify-content-between gap-30">
                <div>
                  <Label className="form-label" for="radius">
                  Радиус доставки, м
                  </Label>
                  <Controller
                    name="radius"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        name="radius"
                        id="radius"
                        type="number"
                        placeholder=""
                        invalid={errors.radius && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.radius && (
                    <FormFeedback>
                      Пожалуйста введите радиус доставки
                    </FormFeedback>
                  )}
                </div>
                <div>
                  <Label className="form-label" for="price">
                    Стоимость, &#x0441;&#x332;
                  </Label>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        name="price"
                        id="price"
                        type="number"
                        placeholder=""
                        invalid={errors.price && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.price && (
                    <FormFeedback>Пожалуйста введите стоимость доставки</FormFeedback>
                  )}
                </div>
              </Col>
              <Col md={3} className="d-flex justify-content-center align-items-end">
              <Button type="submit" color="primary" >
              {selectedDelivery ? "Изменить" : "Добавить"}
              </Button>
              </Col>
          </Row>
      </Form>
      <div className='react-dataTable user-view-account-projects mt-2'>
        <DataTable
          id='dt-list'
          dataKey="id"
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={deliveryTariffs}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<h6 className='text-capitalize'>Цены доставки не найдены</h6>}
        />
      </div>
    </ModalBody>
  </Modal>
  )
}

export default ModalІDelivery