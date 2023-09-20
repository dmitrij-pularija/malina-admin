import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const handleDel = (delFunction, backFunction, message1, message2) => {
  const dispatch = useDispatch()
    return MySwal.fire({
      title: 'Удаление',
      text: `Вы не сможете востановить ${message1}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'удалить',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
      
    }).then(function (result) {
      if (result.value) {
        dispatch(delFunction(id)).then((response) => {
          
          if (response.meta.requestStatus === 'fulfilled') { 
          MySwal.fire({
            icon: 'success',
            title: 'Удаление',
            text: `${message1} успешно ${message2}`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          backFunction()
        }
        }
        )
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Отмена удаления',
          text: 'Удаление отменено',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

export default handleDel