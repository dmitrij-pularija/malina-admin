// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, Edit, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const StoreCard = props => {
  // ** Props
  const {
    stores,
    data,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(stores.params))
  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(stores.params))
  }
console.log(data)
  // ** Renders products
  const renderProducts = () => {
    if (data.length) {
      return data.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.name}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
                <img className='img-fluid card-img-top' src={item.image} alt={item.name} />
              </Link>
            </div>
            <CardBody>
                <CardText tag='span' className='company-name'>
                <h3 className='text-center mb-2'>
                {item.name}
                </h3>
                </CardText>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h6 className='item-price'>Рейтинг заведения:</h6>
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
                  <h6 className='item-price'>Рейтинг персонала:</h6>
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
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleCartBtn(item.id, item.isInCart)}
                /*eslint-disable */
                {...(item.isInCart
                  ? {
                      to: '/apps/ecommerce/checkout'
                    }
                  : {})}
                /*eslint-enable */
              >
                <Edit className='me-50' size={14} />
                <span>Редактировать</span>
              </Button>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <Trash2
                  className={classnames('me-50', {
                    'text-danger': item.isInWishlist
                  })}
                  size={14}
                />
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
