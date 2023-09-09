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
} from "reactstrap"
import Flatpickr from "react-flatpickr"
import { getShifts, addShifts, editShifts, delShifts } from "../store"
import { useForm, Controller } from "react-hook-form"
import { checkIsValid, formatTime, formatTimeSave } from "@utils"
import classnames from "classnames"
import { Minus, ChevronDown } from "react-feather"
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


const ModalІShifts = ({isOpen, toggle }) => {
  // const dispatch = useDispatch()
  const [shifts, setShifts] = useState([])
  const [selectedShifts, setSelectedShifts] = useState(null)
const update = () => getShifts().then(response => { setShifts(response) })

  useEffect(() => {
    update()
  }, []) 

console.log(shifts)
  const values = {}

  const {
    reset,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, values })

  const closeModal = () => {
    setSelectedShifts(null)
    reset()
    // toggle()
  }

  const onSubmit = (data) => {
    console.log(data)
    if (checkIsValid(data, requiredFields)) {
      const formData = new FormData()
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
        editShifts(selectedShifts.id, formData).then(update())
      } else {
        addShifts(formData).then(update())
      }
      closeModal()
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
      minWidth: '30px',
      selector: row => row,
      cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
      name: 'Начало',
      minWidth: '70px',
      sortable: true,
      sortField: 'start_time',
      selector: row => row.start_time,
      cell: row => <span className='text-capitalize'>{formatTime(row.start_time)}</span>
    },
    {
      name: 'Конец',
      minWidth: '70px',
      sortable: true,
      sortField: 'end_time',
      selector: row => row.start_time,
      cell: row => <span className='text-capitalize'>{formatTime(row.end_time)}</span>
    },
    {
      name: 'Описание',
      minWidth: '100px',
      sortable: true,
      sortField: 'description',
      selector: row => row.description,
      cell: row => <span className='text-capitalize'>{row.description}</span>
    }
  ]

  return (
    <Modal
    isOpen={isOpen}
    toggle={toggle}
    className="modal-dialog-centered w-700"
  >
    <ModalHeader
      className="bg-transparent"
      toggle={toggle}
    ></ModalHeader>
    <ModalBody className="px-sm-5 mx-50 pb-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="d-flex justify-content-center align-items-end gap-10">
       <Col md={4} >
                <Label className="form-label" for="timeBeg">
                  Время работы<span className="text-danger">*</span>
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
                </div>
              </Col>
              <Col md={4} >
                <Label className="form-label" for="name">
                  Описание
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
                  <FormFeedback>Пожалуйста введите описание</FormFeedback>
                )}
              </Col>
              <Col md={3} className="d-flex justify-content-center align-items-end">
              <Button type="submit" color="primary" >
              Добавить
              </Button>
              </Col>
          </Row>
      </Form>
      <div className='react-dataTable user-view-account-projects mt-2'>
        <DataTable
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={shifts}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<h6 className='text-capitalize'>Смены не найдены</h6>}
        />
      </div>
    </ModalBody>
  </Modal>
  )
}

export default ModalІShifts