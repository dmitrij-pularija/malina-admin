// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { editBranch, deleteBranch } from '../store'

// ** Icons Imports
import { Slack, User, Command, Edit, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledTooltip, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const columns = [
  {
    name: '№',
    sortable: false,
    minWidth: '30px',
    selector: row => row,
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    name: 'Название филиала',
    minWidth: '150px',
    sortable: true,
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: 'Адрес филиала',
    minWidth: '150px',
    sortable: true,
    sortField: 'address',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.address}</span>
  },
  {
    name: 'Заведение',
    minWidth: '150px',
    sortable: false,
    sortField: 'storeid',
    selector: row => row.storeid,
    cell: row => <span className='text-capitalize'>{row.storeid.name}</span>
  },
  
  {
    name: 'Действия',
    minWidth: '100px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Edit className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Редактировать
        </UncontrolledTooltip>
        <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Trash2 size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Удалить
        </UncontrolledTooltip>
      </div>
    )
  }
]

