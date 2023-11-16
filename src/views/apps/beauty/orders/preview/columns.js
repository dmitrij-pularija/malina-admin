import renderClient from '@components/renderClient'
import '@styles/base/pages/app-ecommerce.scss'
import { formatNumber, formatNumberInt } from '@utils'

export const columns = t => {
  return [
    {
        name: '№',
        sortable: false,
        width: '50px',
        cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
      name: t('BeautyProduct'),
        // sortable: true,
        minWidth: '150px',
        sortField: 'beauty_product.name',
        cell: row => renderClient(row.beauty_product, "beautyProduct")
      },
      {
        name: t('price'),
        width: '100px',
        // sortable: true,
        sortField: 'beauty_product.cost',
        cell: row => <span className='width right'>{formatNumber(row.beauty_product.cost)}</span>
      },
      {
        name: t('Discount'),
        width: '120px',
        // sortable: true,
        sortField: 'beauty_product.prime_cost',
        cell: row => <span className='width center'>{`${formatNumberInt(row.beauty_product.prime_cost)} %`}</span>
      },
      {
        name: t('Quantity'),
        width: '140px',
        // sortable: true,
        sortField: 'quantity',
        cell: row => <span className='center width'>{`${formatNumberInt(row.quantity)}`}</span>
      },
      // {
      //   name: 'Итого',
      //   minWidth: '13%',
      //   // sortable: true,
      //   sortField: 'total_price',
      //   cell: row => <span className='right width'>{`${formatNumber(row.total_price)}`}</span>
      // }
]
}