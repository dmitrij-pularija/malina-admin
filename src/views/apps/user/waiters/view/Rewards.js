import { Card, CardHeader } from 'reactstrap'
import { ChevronDown, Star } from 'react-feather'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Rating from 'react-rating'
import { formatData } from '@utils'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const getAvatar = data => {
  if (data.avatar && data.avatar.includes("http")) {
    return <Avatar className='me-1' img={data.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={data.name ? data.name : ''}
      />
    )
  }
  }

const RewardsList = ({ ratings, users, t }) => {

// const getUserInfo = id => {
//   const foundUser = users.find(item => item.id === id)
//   if (!foundUser) return {name: "", avatar: ""}
//   return {name: foundUser.name ? `${foundUser.name} ${foundUser.surname ? foundUser.surname : ''}` : foundUser.login, avatar: foundUser.avatar }
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
    name: t('order'),
    sortable: true,
    width: '120px',
    sortField: 'order',
    selector: row => row.order,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/apps/food/orders/preview/${row.order}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.order}</span>
          </Link>
      </div>
    )
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
    name: t('review'),
    minWidth: '200px',
    sortable: true,
    sortField: 'text',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: t('star'),
    width: '142px',
    sortable: true,
    sortField: 'star',
    selector: row => row.star.value,
    cell: row => (
      <Rating
        readonly
        fractions={2}
        direction={'ltr'}
        initialRating={row.star.value}
        emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
      />)
  }
  // {
  //   name: 'Клиент',
  //   minWidth: '150px',
  //   sortable: true,
  //   sortField: 'user',
  //   cell: row => renderClient(row.user)
  // }
]

  return ratings.length ? (
    <Card>
      <CardHeader tag='h4'>{t('waiterData.rewardsTitle')}</CardHeader>
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