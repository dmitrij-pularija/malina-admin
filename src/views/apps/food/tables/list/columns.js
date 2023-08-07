// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteTable } from '../store'

// ** Reactstrap Imports
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather'

// ** Vars
// const invoiceStatusObj = {
//   Sent: { color: 'light-secondary', icon: Send },
//   Paid: { color: 'light-success', icon: CheckCircle },
//   Draft: { color: 'light-primary', icon: Save },
//   Downloaded: { color: 'light-info', icon: ArrowDownCircle },
//   'Past Due': { color: 'light-danger', icon: Info },
//   'Partial Payment': { color: 'light-warning', icon: PieChart }
// }

// ** renders client column
const renderWaiter  = array => {
  if (array.length > 0) {
    return (
    <div className='d-flex justify-content-left align-items-center flex-column'>
      {array.map(arr => ( 
        <p key={arr.id} className='user-name text-truncate mb-0'>{arr.full_name}</p>
      ))}
    </div>
    )
  } else {
    return ""
  }
}

const renderQr = (url, handleClick) => {
    if (url) {
      return (
      <div className='d-flex justify-content-center align-items-center' onClick={() => handleClick(url)}>
        <img
          height='40'
          width='40'
          alt='QR-код стола'
          src={url}
          className='img-fluid rounded'
        />
      </div>  
      )
    } else {
      return (
      <div className='d-flex justify-content-center align-items-center'>
        <Avatar
          initials
          color={'light-primary'}
          className='rounded'
          content={'Q R'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(24px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '60px',
            width: '60px'
          }}
        />
      </div> 
      )
    }
}

// ** Table columns
export const columns = (setQqrcodeUrl, toggleModal) => {

const handleClick = url => {
  setQqrcodeUrl(url)
  toggleModal()
}

  return [
  {
    name: '№',
    sortable: true,
    sortField: 'id',
    minWidth: '20px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  {
    sortable: true,
    minWidth: '150px',
    sortField: 'invoiceStatus',
    name: 'Филиал',
    cell: row => row.branch.name
  },
  {
    sortable: true,
    minWidth: '150px',
    sortField: 'invoiceStatus',
    name: 'Адрес',
    cell: row => row.branch.address
  },
  {
    sortable: false,
    minWidth: '20px',
    sortField: 'number',
    name: 'Номер',
    cell: row => row.number
  },
  {
    name: 'QR код',
    sortable: false,
    minWidth: '40px',
    sortField: 'qr_code',
    cell: row => renderQr(row.qr_code, handleClick)
  },
  {
    name: 'Официанты',
    sortable: false,
    minWidth: '200px',
    sortField: 'total',
    cell: row => renderWaiter(row.waiter)
  },
  {
    name: 'Действия',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
          <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Eye size={14} className='me-50' />
              <span className='align-middle'>Просмотр</span>
          </DropdownItem>
            <DropdownItem tag='a' href={row.qr_code} download className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Скачать QR-kod</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Редактировать</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteTable(row.id))
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Удалить</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
}