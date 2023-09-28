import { Link } from 'react-router-dom'
// ** React Imports
import Avatar from '@components/avatar'
import Logo2 from '@components/logo2'
import { getUser } from '../../../../user/store'
// ** Icons Imports
import { Star } from 'react-feather'

// ** Reactstrap Imports
import Rating from 'react-rating'
import '@styles/base/pages/app-ecommerce.scss'
import { formatData } from '@utils'

  const getAvatar = data => {
  if (data.avatar && data.avatar.includes("http")) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data.name}
      />
    )
  }
  }

  const getUserInfo = id => {
    const foundUser = users.find(item => item.id === id)
    if (!foundUser) return {name: "User", avatar: "", login: ""}
    return {name: `${foundUser.name ? foundUser.name : ''} ${foundUser.surname ? foundUser.surname : ''}`, avatar: foundUser.avatar, login: foundUser.login }
  }

const renderClient = (user) => {
 
  return (
    <div className='d-flex justify-content-left align-items-center'>
    {getAvatar(user.avatar)}
    <div className='d-flex flex-column'>
      <Link
        to={`/apps/user/view/${user.id}`}
        className='user_name text-truncate text-body d-flex flex-column'
        onClick={() => store.dispatch(getUser(user.id))}
      >
        <span className='fw-bolder'>{ user.name ? `${user.name} ${user.surname ? user.surname : ''}` : '' }</span>
      <small className='text-truncate text-muted mb-0'>{user.login}</small>
      </Link>
    </div>
  </div>    
  )
}

// const renderStoore = (id) => {
//   if (!stores.length) return null
//   const foundStore = stores.find(item => item.id === id)
//   return (
//     <div className='d-flex justify-content-left align-items-center'>
//     {getAvatar(foundStore)}   
//     {/* <Logo2 src={foundStore.image} size={"s"}/> */}
//   <div className='d-flex flex-column ml3'>
//       <span className='fw-bolder'>{foundStore.name}</span>
//     <small className='text-truncate text-muted mb-0'>{foundStore.business_address ? `${foundStore.business_address.city} ${foundStore.business_address.name}` : ""}</small>
//   </div>
// </div>
//   )
// }


export const columns = [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Клиент',
    minWidth: '200px',
    sortable: true,
    sortField: 'user_id.login',
    selector: row => row.user,
    cell: row => renderClient(row.user_id)
  },
  {
    name: 'Блюдо ',
    minWidth: '200px',
    sortable: true,
    sortField: 'product.rproduct.name',
    selector: row => row.product,
    cell: row => row.rproduct.name
  },
  {
    name: 'Артикль ',
    minWidth: '200px',
    sortable: true,
    sortField: 'article.title',
    selector: row => row.article,
    cell: row => row.article.title
  },
  {
    name: 'Отзыв',
    minWidth: '300px',
    sortable: true,
    sortField: 'text',
    selector: row => row.text,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },

  {
    name: 'Дата',
    minWidth: '120px',
    sortable: true,
    sortField: 'created_at',
    selector: row => row.created_at,
    cell: row => <span className='text-capitalize'>{formatData(row.created_at)}</span>
  }
]
