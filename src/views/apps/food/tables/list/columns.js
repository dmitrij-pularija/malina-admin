import Avatar from '@components/avatar'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
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

export const columns = (downloadImg, setQqrcodeUrl, toggleModal, handleDel, handleEdit, t) => {

const handleClick = url => {
  setQqrcodeUrl(url)
  toggleModal()
}

  return [
  {
    name: '№',
    sortable: false,
    width: '100px',
    cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
  },
  // {
  //   sortable: true,
  //   minWidth: '150px',
  //   sortField: 'invoiceStatus',
  //   name: 'Заведение',
  //   cell: row => row.business_id.name
  // },
  // {
  //   sortable: true,
  //   minWidth: '150px',
  //   sortField: 'invoiceStatus',
  //   name: 'Адрес',
  //   cell: row => `${row.business_id.business_address.city ? row.business_id.business_address.city : ''}, ${row.business_id.business_address.name ? row.business_id.business_address.name : ''}`
  // },
  {
    sortable: true,
    minWidth: '20px',
    sortField: 'number',
    name: t('tablesData.number'),
    cell: row => row.number
  },
  {
    name: t('tablesData.qr'),
    sortable: false,
    minWidth: '40px',
    sortField: 'qr_code',
    cell: row => renderQr(row.qr_code, handleClick)
  },
  {
    name: t('waiter'),
    sortable: false,
    minWidth: '200px',
    sortField: 'total',
    cell: row => renderWaiter(row.waiter)
  },
  {
    name: t('action'),
    width: '200px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href={row.qr_code} download className='w-100' onClick={e => { e.preventDefault(); downloadImg(row.qr_code) }} >
              <Download size={14} className='me-50' />
              <span className='align-middle'>{t('download')}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleEdit(event, row)}
            >
              <Edit size={14} className='me-50' />
              <span className='align-middle'>{t('edit')}</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={event => handleDel(event, row.id)}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>{t('delete')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
}