// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const PickerDefault = (picker, title, handleChange) => {
  // ** State
  // const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Label className='form-label' for='default-picker'>{`${title}`}</Label>
      <Flatpickr className='form-control' value={picker} onChange={(date) => handleChange(date)} id='default-picker' />
    </Fragment>
  )
}

export default PickerDefault
