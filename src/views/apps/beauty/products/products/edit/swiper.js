// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react'
import Avatar from '@components/avatar'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// // ** Images
// import img1 from '@src/assets/images/banner/banner-35.jpg'
// import img2 from '@src/assets/images/banner/banner-39.jpg'
// import img3 from '@src/assets/images/banner/banner-38.jpg'
// import img4 from '@src/assets/images/banner/banner-37.jpg'
// import img5 from '@src/assets/images/banner/banner-36.jpg'
// import img6 from '@src/assets/images/banner/banner-34.jpg'

const params = {
  lazy: true,
  width: 200, 
  height: 200,
  navigation: true,
  pagination: {
    clickable: true
  }
}

const renderSlide = (image) => {
    if (image) {
      return (
        <SwiperSlide key={image.id}>
        <img src={image.image} alt='swiper 1' className='rounded swiper-lazy img-fluid' />
        {/* <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div> */}
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
      <CardBody className='w-200 p-0 m-0'>
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          {images && images.length ? images.map(image => renderSlide(image)) : renderSlide(images)}  
          {/* <SwiperSlide>
            <img src={img1} alt='swiper 1' className='rounded swiper-lazy img-fluid' />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt='swiper 2' className='rounded swiper-lazy img-fluid' />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt='swiper 3' className='rounded swiper-lazy img-fluid' />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} alt='swiper 4' className='rounded swiper-lazy img-fluid' />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={img5} alt='swiper 5' className='rounded swiper-lazy img-fluid' />
            <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
          </SwiperSlide> */}
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperImages