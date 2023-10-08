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
        width: '8%',
        cell: (row, index) => <span className='text-capitalize'>{index + 1}</span>
    },
    {
        name: 'Товар',
        // sortable: true,
        minWidth: '30%',
        sortField: 'beauty_product.name',
        cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row.beauty_product && row.beauty_product.beauty_product_images && row.beauty_product.beauty_product_images.length ? row.beauty_product.beauty_product_images[0].image : '', row.beauty_product.name ? row.beauty_product.name : "Товар")}
              <span className='fw-bolder'>{ row.beauty_product.name ? row.beauty_product.name : "" }</span>
        </div>
        )
      },
      {
        name: 'Цена',
        minWidth: '13%',
        // sortable: true,
        sortField: 'beauty_product.cost',
        cell: row => <span className='width right'>{formatNumber(row.beauty_product.cost)}</span>
      },
      {
        name: 'Скидка',
        minWidth: '14%',
        // sortable: true,
        sortField: 'beauty_product.prime_cost',
        cell: row => <span className='width center'>{`${formatNumberInt(row.beauty_product.prime_cost)} %`}</span>
      },
      {
        name: 'К-во',
        minWidth: '11%',
        // sortable: true,
        sortField: 'quantity',
        cell: row => <span className='center width'>{`${formatNumberInt(row.quantity)}`}</span>
      },
      {
        name: 'Итого',
        minWidth: '13%',
        // sortable: true,
        sortField: 'total_price',
        cell: row => <span className='right width'>{`${formatNumber(row.total_price)}`}</span>
      }
]