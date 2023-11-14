// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllAddons } from '../../addons/store'
import { updateProduct } from '../store'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Loading from '../../../../../../@core/components/spinner/Loading'
import { columns } from './columns'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Modal,
  Label,
  Button,
  CardBody,
  Progress,
  Input,
  FormFeedback,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import withReactContent from 'sweetalert2-react-content'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const MySwal = withReactContent(Swal)

const Addons = ({ store, selectedProduct, t }) => {
  const dispatch = useDispatch()
  const [currentAddon, setCurrentAddon] = useState('')
  // const [currentAddon, setCurrentAddon] = useState({ value: '', label: 'Выбирите добавку' })
  const allAddons = useSelector(state => state.addons.allAddons)
  
  useEffect(() => {
    if (!allAddons.length) dispatch(getAllAddons())
  }, [])

  const filtredAddons = allAddons.filter(addon => parseInt(addon.supplier.id) === parseInt(store))
  const addonsOptions = filtredAddons.map(addon => ({
    value: String(addon.id),
    label: addon.name
  }))
  
  const handleDelAddon = (event, id) => {
    event.preventDefault()
    const filtredAddons = selectedProduct.addons.filter(addon => parseInt(addon.id) !== parseInt(id))
    const clearAddons = filtredAddons.map(addon => addon.id) || []
    dispatch(updateProduct({ id: selectedProduct.id, product: { addons: [...clearAddons] }}))
  }
  const handleAddAddon = () => dispatch(updateProduct({ id: selectedProduct.id, product: { addons: [...selectedProduct.addons.map(addon => addon.id), parseInt(currentAddon.value)] }}))

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              {/* <Label for='plan-select'>Добавка</Label> */}
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={addonsOptions}
                value={currentAddon}
                placeholder={t('productsData.addonsPlaceholder')}
                onChange={data => {
                  setCurrentAddon(data)
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
            <Button className='add-new-user' color='primary' onClick={handleAddAddon}>
            {t('Add')}
            </Button>
            </Col>
          </Row>
        </CardBody>
      </Card> 
      <Card>
        {/* <CardHeader>
          <CardTitle tag='h4'>Добавки к блюду</CardTitle>
        </CardHeader> */}
        <CardBody>
        <Row>

        <div className='react-dataTable user-view-account-projects'>
        <DataTable
          responsive
          size={'small'}
          columns={columns(handleDelAddon, t)}
          data={selectedProduct.addons}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<h6 className='text-capitalize'>{t('notFound')}</h6>}
        />
      </div> 
      </Row> 
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Addons
// {/* <Card><CardHeader><CardTitle tag='h4'>Добавки отсутствуют</CardTitle></CardHeader></Card> */}
