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
    // {
    //     name: '№',
    //     sortable: false,
    //     width: '8%',
    //     cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    // },
    {
        name: 'Блюдо',
        // sortable: true,
        minWidth: '30%',
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
        minWidth: '13%',
        // sortable: true,
        sortField: 'cost',
        cell: row => <span className='right width'>{formatNumber(row.product.cost)}</span>
      },
      {
        name: 'Скидка',
        minWidth: '14%',
        // sortable: true,
        sortField: 'prime_cost',
        cell: row => <span className='center width'>{`${formatNumberInt(row.product.prime_cost)} %`}</span>
      },
      {
        name: 'К-во',
        minWidth: '11%',
        // sortable: true,
        sortField: 'quantity',
        cell: row => <span className='center width'>{`${formatNumberInt(row.quantity)}`}</span>
      },
      {
        name: 'добавки',
        minWidth: '15%',
        // sortable: true,
        sortField: 'total_addon_price',
        cell: row => <span className='right width'>{`${formatNumber(row.total_addon_price)}`}</span>
      },
      {
        name: 'К-во',
        minWidth: '11%',
        // sortable: true,
        sortField: 'product_addons',
        cell: row => <span className='center width'>{`${formatNumberInt(row.product_addons.length)}`}</span>
      },
      {
        name: 'Итого',
        minWidth: '13%',
        // sortable: true,
        sortField: 'total_price',
        cell: row => <span className='right width'>{`${formatNumber(row.total_price)}`}</span>
      }
]

export const columnsAddons = [
    {
        name: 'Добавка',
        // sortable: true,
        // minWidth: '220px',
        minWidth: '25%',
        // sortField: 'name',
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
        minWidth: '12%',
        // sortable: true,
        // minWidth: '70px',
        // sortField: 'price',
        cell: row => (<span dangerouslySetInnerHTML={{ __html: `${formatNumber(row.addon.price)} &#x0441;&#x332;` }} />)
      },
      {
        name: 'К-во',
        minWidth: '10%',
        // minWidth: '130px',
        // sortable: true,
        // sortField: 'quantity',
        cell: row => `${formatNumberInt(row.quantity)}`
      }    
]