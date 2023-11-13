import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardHeader, Badge } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Logo2 from '@components/logo2'
import { statusObj } from '../../../../../configs/initial'
import { formatData, formatNumber, formatNumberInt } from '@utils'
import '@styles/react/libs/tables/react-dataTable-component.scss'



const UserOrdersList = ({ orders, t }) => {

  const columns = [
    {
      name: '№',
      sortable: true,
      width: '100px',
      sortField: 'id',
      selector: row => row.id,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
            <Link
              to={`/apps/food/orders/preview/${row.id}`}
              className='user_name text-truncate text-body'
            >
              <span className='fw-bolder'>{row.id}</span>
            </Link>
        </div>
      )
    },
    {
      name: t('Date'),
      width: '120px',
      sortable: true,
      sortField: 'order_date',
      selector: row => row.order_date,
      cell: row => <span className='text-capitalize'>{formatData(row.order_date)}</span>
    },
    {
      name: t('Table'),
      width: '150px',
      sortable: true,
      sortField: 'table',
      selector: row => row.table,
      cell: row => <span className='text-capitalize'>{formatNumberInt(row.table)}</span>
    },
    {
      name: t('Price'),
      minWidth: '120px',
      sortable: true,
      sortField: 'total_order_price',
      selector: row => row.total_order_price,
      cell: row => <span className='text-capitalize'>{formatNumber(row.total_order_price)} &#x0441;&#x332;</span>
    },
    {
      name: t('Status'),
      minWidth: '120px',
      sortable: true,
      sortField: 'status',
      selector: row => row.status,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.status.toString()].colorName} pill>
          {statusObj[row.status.toString()].label}
        </Badge>
      )
    }
  ]

  return orders.length ? (
    <Card>
      <CardHeader tag='h4'>{t('waiterData.ordersTitle')}</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={orders}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : <Card><CardHeader tag='h4'>{t('notFound')}</CardHeader></Card>
}

export default UserOrdersList