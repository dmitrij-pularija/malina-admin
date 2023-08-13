import { Card, CardHeader } from 'reactstrap'
import { ChevronDown, Star } from 'react-feather'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Rating from 'react-rating'
import { formatData } from '@utils'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const columns = [
  {
    name: 'заказ',
    sortable: true,
    minWidth: '30px',
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
    name: 'Дата',
    minWidth: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: 'Отзыв',
    minWidth: '200px',
    sortable: true,
    sortField: 'text',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{row.text}</span>
  },
  {
    name: 'Оценка',
    minWidth: '142px',
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
]

const RewardsList = ({ ratings }) => {
 
  return ratings.length ? (
    <Card>
      <CardHeader tag='h4'>Список отзывов об официанте</CardHeader>
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