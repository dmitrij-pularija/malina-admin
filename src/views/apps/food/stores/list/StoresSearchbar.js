import { Search } from 'react-feather'
import { InputGroup, Input, InputGroupText } from 'reactstrap'

const StoresSearchbar = ({ handleFilter }) => {

  return (

          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Поиск заведения'
              onChange={e => handleFilter(e.target.value)}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
  )
}

export default StoresSearchbar