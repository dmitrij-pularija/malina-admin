import { useEffect, useState, dispatch } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'

// ** Reactstrap Imports
import { Card, CardHeader, Badge } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Logo2 from '@components/logo2'
import { statusObj } from '../../../../../configs/initial'
import { formatData, formatNumber } from '@utils'

// import { getData } from '../../food/orders/store'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const columns = [
  {
    name: 'Заведение',
    sortable: true,
    minWidth: '250px',
    sortField: 'name',
    selector: row => row.storeId,
     cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Logo2 src={row.storeId.image} size={"s"}/>
        <div className='d-flex flex-column ml3'>
            <span className='fw-bolder'>{row.storeId.name}</span>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: '№',
    sortable: true,
    minWidth: '30px',
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
    name: 'Дата',
    minWidth: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => <span className='text-capitalize'>{formatData(row.date)}</span>
  },
  {
    name: 'Сумма',
    minWidth: '120px',
    sortable: true,
    sortField: 'totalprice',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{formatNumber(row.totalprice)}</span>
  },
  {
    name: 'Статус',
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

const UserOrdersList = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  // const { data } = useSelector(state => state.orders)

  useEffect(() => {
    axios.get('/item/clientorder', { params: { ordering: "waiter", search: id } }).then(response => {
      const fullOrders = response.data.results
      const orders = fullOrders.filter(order => order.waiter === parseInt(id))
      setData(orders)
    })
  }, [])


  return data.length ? (
    <Card>
      <CardHeader tag='h4'>Список заказов пользователя</CardHeader>
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
  ) : <Card><CardHeader tag='h4'>Заказы отсутствуют</CardHeader></Card>
}

export default UserOrdersList
