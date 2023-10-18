
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Card, CardHeader, Badge } from "reactstrap"
import { appointmentsObj } from "../../../../../configs/initial"
import { formatData, formatTimeSave } from "@utils"
import Avatar from "@components/avatar"
import "@styles/react/libs/tables/react-dataTable-component.scss"

const getAvatar = (data) => {
  if (data.avatar && data.avatar.includes("http")) {
    return <Avatar className="me-1" img={data.avatar} width="32" height="32" />
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        width="32"
        height="32"
        color={"light-primary"}
        content={
          data.name ? `${data.name} ${data.surname ? data.surname : ""}` : "User"
        }
      />
    )
  }
}

const renderClient = (user) => {
  return (
    <div className="d-flex justify-content-left align-items-center">
      {getAvatar(user)}
      <div className="d-flex flex-column">
        <span className="fw-bolder">
          {
          user.name ? `${user.name} ${user.surname ? user.surname : ""}` : user.login
            }
        </span>
      </div>
    </div>
  )
}

const columns = [
  {
    name: "Дата",
    width: "120px",
    sortable: true,
    sortField: "date",
    selector: (row) => row.date,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder">{formatData(row.appointment_time)}</span>
        <span>
          {formatTimeSave(row.appointment_time)} -{" "}
          {formatTimeSave(row.appointment_end_time)}
        </span>
      </div>
    )
  },
  {
    name: "Услуга",
    width: "160px",
    sortable: true,
    sortField: "appointment_services",
    selector: (row) => row.totalprice,
    cell: (row) => (
      <span className="text-capitalize">
        {row.appointment_services
          .map((service) => service.beauty_service_category.category_name)
          .join(" ")}
      </span>
    )
  },
  {
    name: "Клиент",
    width: "250px",
    sortable: true,
    sortField: "appointment_user_account.id",
    cell: (row) => renderClient(row.appointment_user_account)
  },
  {
    name: "Статус",
    width: "120px",
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

const MasterAppointmentsList = ({ appointments }) => {
  return appointments.length ? (
    <Card>
      <CardHeader tag="h4">Список записей к специалисту</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          size={"small"}
          columns={columns}
          data={appointments}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  ) : (
    <Card>
      <CardHeader tag="h4">Записи отсутствуют</CardHeader>
    </Card>
  )
}

export default MasterAppointmentsList