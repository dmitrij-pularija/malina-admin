import renderClient from '@components/renderClient'
import { Star } from 'react-feather'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

export const columns = (users, stores, userData, t) => {

  const getUserInfo = id => {
    const foundUser = users.find(item => item.id === id)
    if (!foundUser) return {}
    return foundUser
  }

  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }
  
  return [
  {
    name: '№',
    sortable: false,
    width: '80px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('customer'),
    minWidth: '200px',
    sortable: true,
    sortField: 'user',
    cell: row => renderClient(getUserInfo(row.user), "user")
  },
  {
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'star.value',
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.star.value}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: t('review'),
    minWidth: '300px',
    sortable: true,
    sortField: 'text',
    selector: row => row.text,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },

  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: t('store'),
    minWidth: '250px',
    sortable: false,
    omit: userData && userData.type === 2,
    cell: row => renderClient(getStoreInfo(row.business), "store")
  }
]
}
