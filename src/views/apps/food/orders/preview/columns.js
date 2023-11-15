import renderClient from '@components/renderClient'
import '@styles/base/pages/app-ecommerce.scss'
import { formatNumber, formatNumberInt } from '@utils'

export const columns = t => {
  return [
    // {
    //     name: '№',
    //     sortable: false,
    //     width: '8%',
    //     cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    // },
    {
      name: t('Product'),
        // sortable: true,
        minWidth: '150px',
        sortField: 'name',
        cell: row => renderClient(row.product, "product")
      },
      {
        name: t('price'),
        minWidth: '100px',
        // sortable: true,
        sortField: 'cost',
        cell: row => <span className='right width'>{formatNumber(row.product.cost)}</span>
      },
      {
        name: t('Discount'),
        width: '100px',
        // sortable: true,
        sortField: 'prime_cost',
        cell: row => <span className='center width'>{`${formatNumberInt(row.product.prime_cost)} %`}</span>
      },
      {
        name: t('Quantity'),
        width: '140px',
        // sortable: true,
        sortField: 'quantity',
        cell: row => <span className='center width'>{`${formatNumberInt(row.quantity)}`}</span>
      },
      {
        name: t('Addons'),
        width: '120px',
        // sortable: true,
        sortField: 'total_addon_price',
        cell: row => <span className='right width'>{`${formatNumber(row.total_addon_price)}`}</span>
      },
      {
        name: t('Quantity'),
        width: '140px',
        // sortable: true,
        sortField: 'product_addons',
        cell: row => <span className='center width'>{`${formatNumberInt(row.product_addons.length)}`}</span>
      }
      // {
      //   name: 'Итого',
      //   minWidth: '13%',
      //   // sortable: true,
      //   sortField: 'total_price',
      //   cell: row => <span className='right width'>{`${formatNumber(row.total_price)}`}</span>
      // }
]
}

export const columnsAddons = t => {
  return [
    {
      name: t('Addon'),
        // sortable: true,
        // minWidth: '220px',
        minWidth: '150px',
        // sortField: 'name',
        cell: row => renderClient(row.addon, "addons")
      },
    {
      name: t('price'),
      minWidth: '100px',
        // sortable: true,
        // minWidth: '70px',
        // sortField: 'price',
        cell: row => (<span dangerouslySetInnerHTML={{ __html: `${formatNumber(row.addon.price)} &#x0441;&#x332;` }} />)
      },
      {
        name: t('Quantity'),
        width: '100px',
        // minWidth: '130px',
        // sortable: true,
        // sortField: 'quantity',
        cell: row => `${formatNumberInt(row.quantity)}`
      }    
]
}