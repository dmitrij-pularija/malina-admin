import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import Loading from '../spinner/Loading-spinner'
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
// import Flatpickr from "react-flatpickr"
// import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import { Minus, ChevronDown, Edit, Trash2 } from "react-feather"
// import "@styles/react/apps/app-users.scss"
// import "@styles/react/libs/flatpickr/flatpickr.scss"
// import "@styles/react/pages/page-authentication.scss"
// import "@styles/base/pages/app-ecommerce-details.scss"




const ModalMap = ({isOpen, toggle, onCoordinateSelected, selectedAddres }) => {

  const [selectedCoords, setSelectedCoords] = useState(["", ""])
  const [mapsLoaded, setMapsLoaded] = useState(true)

  const handleYMapsLoad = () => {
    setMapsLoaded(false)
  }
 
  const updateCurrentCoordinates = () => {
  if (selectedAddres && selectedAddres.longitude) {
    setSelectedCoords([selectedAddres.latitude, selectedAddres.longitude])
  } else {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setSelectedCoords([position.coords.latitude, position.coords.longitude])
    })
  } else {
    console.error('Геолокация не поддерживается вашим браузером.')
  }
}
}

useEffect(() => {
  updateCurrentCoordinates()
}, [selectedAddres])

  const closeModal = () => {
    onCoordinateSelected(["", ""])
    setMapsLoaded(true)
    toggle()
  }
  const handleSelectCoords  = () => {
    onCoordinateSelected(selectedCoords)
    setMapsLoaded(true)
    toggle()
  }
  const handleMapClick = (e) => {
    const { _sourceEvent: { originalEvent: {  coords } }} = e
    setSelectedCoords(coords)
  }

  return (
    <Modal
    isOpen={isOpen}
    toggle={closeModal}
    className="modal-dialog-centered w-700"
  >
    <ModalHeader
      className="bg-transparent"
      toggle={closeModal}
    ><p className="text-center">Выберите координаты на карте</p></ModalHeader>
    <ModalBody className="px-sm-5 mx-50 pb-4">
    <Row className="height-400">
    <YMaps>
        <Map
          width="100%"
          height="400px"
          onClick={handleMapClick}
          onLoad={handleYMapsLoad}
          defaultState={{ center: selectedCoords, zoom: 13 }}
        >
          <Placemark geometry={selectedCoords} />
        </Map>
    </YMaps>
    {mapsLoaded && <Loading className="lmap" />}
    </Row>
    <Row>
          <Col className="d-flex justify-content-center align-items-end mt-1 gap-10" sm="12">
            <Button color="primary" onClick={handleSelectCoords}>
              Выбрать
            </Button>
            <Button color="secondary" outline onClick={closeModal}>
              Отменить
            </Button>
          </Col>
        </Row>
    </ModalBody>
  </Modal>
  )
}

export default ModalMap