import { useState, useEffect } from "react"
import { useRTL } from '@hooks/useRTL'
// import { useDispatch } from "react-redux"
import { Card, CardHeader, CardBody, Button, Label, Input } from "reactstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import Avatar from "@components/avatar"
import { addMasterWorks, delMasterWorks} from "../store"
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

const renderSlide = (image) => {
  if (image && image.master_work_image) {
    return (
      <SwiperSlide key={image.id}>
        <img
          src={image.master_work_image}
          alt="swiper"
          className="rounded swiper-lazy img-fluid"
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
          height: "200px",
          width: "200px"
        }}
      />
    )
  }
}

const MasterWorksList = ({ id, works }) => {
  const [isRtl] = useRTL()
  // const dispatch = useDispatch()
  const [galery, setGalery] = useState(works && works.length ? works : [])

  // useEffect(() => {
  //   if (id) getMasterWorks(id).then(results => results && setGalery(results && results.length ? results : []))
  // }, [id])

  useEffect(() => {
      setGalery(works && works.length ? works : [])
  }, [works])
// console.log(galery)

  const handleImg = (e) => {
    if (!id) return
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      addMasterWorks({work: {master: id}, galery: {image: reader.result}})
      .then(result => result && setGalery(prevState => {
      return [...prevState, result]
      }))

      // const id = `f${galery.length}`
      // setGalery(prevState => {
      //   return [...prevState, {id, master_work_image: reader.result}]
      // })
    }
    reader.readAsDataURL(files[0])
  }

  const handleImgReset = () => {
    if (works && galery.length) galery.map(image => delMasterWorks(parseInt(image.id)))
    setGalery([])
  }

  return (
    <Card>
      <CardHeader className="d-flex justify-content-center" tag="h4">Работы специалиста</CardHeader>
      {/* <CardBody className="w-400 mb-2"> */}
      <CardBody className="mb-2">
      <div className="d-flex align-items-center justify-content-center mb-2">
        <Swiper dir={isRtl ? "rtl" : "ltr"} {...params}>
          {galery.length ? galery.map(work => renderSlide(work)) : renderSlide(null)}
        </Swiper>
      </div>
        <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <Button
                      tag={Label}
                      className="me-75 mb-0"
                      size="sm"
                      color="primary"
                    >
                      Загрузить
                      <Input
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
                      Очистить
                    </Button>
                  </div>
                </div>
      </CardBody>
    </Card>
  )
    // <Card>
    //   <CardHeader className="d-flex justify-content-center" tag="h4">Работы отсутствуют</CardHeader>
    // </Card>
}

export default MasterWorksList
