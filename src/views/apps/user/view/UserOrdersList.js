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
import { statusObj } from '../../../../configs/initial'
import { formatData, formatNumber } from '../../../../utility/Utils'

// import { getData } from '../../food/orders/store'
// ** Label Images
import xdLabel from '@src/assets/images/icons/brands/xd-label.png'
import vueLabel from '@src/assets/images/icons/brands/vue-label.png'
import htmlLabel from '@src/assets/images/icons/brands/html-label.png'
import reactLabel from '@src/assets/images/icons/brands/react-label.png'
import sketchLabel from '@src/assets/images/icons/brands/sketch-label.png'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// const projectsArr = [
//   {
//     progress: 60,
//     hours: '210:30h',
//     progressColor: 'info',
//     totalTasks: '233/240',
//     subtitle: 'React Project',
//     title: 'BGC eCommerce App',
//     img: reactLabel
//   },
//   {
//     hours: '89h',
//     progress: 15,
//     totalTasks: '9/50',
//     progressColor: 'danger',
//     subtitle: 'UI/UX Project',
//     title: 'Falcon Logo Design',
//     img: xdLabel
//   },
//   {
//     progress: 90,
//     hours: '129:45h',
//     totalTasks: '100/190',
//     progressColor: 'success',
//     subtitle: 'Vuejs Project',
//     title: 'Dashboard Design',
//     img: vueLabel
//   },
//   {
//     hours: '45h',
//     progress: 49,
//     totalTasks: '12/86',
//     progressColor: 'warning',
//     subtitle: 'iPhone Project',
//     title: 'Foodista mobile app',
//     img: sketchLabel
//   },

//   {
//     progress: 73,
//     hours: '67:10h',
//     totalTasks: '234/378',
//     progressColor: 'info',
//     subtitle: 'React Project',
//     title: 'Dojo React Project',
//     img: reactLabel
//   },
//   {
//     progress: 81,
//     hours: '108:39h',
//     totalTasks: '264/537',
//     title: 'HTML Project',
//     progressColor: 'success',
//     subtitle: 'Crypto Website',
//     img: htmlLabel
//   },
//   {
//     progress: 78,
//     hours: '88:19h',
//     totalTasks: '214/627',
//     progressColor: 'success',
//     subtitle: 'Vuejs Project',
//     title: 'Vue Admin template',
//     img: vueLabel
//   }
// ]

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
    axios.get('/item/clientorder', { params: { clientId: parseInt(id) } }).then(response => {
      setData(response.data.results)
    })
  }, [])

// console.log(id, data)
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
