// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import axios from 'axios'
import { Card, CardHeader, Badge } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
// import Logo2 from '@components/logo2'
import { appointmentsObj } from '../../../../../configs/initial'
import { formatData, formatTimeSave } from '@utils'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const columns = [
  // {
  //   name: 'Заведение',
  //   sortable: true,
  //   minWidth: '250px',
  //   sortField: 'name',
  //   selector: row => row.storeId,
  //    cell: row => (
  //     <div className='d-flex justify-content-left align-items-center'>
  //         <Logo2 src={row.storeId.image} size={"s"}/>
  //       <div className='d-flex flex-column ml3'>
  //           <span className='fw-bolder'>{row.storeId.name}</span>
  //         <small className='text-truncate text-muted mb-0'>{row.email}</small>
  //       </div>
  //     </div>
  //   )
  // },
  // {
  //   name: '№',
  //   sortable: true,
  //   minWidth: '30px',
  //   sortField: 'id',
  //   selector: row => row.id,
  //   cell: row => (
  //     <div className='d-flex justify-content-left align-items-center'>
  //         <Link
  //           to={`/apps/food/orders/preview/${row.id}`}
  //           className='user_name text-truncate text-body'
  //         >
  //           <span className='fw-bolder'>{row.id}</span>
  //         </Link>
  //     </div>
  //   )
  // },
  {
    name: 'Дата',
    width: '120px',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => (
    <div className='d-flex flex-column'>
      <span className='fw-bolder'>{formatData(row.appointment_time)}</span>
      <span>{formatTimeSave(row.appointment_time)} - {formatTimeSave(row.appointment_end_time)}</span>
    </div>
    )
  },
  {
    name: 'Услуга',
    minWidth: '120px',
    sortable: true,
    sortField: 'totalprice',
    selector: row => row.totalprice,
    cell: row => <span className='text-capitalize'>{row.appointment_services.map(service => service.beauty_service_category.category_name).join(' ')}</span>
  },
  {
    name: 'Статус',
    width: '120px',
    sortable: true,
    sortField: 'appointment_status',
    cell: row => (<Badge className='text-capitalize' color={appointmentsObj[row.appointment_status].colorName} pill>{row.appointment_status}</Badge>)
  }
]

const MasterAppointmentsList = ({ appointments }) => {
// console.log(appointments)

  return appointments.length ? (
    <Card>
      <CardHeader tag='h4'>Список записей к специалисту</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          size={'small'}
          columns={columns}
          data={appointments}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : <Card><CardHeader tag='h4'>Записи отсутствуют</CardHeader></Card>
}

export default MasterAppointmentsList