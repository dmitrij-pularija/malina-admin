// ** Icons Imports
import Select from 'react-select'
import { selectThemeColors } from '@utils'
// ** Reactstrap Imports
import { Row, Col, Label, Input, InputGroupText } from "reactstrap"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

const StoresFilter = ({ businessType, rowsPerPage, handlePerPage, handleChangeBuseness }) => {
  // ** Props
  // const { dispatch, getProducts, store } = props
  const typeOptions = [
    { value: '', label: 'Показать все' },
    { value: '1', label: 'Food' },
    { value: '2', label: 'Beauty' }
  ]  

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Показать</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={e => handlePerPage(e)}
              style={{ width: "5rem" }}
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Input>
            {/* <label htmlFor="rows-per-page">записей</label> */}
          </div>
        </Col>
        <Col className="d-flex align-items-center p-0">
        <div className="d-flex align-items-center w-100">
        {/* <label htmlFor="business">Бизнес</label> */}
          <Select
            id="business"
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={typeOptions}
            value={businessType}
            onChange={data => handleChangeBuseness(data)}
          />
        </div>  
        </Col>
      </Row>
    </div>
  )
}

export default StoresFilter
