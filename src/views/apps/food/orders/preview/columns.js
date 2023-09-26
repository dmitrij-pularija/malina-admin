import Avatar from '@components/avatar'
import '@styles/base/pages/app-ecommerce.scss'
import { formatNumber, formatNumberInt } from '@utils'

const renderClient = (image, name) => {
    if (image) {
      return <Avatar className='me-1' img={image} width='32' height='32' />
    } else {
      return (
        <Avatar
          initials
          className='me-1'
          color={'light-primary'}
          content={name}
        />
      )
    }
  }

export const columns = [
    {
        name: '№',
        sortable: false,
        minWidth: '30px',
        cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
        name: 'Блюдо',
        sortable: true,
        minWidth: '230px',
        sortField: 'name',
        cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row.product.images.length ? row.product.images[0].image : '', row.product.name ? row.product.name : "Блюдо")}
                <span className='fw-bolder'>{ row.product.name ? row.product.name : "" }</span>
          </div>
        )
      },
      {
        name: 'Цена',
        minWidth: '80px',
        sortable: true,
        sortField: 'cost',
        cell: row => formatNumber(row.product.cost)
      },
      {
        name: 'Скидка',
        minWidth: '130px',
        sortable: true,
        sortField: 'prime_cost',
        cell: row => `${formatNumberInt(row.product.prime_cost)} %`
      },
      {
        name: 'К-во',
        minWidth: '130px',
        sortable: true,
        sortField: 'quantity',
        cell: row => `${formatNumberInt(row.quantity)}`
      },
      {
        name: 'Стоимость добавок',
        minWidth: '130px',
        sortable: true,
        sortField: 'total_addon_price',
        cell: row => `${formatNumber(row.total_addon_price)}`
      },
      {
        name: 'К-во добавок',
        minWidth: '130px',
        sortable: true,
        sortField: 'product_addons',
        cell: row => `${formatNumberInt(row.product_addons.length)}`
      },
      {
        name: 'Итого',
        minWidth: '130px',
        sortable: true,
        sortField: 'total_price',
        cell: row => `${formatNumber(row.total_price)}`
      }
]

export const columnsAddons = [
    {
        name: 'Добавка',
        sortable: true,
        minWidth: '220px',
        sortField: 'name',
        cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row.addon.icon ? row.addon.icon : '', row.addon.name ? row.addon.name : "Добавка")}
            <div className='d-flex flex-column'>
                <span className='fw-bolder'>{ row.addon.name ? row.addon.name : "" }</span>
            </div>
          </div>
        )
      },
    {
        name: 'Цена',
        sortable: true,
        minWidth: '70px',
        sortField: 'price',
        cell: row => (<span dangerouslySetInnerHTML={{ __html: `${formatNumber(row.addon.price)} &#x0441;&#x332;` }} />)
      },
      {
        name: 'К-во',
        minWidth: '130px',
        sortable: true,
        sortField: 'quantity',
        cell: row => `${formatNumberInt(row.quantity)}`
      }    
]