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
        content={data.name}
      />
    )
  }
  }

const RewardsList = ({ ratings, users }) => {

const getUserInfo = id => {
  const foundUser = users.find(item => item.id === id)
  if (!foundUser) return {name: "User", avatar: ""}
  return {name: `${foundUser.name ? foundUser.name : 'Customer'} ${foundUser.surname ? foundUser.surname : foundUser.id}`, avatar: foundUser.avatar }
}

const renderClient = (id) => {
const data = getUserInfo(id)

return (
<div className='d-flex justify-content-left align-items-center'>
{getAvatar(data)}
<div className='d-flex flex-column'>
    <span className='fw-bolder'>{data.name}</span>
</div>
</div>
)
}
const columns = [
  {
    name: '№',
    sortable: false,
    width: '50px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Дата',
    width: '120px',
    sortable: true,
    sortField: 'created_at',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{row.created_at ? formatData(row.created_at) : ''}</span>
  },
  {
    name: 'Оценка',
    width: '142px',
    sortable: true,
    sortField: 'master_stars',
    selector: row => row.master_stars,
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
    name: 'Отзыв',
    width: '142px',
    sortable: true,
    sortField: 'master_review',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{row.master_review}</span>
  },
  {
    name: 'Клиент',
    minWidth: '150px',
    sortable: true,
    sortField: 'master_rating_user',
    selector: row => row.master_rating_user,
    cell: row => renderClient(row.master_rating_user)
  }
]

  return ratings.length ? (
    <Card>
      <CardHeader tag='h4'>Список отзывов о специалисте</CardHeader>
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
  ) : <Card><CardHeader tag='h4'>Отзывы отсутствуют</CardHeader></Card>
}

export default RewardsList