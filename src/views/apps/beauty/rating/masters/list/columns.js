import renderClient from '@components/renderClient'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Edit, Star } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody } from 'reactstrap'
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

export const columns = (users, masters, stores, userData, t) => {
  const getStoreInfo = id => {
    const foundStore = stores.find(item => item.id === id)
    if (!foundStore) return {}
    return foundStore
  }
    const getMasterInfo = id => {
      const foundMaster = masters.find(item => item.id === id)
      if (!foundMaster) return {}
      return foundMaster
      } 
      
      const getUserInfo = id => {
        const foundUser = users.find(item => item.id === id)
        if (!foundUser) return {}
        return foundUser
      }

  return [
  {
    name: '№',
    sortable: false,
    width: '50px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Master'),
    minWidth: '150px',
    sortable: true,
    sortField: 'master',
    cell: row => renderClient(getMasterInfo(row.master), "master")
  },
  {
    name: t('rating'),
    width: '142px',
    sortable: true,
    sortField: 'master_stars',
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.master_stars}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  },
  {
    name: t('review'),
    minWidth: '180px',
    sortable: true,
    sortField: 'master_review',
    selector: row => row.master_review,
    cell: row => <span className='text-capitalize'>{row.master_review}</span>
  },
  {
    name: t('customer'),
    minWidth: '180px',
    sortable: true,
    sortField: 'master_rating_user',
    cell: row => renderClient(getUserInfo(row.master_rating_user), "user")
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'created_at',
    cell: row => <span className='text-capitalize'>{row.created_at ? formatData(row.created_at) : ''}</span>
  },
  // {
  //   name: 'Заказ',
  //   minWidth: '120px',
  //   sortable: true,
  //   sortField: 'order',
  //   selector: row => row.order,
  //   cell: row => <span className='text-capitalize'>{row.order ? row.order : ''}</span>
  // },
  // {
  //   name: t('store'),
  //   minWidth: '250px',
  //   sortable: true,
  //   sortField: 'row.business_id',
  //   omit: userData && userData.type === 2,
  //   cell: row => renderClient(getStoreInfo(row.business_id), "store")
  // }
]
}
