import DataTable from 'react-data-table-component'
import  { columns } from './columns'
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

// const ExpandableTable = ({ data }) => {
     
//     return <DataTable 
//     responsive
//     fixedHeader={true}
//     noDataComponent={<h6 className='text-capitalize'>Добавки отсутствуют</h6>}
//     noTableHead={true}
//     data={data.product_addons}
//     columns={columnsAddons}
//     className='react-dataTable'
//     />
//   }

const TableCards = ({ data }) => {

return (
    <div className='react-dataTable'>
    <DataTable
        dataKey="id"
        responsive
        fixedHeader={true}
        columns={columns}
        sortIcon={<ChevronDown />}
        className='react-dataTable'
        data={data}
        noDataComponent={<h6 className='text-capitalize'>Блюда не указаны</h6>}
      />
     
     </div>    
)
}

export default TableCards