import DataTable from 'react-data-table-component'
import  { columns } from './columns'
import { ChevronDown } from 'react-feather'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const TableCards = ({ data, t }) => {

return (
    <DataTable
        dataKey="id"
        responsive
        columns={columns(t)}
        sortIcon={<ChevronDown />}
        className='react-dataTable'
        data={data}
        noDataComponent={<h6 className='text-capitalize'>{t('ordersBeautyData.productsNotFound')}</h6>}
      />
)
}

export default TableCards