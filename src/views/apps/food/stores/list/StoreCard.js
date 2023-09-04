// ** React Imports
import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
// import { useDispatch } from 'react-redux'
// import { deleteStore } from '../store'
// ** Third Party Components
import classnames from 'classnames'
import { Star, Edit, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-authentication.scss'

const renderLogo = (avatar, name) => {
  if (avatar) {
    return (
      <img 
      className='rounded mb-0' 
      src={avatar} 
      alt={name ? name : "Логотип заведения"}
      style={{
        height: '200px',
        width: '100%'
        // height: '150px',
        // width: '150px'
        // width: '267px'
      }}
      />
    )
  } else {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded'
        content={name ? name : 'Malina'}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(64px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          // height: 'auto',
          width: '100%',
          height: '200px'
          // width: '150px'
          // width: '267px'
        }}
      />
    )
  }
}


const StoreCard = props => {
  // const dispatch = useDispatch()  
  // ** Props
  const { handleDel, data, activeView } = props

  // ** Handle Move/Add to cart
  // const handleCartBtn = (id, val) => {
  //   if (val === false) {
  //     dispatch(addToCart(id))
  //   }
  //   dispatch(getCartItems())
  //   dispatch(getProducts(stores.params))
  // }

  // ** Handle Wishlist item toggle
  // const handleWishlistClick = (id, val) => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(id))
  //   } else {
  //     dispatch(addToWishlist(id))
  //   }
  //   dispatch(getProducts(stores.params))
  // }
// console.log(data)
  // ** Renders products
  const renderProducts = () => {
    if (data.length) {
      return data.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.name}>
            {/* <div className='item-img text-center mx-auto'> */}
              {renderLogo(item.image, item.name)}
            {/* </div> */}
            <CardBody>
                <CardText tag='span' className='company-name'>
                <h3 className='text-center mt-1 mb-1'>
                {item.name}
                </h3>
                </CardText>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h6 className='item-price'>заведение:</h6>
                </div>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className='ratings-list-item me-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.avg_store,
                              'unfilled-star': index + 1 > item.avg_store
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h6 className='item-price'>персонал:</h6>
                </div>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className='ratings-list-item me-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.avg_personal,
                              'unfilled-star': index + 1 > item.avg_personal
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              
              <CardText className='item-description'>{item.description}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              {/* <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div> */}
              <Link to={`/apps/food/stores/store-detail/${item.id}`}>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                // onClick={() => handleCartBtn(item.id, item.isInCart)}
              >
                {/* <Edit className='me-50' size={14} /> */}
                <span>Изменить</span>
              </Button>
              </Link>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleDel(item.id)}
              >
                {/* <Trash2
                  className='me-50'
                  size={14}
                /> */}
                <span>Удалить</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default StoreCard
