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
import { getShifts, addShifts, editShifts, delShifts } from "../store"
import { useForm, Controller } from "react-hook-form"
import { checkIsValid, formatStringTime, formatTimeSave } from "@utils"
import classnames from "classnames"
import { Minus, ChevronDown, Edit, Trash2 } from "react-feather"
import "@styles/react/apps/app-users.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
import "@styles/base/pages/app-ecommerce-details.scss"

const defaultValues = {
  timeBeg: "",
  timeEnd: "",
  description: "" 
}
const requiredFields = ["timeBeg", "timeEnd"]


const ModalІShifts = ({isOpen, toggle, business, t }) => {
  // const dispatch = useDispatch()
  const [shifts, setShifts] = useState([])
  const [selectedShifts, setSelectedShifts] = useState('')
  const update = id => getShifts(id).then(response => setShifts(response))

  useEffect(() => {
    update(business)
  }, []) 

// console.log(shifts)
  const values = selectedShifts ? {
    timeBeg: selectedShifts.start_time ? selectedShifts.start_time : "",
    timeEnd: selectedShifts.end_time ? selectedShifts.end_time : "",
    description: selectedShifts.description ? selectedShifts.description : ""  
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
    delShifts(id)
    update(business)
  }

  const handleEdit = (event, row) => {
    event.preventDefault()
    setSelectedShifts(row)
  }

  const handleClear = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
      setSelectedShifts('')
      reset({...defaultValues})
  } 

  const closeModal = () => {
    handleClear()
    toggle()
  }

  const onSubmit = (data) => {
    // console.log(data)
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
      // formData.append("business", business)
      formData.append(
          "start_time",
          !selectedShifts ? formatTimeSave(data.timeBeg) : data.timeBeg
        )
      formData.append(
          "end_time",
          !selectedShifts ? formatTimeSave(data.timeEnd) : data.timeEnd
        )
      if (data.description) formData.append("description", data.description)
      
      if (selectedShifts) {
        editShifts(selectedShifts.id, formData).then(handleClear())
      } else {
        addShifts(formData).then(handleClear())
      }
      update(business)
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
      name: t('StoreData.startTime'),
      minWidth: '70px',
      sortable: true,
      sortField: 'start_time',
      selector: row => row.start_time,
      cell: row => <span className='text-capitalize'>{formatStringTime(row.start_time)}</span>
    },
    {
      name: t('StoreData.endTime'),
      minWidth: '70px',
      sortable: true,
      sortField: 'end_time',
      selector: row => row.start_time,
      cell: row => <span className='text-capitalize'>{formatStringTime(row.end_time)}</span>
    },
    {
      name: t('descriptionLabel'),
      minWidth: '150px',
      sortable: true,
      sortField: 'description',
      selector: row => row.description,
      cell: row => <span className='text-capitalize'>{row.description}</span>
    },
    {
      name: t('action'),
      width: '120px',
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
          {t('edit')}
          </UncontrolledTooltip>
          <Button.Ripple 
          className='btn-icon cursor-pointer p-0' 
          color='transparent' 
          id={`del-tooltip-${row.id}`} 
          onClick={event => handleDel(event, row.id)}>
            <Trash2 size={17} className='mx-1' />
          </Button.Ripple>
          <UncontrolledTooltip placement='top' target={`del-tooltip-${row.id}`}>
          {t('delete')}
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
       <Col md={4} >
                <Label className="form-label" for="timeBeg">
                {t('StoreData.workTime')}<span className="text-danger">*</span>
                </Label>
                <div className="d-flex justify-content-center align-items-center gap-10">
                  <div>
                    <Controller
                      id="timeBeg"
                      name="timeBeg"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Flatpickr
                          // className="form-control width-70"
                          value={field.value}
                          id="timeBeg"
                          name="timeBeg"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          className={classnames("form-control width-70", {
                            "is-invalid": errors.timeBeg && true
                          })}
                          onChange={(date) => setValue("timeBeg", date)}
                        />
                      )}
                    />
                  </div>
                  <Minus size={14} />
                  <div>
                    <Controller
                      id="timeEnd"
                      name="timeEnd"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Flatpickr
                          // className="form-control width-70"
                          value={field.value}
                          id="timeEnd"
                          name="timeEnd"
                          invalid={errors.timeEnd && true}
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true
                          }}
                          className={classnames("form-control width-70", {
                            "is-invalid": errors.timeEnd && true
                          })}
                          onChange={(date) => setValue("timeEnd", date)}
                        />
                      )}
                    />
                  </div>
                  {(errors && errors.timeBeg) && (<FormFeedback id='ffb'>{t('StoreData.workTimeFeedback')}</FormFeedback>)}
                </div>
              </Col>
              <Col md={4} >
                <Label className="form-label" for="name">
                {t('descriptionLabel')}
                </Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      id="description"
                      placeholder="Введите описание"
                      invalid={errors.description && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.description && (
                  <FormFeedback>{t('descriptionFeedback')}</FormFeedback>
                )}
              </Col>
              <Col md={3} className="d-flex justify-content-center align-items-end">
              <Button type="submit" color="primary" >
              {selectedShifts ? t('StoreData.edit') : t('Add')}
              </Button>
              </Col>
          </Row>
      </Form>
      <div className='react-dataTable user-view-account-projects mt-2'>
        <DataTable
          id='dts'
          dataKey="id"
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={shifts}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<h6 className='text-capitalize'>{t('notFound')}</h6>}
        />
      </div>
    </ModalBody>
  </Modal>
  )
}

export default ModalІShifts