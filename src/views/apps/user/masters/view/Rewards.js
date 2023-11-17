import { Card, CardHeader } from 'reactstrap'
import { ChevronDown, Star } from 'react-feather'
import renderClient from '@components/renderClient'
import DataTable from 'react-data-table-component'
import Rating from 'react-rating'
import { formatData } from '@utils'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// const getAvatar = data => {
//   if (data.avatar && data.avatar.includes("http")) {
//     return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={'light-primary'}
//         content={data.name}
//       />
//     )
//   }
//   }

const RewardsList = ({ ratings, users, t }) => {
  const getUserInfo = id => {
    const foundUser = users.find(item => item.id === id)
    if (!foundUser) return {}
    return foundUser
  }
// const getUserInfo = id => {
//   const foundUser = users.find(item => item.id === id)
//   if (!foundUser) return {name: "User", avatar: ""}
//   return {name: `${foundUser.name ? foundUser.name : 'Customer'} ${foundUser.surname ? foundUser.surname : foundUser.id}`, avatar: foundUser.avatar }
// }

// const renderClient = (id) => {
// const data = getUserInfo(id)

// return (
// <div className='d-flex justify-content-left align-items-center'>
// {getAvatar(data)}
// <div className='d-flex flex-column'>
//     <span className='fw-bolder'>{data.name}</span>
// </div>
// </div>
// )
// }
const columns = [
  {
    name: '№',
    sortable: false,
    width: '50px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: t('Date'),
    width: '120px',
    sortable: true,
    sortField: 'created_at',
    cell: row => <span className='text-capitalize'>{row.created_at ? formatData(row.created_at) : ''}</span>
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
    width: '142px',
    sortable: true,
    sortField: 'master_review',
    cell: row => <span className='text-capitalize'>{row.master_review}</span>
  },
  {
    name: t('customer'),
    minWidth: '150px',
    sortable: true,
    sortField: 'master_rating_user',
    cell: row => renderClient(getUserInfo(row.master_rating_user), "user")
  }
]

  return ratings.length ? (
    <Card>
      <CardHeader tag='h4'>{t('MastersData.rewardsTitle')}</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={ratings}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : <Card><CardHeader tag='h4'>{t('notFound')}</CardHeader></Card>
}

export default RewardsList