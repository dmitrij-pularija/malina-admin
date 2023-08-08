// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store } = props

  return (

          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Поиск заведения'
              onChange={e => dispatch(getProducts({ ...store.params, q: e.target.value }))}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>

  )
}

export default ProductsSearchbar
