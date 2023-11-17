
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Card, CardHeader, Badge } from "reactstrap"
import { appointmentsObj } from "../../../../../configs/initial"
import { formatData, formatTimeSave } from "@utils"
import renderClient from '@components/renderClient'
import "@styles/react/libs/tables/react-dataTable-component.scss"

const columns = (t) => {
  return [
  {
    name: t('Date'),
    width: "130px",
    sortable: true,
    sortField: "date",
    selector: (row) => row.date,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder">{formatData(row.appointment_time)}</span>
        <span className="text-capitalize">
          {formatTimeSave(row.appointment_time)} - {formatTimeSave(row.appointment_end_time)}
        </span>
      </div>
    )
  },
  {
    name: t('service'),
    width: "160px",
    sortable: true,
    sortField: "appointment_services",
    selector: (row) => row.totalprice,
    cell: (row) => (
      <span className="text-capitalize">
        {row.appointment_services
          .map((service) => service.beauty_service_name)
          .join(" ")}
      </span>
    )
  },
  {
    name: t('customer'),
    width: "250px",
    sortable: true,
    sortField: "appointment_user_account.id",
    cell: row => renderClient(row.appointment_user_account, "user")
  },
  {
    name: t('Status'),
    width: '120px',
    sortable: true,
    sortField: "appointment_status",
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={appointmentsObj[row.appointment_status].colorName}
        pill
      >
        {appointmentsObj[row.appointment_status].label}
      </Badge>
    )
  }
]
}

const MasterAppointmentsList = ({ appointments, t }) => {
  return appointments.length ? (
    <Card>
      <CardHeader tag="h4">{t('MastersData.appointmentsTitle')}</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          size={"small"}
          columns={columns(t)}
          data={appointments}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : (
    <Card>
      <CardHeader tag="h4">{t('notFound')}</CardHeader>
    </Card>
  )
}

export default MasterAppointmentsList