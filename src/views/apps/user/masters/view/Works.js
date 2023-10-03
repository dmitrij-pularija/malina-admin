import { Card, CardHeader, CardBody } from "reactstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import Avatar from "@components/avatar"
import { useRTL } from '@hooks/useRTL'
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
          alt="swiper 1"
          className="rounded swiper-lazy img-fluid"
        />
        {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
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

const MasterWorksList = ({ works }) => {
  const [isRtl] = useRTL()
  return works.length ? (
    <Card>
      <CardHeader className="d-flex justify-content-center" tag="h4">Работы специалиста</CardHeader>
      <CardBody className="w-400 mb-2">
        <Swiper dir={isRtl ? "rtl" : "ltr"} {...params}>
          {works && works.length ? works.map(work => renderSlide(work)) : renderSlide(null)}
        </Swiper>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardHeader className="d-flex justify-content-center" tag="h4">Работы отсутствуют</CardHeader>
    </Card>
  )
}

export default MasterWorksList
