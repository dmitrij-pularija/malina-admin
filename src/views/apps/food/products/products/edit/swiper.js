import { Swiper, SwiperSlide } from 'swiper/react'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const params = {
  effect: 'cube',
  navigation: true,
  pagination: {
    clickable: true
  },
  cubeEffect: {
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94,
    slideShadows: true
  }
}

const renderSlide = (image) => {
    if (image) {
      return (
        <SwiperSlide key={image.id} >
        <img 
        src={image.image} 
        alt='swiper' 
        className='rounded img-fluid'
        style={{
          height: '300px',
          width: '300px'
        }}
        />
      </SwiperSlide>
      )
    } else {
      return (
        <SwiperSlide >
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
            height: '300px',
            width: '300px'
          }}
        />
        </SwiperSlide>
      )
    }
  }

const SwiperImages = ({ images, isRtl }) => {
  return (
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          {images && images.length ? images.map(image => renderSlide(image)) : renderSlide(null)}  
        </Swiper>
  )
}

export default SwiperImages