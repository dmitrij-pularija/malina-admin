import { Swiper, SwiperSlide } from 'swiper/react'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// const params = {
//   lazy: true,
//   width: 200, 
//   height: 200,
//   navigation: true,
//   pagination: {
//     clickable: true
//   }
// }

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
    if (image) {
      return (
        <SwiperSlide key={image.id}>
        <img src={image.link} alt={image.name} className='rounded swiper-lazy img-fluid' />
        </SwiperSlide>
      )
    } else {
      return (
        <Avatar
          initials
          className='rounded'
          color={'light-primary'}
          content={"Malina"}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '200px',
            width: '200px'
          }}
        />
      )
    }
  }

const SwiperImages = ({ images, isRtl }) => {
  return (
    <Card className='p-0'>
      {/* <CardHeader>
        <CardTitle tag='p' className="form-label">Фото</CardTitle>
      </CardHeader> */}
      <CardBody className='p-0 m-0'>
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          {images && images.length ? images.map(image => renderSlide(image)) : renderSlide(images)}  
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperImages