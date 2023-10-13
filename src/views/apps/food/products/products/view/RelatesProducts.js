// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, updateProduct } from '../store'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Loading from '../../../../../../@core/components/spinner/Loading'
import { relatesProductColumns } from './relatesProductColumns'
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

const RelatesProducts = ({ store, selectedProduct }) => {
  const dispatch = useDispatch()
  const [currentRelatesProduct, setCurrentRelatesProduct] = useState({ value: '', label: 'Выбирите блюдо' })
  const allProducts = useSelector(state => state.products.allProducts)

  useEffect(() => {
    if (!allProducts.length) dispatch(getAllProducts())
  }, [])
  
  const filtredProducts = allProducts.filter(product => parseInt(product.supplier.id) === parseInt(store) &&  parseInt(product.id) !== parseInt(selectedProduct.id))
  const productsOptions = filtredProducts.map(product => ({
    value: String(product.id),
    label: product.name
  }))
  const handleDelProduct = (event, id) => {
    event.preventDefault()
    const filtredProducts = selectedProduct.related_products.filter(product => parseInt(product.id) !== parseInt(id))
    const clearProducts = filtredProducts.map(product => product.id) || []
    dispatch(updateProduct({ id: selectedProduct.id, product: { related_products: [...clearProducts] }}))
  }
  const handleAddProduct = () => dispatch(updateProduct({ id: selectedProduct.id, product: { related_products: [...selectedProduct.related_products.map(addon => addon.id), parseInt(currentRelatesProduct.value)] }}))

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={productsOptions}
                value={currentRelatesProduct}
                onChange={data => {
                  setCurrentRelatesProduct(data)
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
            <Button className='add-new-user' color='primary' onClick={handleAddProduct}>
              Добавить
            </Button>
            </Col>
          </Row>
        </CardBody>
      </Card> 
      <Card>
        <CardBody>
        <Row>

        <div className='react-dataTable user-view-account-projects'>
        <DataTable
          responsive
          size={'small'}
          columns={relatesProductColumns(handleDelProduct)}
          data={selectedProduct.related_products}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<h6 className='text-capitalize'>Связанные продукты не найдены</h6>}
        />
      </div> 
      </Row> 
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default RelatesProducts
