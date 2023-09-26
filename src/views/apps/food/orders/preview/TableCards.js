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

const ExpandableTable = ({ data }) => {
     
    return <DataTable 
    responsive
    noDataComponent={<h6 className='text-capitalize'>Добавки отсутствуют</h6>}
    noTableHead={true}
    data={data.product_addons}
    columns={columnsAddons}
    className='react-dataTable ml-50'
    />
  }

const TableCards = ({ data }) => {
 
return (
    <div className='react-dataTable'>
    <DataTable
        dataKey="id"
        responsive
        expandableRows
        expandOnRowClicked
        columns={columns}
        sortIcon={<ChevronDown />}
        className='react-dataTable'
        expandableRowsComponent={ExpandableTable}
        // onRowExpandToggled={(bool, row) => { bool ? setSelectedId(row.id) : setSelectedId('') }}
        data={data}
        noDataComponent={<h6 className='text-capitalize'>Блюда не найдены</h6>}
      />
     
    </div>    
)
}

export default TableCards