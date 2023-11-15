import DataTable from 'react-data-table-component'
import  { columns, columnsAddons } from './columns'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus} from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'

const ExpandableTable = ({ data, t }) => {
     
    return <DataTable 
    responsive
    noDataComponent={<h6 className='text-capitalize'>{t('ordersData.addonsNotFound')}</h6>}
    noTableHead={true}
    data={data.product_addons}
    columns={columnsAddons(t)}
    className='react-dataTable'
    />
  }

const TableCards = ({ data, t }) => {
 
return (
    <DataTable
        dataKey="id"
        responsive
        expandableRows
        expandOnRowClicked
        columns={columns(t)}
        sortIcon={<ChevronDown />}
        className='react-dataTable'
        expandableRowsComponent={(data) => ExpandableTable({data, t})}
        // onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
        data={data}
        noDataComponent={<h6 className='text-capitalize'>{t('ordersData.productsNotFound')}</h6>}
      />
)
}

export default TableCards