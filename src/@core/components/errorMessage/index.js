import toast from 'react-hot-toast'
import Avatar from '@components/avatar'
import { AlertTriangle, X } from 'react-feather'

const ToastError = ({  t, message }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='danger' icon={<AlertTriangle size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>Ошибка</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>{message}</span>
      </div>
    </div>
  )
}


const errorMessage = (message) => toast(t => (<ToastError t={t}  message={message || 'Ошибка сервера'} />))

export default errorMessage