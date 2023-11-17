import { useEffect, useState, dispatch } from 'react'
import { useParams, Link } from 'react-router-dom'
import Rating from 'react-rating'
import renderClient from '@components/renderClient'
import { Card, CardHeader, CardTitle, Badge } from 'reactstrap'
import { ChevronDown, Star } from 'react-feather'
import DataTable from 'react-data-table-component'
import { statusObj } from '../../../../configs/initial'
import { formatData, formatNumber, getRate } from '../../../../utility/Utils'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UserOrdersList = ({data, t}) => {
console.log(data)


  const columns = [
    {
      name: '№',
      sortable: false,
      width: '80px',
      selector: row => row,
      cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
      name: t('order'),
      sortable: true,
      width: '120px',
      sortField: 'order_date',
      cell: row => (
            <Link
              to={`/apps/food/orders/preview/${row.id}`}
              className='text-truncate text-body d-flex flex-column gap-10'
            >
              <span className='fw-bolder'>{`№ ${row.id}`}</span>
              <span className='text-capitalize'>{formatData(row.order_date)}</span>
            </Link>
      )
      },
      {
        name: t('Price'),
        width: '120px',
        sortable: true,
        sortField: 'total_order_price',
        cell: row => <span className='text-capitalize'>{formatNumber(row.total_order_price)}</span>
      },
      {
        name: t('store'),
        sortable: true,
        minWidth: '250px',
        sortField: 'business_id.id',
        cell: row => renderClient(row.business_id, "store")
      },
      {
        name: t('deliveryAddress'),
        minWidth: '180px',
        sortable: false,
        sortField: 'delivery_address.location',
        cell: row => <span className='text-capitalize'>{row.delivery_address ? (row.delivery_address.location ? row.delivery_address.location : row.delivery_address.name) : "Внутри заведения"}</span>
      },
      {
        name: t('rating'),
        width: '142px',
        sortable: true,
        sortField: 'order_waiter_rating',
        cell: row => (
          <Rating
            readonly
            fractions={2}
            direction={'ltr'}
            initialRating={getRate(row.rate)}
            emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
            fullSymbol={<Star size={20} fill='#ff9f43' stroke='#ff9f43' />}
          />)
      },
      {
        name: t('Status'),
        width: '120px',
        sortable: true,
        sortField: 'status',
        cell: row => (
          <Badge className='text-capitalize' color={statusObj[row.status.toString()].colorName} pill>
            {statusObj[row.status.toString()].label}
          </Badge>
        )
      }
  ]


// console.log(id, data)
  return data && data.length ? (
    <Card>
      <CardHeader tag='h4'>{t('UsersData.ordersListTitle')}</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={data}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : (<Card><CardHeader><CardTitle tag='h4'>{t('notFound')}</CardTitle></CardHeader></Card>)
}

export default UserOrdersList
