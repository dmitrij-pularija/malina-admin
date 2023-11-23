import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { dataURLtoBlob } from '@utils'
import { useRTL } from '@hooks/useRTL'
import Avatar from "@components/avatar"
import {
  Row,
  Col,
  Card, 
  CardHeader, 
  CardBody,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap"
import { addStoreImage, delStoreImage} from "../store"
import "@styles/react/apps/app-users.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-authentication.scss"
import "@styles/base/pages/app-ecommerce-details.scss"
import '@styles/react/libs/swiper/swiper.scss'
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow
} from 'swiper'

SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const params = {
  effect: 'coverflow',
  slidesPerView: 'auto',
  centeredSlides: true,
  navigation: true,
  pagination: {
    clickable: true
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  }
}


const renderSlide = image => {
  if (image && image.image) {
    return (
      <SwiperSlide key={image.id}>
        <img
          src={image.image}
          alt="swiper"
          className="rounded swiper-lazy img-fluid"
          style={{
            height: '300px',
            width: '300px'
          }}
        />
      </SwiperSlide>
    )
  } else {
    return (
      <Avatar
        initials
        className="rounded"
        color={"light-primary"}
        content={"Malina"}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(48px)",
          width: "100%",
          height: "100%"
        }}
        style={{
          height: '300px',
          width: '300px'
        }}
      />
    )
  }
}





const ModalGalery = ({id, isOpen, toggle, data, t }) => {
  // const dispatch = useDispatch()
  const [isRtl] = useRTL()
  const [galery, setGalery] = useState(data && data.length ? data : [])


  useEffect(() => {
    setGalery(data && data.length ? data : [])
}, [data])
console.log(galery)


const handleImg = (e) => {
  if (!id) return
  
  const reader = new FileReader(),
    files = e.target.files
  reader.onload = function () {
    const formData = new FormData()
    formData.append('business', id)
    if (reader.result.startsWith('data:image')) {
      const avatarBlob = dataURLtoBlob(reader.result)
      formData.append('image', avatarBlob, 'store.jpg')  
    addStoreImage({formData})
    .then(result => result && setGalery(prevState => {
    return [...prevState, result]
    }))
  }
    // const id = `f${galery.length}`
    // setGalery(prevState => {
    //   return [...prevState, {id, master_work_image: reader.result}]
    // })
  }
  reader.readAsDataURL(files[0])
}

const handleImgReset = () => {
  if (data && galery.length) galery.map(image => delStoreImage(parseInt(image.id)))
  setGalery([])
}

  const closeModal = () => {
    // setGalery([])
    toggle()
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
    ></ModalHeader>
    <ModalBody className="px-sm-5 mx-50 pb-4">
      <div className="d-flex align-items-center justify-content-center mb-2"> 
        <Swiper dir={isRtl ? "rtl" : "ltr"} {...params}>
          {galery.length ? galery.map(image => renderSlide(image)) : renderSlide(null)}
        </Swiper>
      </div>
      <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <Button
                      id='dlbtn'
                      tag={Label}
                      className="me-75 mb-0"
                      size="sm"
                      color="primary"
                    >
                      {t('download')}
                      <Input
                        id='dlinp'
                        type="file"
                        onChange={handleImg}
                        hidden
                        accept="image/*"
                      />
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleImgReset}
                    >
                      {t('clear')}
                    </Button>
                  </div>
                </div>

    </ModalBody>
  </Modal>
  )
}

export default ModalGalery